import { Job, Queue, Worker } from 'bullmq'
import { defaultQueueOptions, redisConnection } from '../config/queue.js'
import { sendEmail } from '../config/mail.js'


interface EmailJobDatatypes{
  to:string,
  subject:string,
  body:string
}

export const emailQueueName = 'emailQueue'

export const emailQueue = new Queue(emailQueueName,{
    connection:redisConnection,
    defaultJobOptions:defaultQueueOptions
})



export const queueWorker = new Worker(emailQueueName, async(job:Job)=>{
   const data:EmailJobDatatypes = job.data;
   await sendEmail(data.to, data.subject,data.body)
   
},{
    connection: redisConnection
})



