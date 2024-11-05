import { Router, Request, Response } from 'express'
import { ZodError } from 'zod'
import { formatError, ImageValidator, uploadedFile } from '../helper.js'
import { clashSchema } from '../validation/clashValidation.js'
import { UploadedFile } from 'express-fileupload'
import prisma from '../config/database.js'

const router = Router()



router.get('/',async(req:Request,res:Response)=>{
    try {
        const clash = await prisma.clash.findMany({
            where:{
                user_id:req.user?.id
            },
        })
        return res.json({message:'Clashed fetched successfully',data:clash})
    } catch (error) {
        if(error instanceof ZodError){
            const errors = formatError(error)
            return res.status(422).json({message:'Invalid Data',errors})
        }
     return res.status(500).json({message:'Internal Server Error'})
    }
})


router.post('/create', async(req:Request,res:Response)=>{
    try {
        const body = req.body
        console.log(body)
        const payload = clashSchema.parse(body)
        
        if(req.files?.image){
            const image = req.files?.image as UploadedFile
            const validMsg = ImageValidator(image.size,image.mimetype)
            if(validMsg){
                return res.status(422).json({errors:{image:validMsg}})
            }
            payload.image = await uploadedFile(image)
        }else{
            return res.status(422).json({errors:{image:'Image field is required'}})
        }
      
       await prisma.clash.create({
        data:{
            ...payload,
            user_id:req.user?.id!,
            expire_at:new Date(payload.expire_at)
        }
       })
      return res.json({message:'Clash Created successfully'})

    } catch (error) {
        if(error instanceof ZodError){
            const errors = formatError(error)
            return res.status(422).json({message:'Invalid Data',errors})
        }
     return res.status(500).json({message:'Internal Server Error'})
    }
})

export default router




