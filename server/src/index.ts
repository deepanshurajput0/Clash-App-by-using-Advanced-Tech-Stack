import express,{Application, Request, Response} from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const _dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({})

const app:Application = express()

const PORT = process.env.PORT || 8080

app.use(express.json())


app.set('view engine', 'ejs')
app.set('views', path.resolve(_dirname,'./views'))

app.get('/',(req:Request,res:Response)=>{
     res.render('welcome');
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})




