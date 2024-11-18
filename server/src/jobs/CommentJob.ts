import { Job, Queue, Worker } from 'bullmq'
import { defaultQueueOptions, redisConnection } from '../config/queue.js'
import { sendEmail } from '../config/mail.js'
import prisma from '../config/database.js'


export const commentQueueName = 'votingQueue'

export const commentQueue = new Queue(commentQueueName,{
    connection:redisConnection,
    defaultJobOptions:{
        ...defaultQueueOptions,
        delay:1000
    }
})



export const queueWorker = new Worker(commentQueueName, async(job:Job)=>{
   const data = job.data;
   await prisma.clashComments.create({
    data:{
        comment:data?.comment,
        clash_id:Number(data?.id)
    }
   })
   
},{
    connection: redisConnection
})


