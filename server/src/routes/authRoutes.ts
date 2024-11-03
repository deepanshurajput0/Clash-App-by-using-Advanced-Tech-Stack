import { Router, Request, Response } from 'express'
import { loginSchema, registerSchema } from '../validation/authValidations.js';
import { ZodError } from 'zod';
import { formatError, renderEmailEjs } from '../helper.js';
import bcrypt from 'bcrypt'
import prisma from '../config/database.js';
import { v4 as uudi4 } from 'uuid'
import { emailQueue, emailQueueName } from '../jobs/EmailJob.js';
import jwt from 'jsonwebtoken'
import authMiddleware from '../middleware/AuthMiddleware.js';
import { authlimiter } from '../config/ratelimit.js';
const router = Router()



router.post('/login',authlimiter,async(req:Request,res:Response)=>{
   try {
    const body = req.body
    const payload = loginSchema.parse(body)
    // check email 
    const user = await prisma.user.findUnique({where:{email:payload.email}})
    if(!user || user === null ){
        return res.status(422).json({errors:{email:'No user found with this email'}}
)}
      const compare = await bcrypt.compare(payload.password,user.password)
      if(!compare){
        return res.status(422).json({errors:{email:'Invalid Credentials'}}
        )
      }
      const JWTPayload = {
        id:user.id,
        name:user.name,
        email:user.email
      }
      const token = jwt.sign(JWTPayload,process.env.SECRET_KEY!,{expiresIn:'365d'})
       return res.json({
        message:'Logged in Successfully',
        data:{
            ...JWTPayload, token:`Bearer ${token}`
        }
       })

   } catch (error) {
    if(error instanceof ZodError){
        const errors = formatError(error)
        return res.status(422).json({message:'Invalid Data',errors})
    }
 return res.status(500).json({message:'Internal Server Error'})
   }
})

router.post('/check/credentials',authlimiter,async(req:Request,res:Response)=>{
   try {
    const body = req.body
    const payload = loginSchema.parse(body)
    // check email 
    const user = await prisma.user.findUnique({where:{email:payload.email}})
    if(!user || user === null ){
        return res.status(422).json({errors:{email:'No user found with this email'}}
)}
      const compare = await bcrypt.compare(payload.password,user.password)
      if(!compare){
        return res.status(422).json({errors:{email:'Invalid Credentials'}}
        )
      }
       return res.json({
        message:'Logged in Successfully'
       })

   } catch (error) {
    if(error instanceof ZodError){
        const errors = formatError(error)
        return res.status(422).json({message:'Invalid Data',errors})
    }
 return res.status(500).json({message:'Internal Server Error'})
   }
})


router.post('/register',authlimiter,async(req:Request,res:Response)=>{
    try {
    const body = req.body;
    const payload = registerSchema.parse(body)
    let user = await prisma.user.findUnique({
        where:{
            email:payload.email
        }
    })
    if(user){
        return res.status(422).json({
            email:'Email already taken. plz use another'
        })
    }
     payload.password = await bcrypt.hash(payload.password,10)

     const token = await bcrypt.hash(uudi4(),10)
     const url = `${process.env.APP_URL}/verify-email?email=${payload.email}&token=${token}`
     const emailBody = await renderEmailEjs('email-verify',{name:payload.name,url:url})
      await emailQueue.add(emailQueueName,{to:payload.email, subject:'Clash Email Verification',body:emailBody})

     await prisma.user.create({
        data:{
            name:payload.name,
            email:payload.email,
            password:payload.password,
            email_verify_token:token
        }
     })
     return res.json({
        message:'Please check your email. we have sent you a verification email'
     })

    } catch (error) {
        if(error instanceof ZodError){
            const errors = formatError(error)
            return res.status(422).json({message:'Invalid Data',errors})
        }
     return res.status(500).json({message:'Internal Server Error'})
    }

})


router.get('/user',authMiddleware,async(req:Request,res:Response)=>{
    const user =  req.user 
    return res.json({data:user})
})


export default router