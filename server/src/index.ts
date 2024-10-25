import express,{Application, Request, Response} from 'express'
import dotenv from 'dotenv'

dotenv.config({})

const app:Application = express()

const PORT = process.env.PORT || 8080

app.get('/',(req:Request,res:Response)=>{
     res.send("<h1> It's working fine </h1>")
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})




