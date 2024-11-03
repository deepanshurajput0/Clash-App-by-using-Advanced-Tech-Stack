import { Router, Request, Response } from 'express'
import prisma from '../config/database.js';
import { authlimiter } from '../config/ratelimit.js';
import { checkDateHourDiff, formatError, renderEmailEjs } from '../helper.js';
import { ZodError } from 'zod';
import { v4 as uudi4 } from 'uuid'
import  bcrypt from 'bcrypt'
import { forgetPasswordSchema, resetPasswordSchema } from '../validation/passwordValidation.js';
import { emailQueue, emailQueueName } from '../jobs/EmailJob.js';

const router = Router()

router.post('/forget-password',authlimiter,async(req:Request,res:Response)=>{
    try {
        const body = req.body
        const payload = forgetPasswordSchema.parse(body)
        let user = await prisma.user.findUnique({where:{email:payload.email}})
        if(!user || user === null){
            return res.status(422).json({message:'Invalid Data', errors:{
                email:'No user found with this email'
            }})
        }
        const token = await bcrypt.hash(uudi4(),10)
        await prisma.user.update({
            data:{
              password_reset_token:token,
              token_send_at: new Date().toISOString()
            },
            where:{
             email:payload.email
            }
        })
        const url = `${process.env.CLIENT_APP_URL}/reset-password?email=${payload.email}&token=${token}`
        const html = await renderEmailEjs('forget-password',{url:url})
        await emailQueue.add(emailQueueName,{
            to:payload.email,
            subject:'Reset password',
            body:html
        })
         return res.json({message:'Email sent successfully: please check your email'})

       } catch (error) {
        if(error instanceof ZodError){
            const errors = formatError(error)
            return res.status(422).json({message:'Invalid Data',errors})
        }
     return res.status(500).json({message:'Internal Server Error'})
       }
})



router.post('/reset-password',authlimiter,async(req:Request,res:Response)=>{
    try {
        const body = req.body
        const payload = resetPasswordSchema.parse(body)
        let user = await prisma.user.findUnique({where:{email:payload.email}})
        if(!user || user === null){
            return res.status(422).json({message:'Invalid Data', errors:{
                email:'No user found with this email'
                
            }})
        }

        if(user.password_reset_token !== payload.token){
            return res.status(422).json({message:'Invalid Data', errors:{
                email:'Link is not correct make sure you copied correct link'
            }})
        }
       const hoursDiff = checkDateHourDiff(user.token_send_at!)
       if(hoursDiff > 2 ){
        return res.status(422).json({message:'Invalid Data', errors:{
            email:'Password reset token got expired. please send new token'
        }})
       }
       // Update password 
       const salt = await bcrypt.genSalt(10)
       const newPass = await bcrypt.hash(payload.password,salt)
       await prisma.user.update({
        data:{
            password:newPass,
            password_reset_token:null,
            token_send_at:null
        },
        where:{
          email:payload.email
        }
       })
       return res.json({message:'Password reset successfully. Please try to login now'})

       } catch (error) {
        if(error instanceof ZodError){
            const errors = formatError(error)
            return res.status(422).json({message:'Invalid Data',errors})
        }
     return res.status(500).json({message:'Internal Server Error'})
       }
})




export default router