'use client'
import { getImageUrl } from '@/lib/utils'
import { ClashType } from '@/types'
import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import CountUp from 'react-countup'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

export default function Clashing({clash}:{clash:ClashType}) {
    const [clashComments, setClashComments] = useState(clash.ClashComments)
    const [clashItems, setClashItems] = useState(clash.ClashItem)
    const [comment, setComment] = useState("")
  return (
    <div className=' mt-10' >
       <div className=' flex flex-wrap lg:flex-nowrap justify-between items-center' >
        {
         clashItems && clashItems.length > 0 && clashItems.map((item,index)=>{
                return(
                    <Fragment key={index} >
                         <div className="w-full lg:w-[500px] flex justify-center items-center flex-col">
          <div
            className="w-full flex justify-center items-center rounded-md border border-dashed p-2 h-[300px]"
          >  <Image
                src={getImageUrl(item.image)}
                width={500}
                height={500}
                alt="preview"
                className="w-full h-[300px] object-contain"
              />
          </div>
          <CountUp 
          start={0}
          end={item.count}
          duration={0.5}
          className=' text-5xl font-extrabold '
          />
        </div>

        {
            index % 2 === 0 && <div className="w-full flex lg:w-auto justify-center items-center">
            <h1 className="text-3xl font-bold">VS</h1>
          </div>
        }
        
                    </Fragment>
                )
            })
        }
       </div>
       {/* /// Comments  */}

       <form className=' mt-2 w-full p-10 space-y-6' >
        <Textarea placeholder='Type your suggestions...' 
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        />
         <Button className=' w-full mt-2' > Submit Comment </Button>
       </form>
       {
         clashComments && clashComments.length > 0 && clashComments.map((item,index)=>
        <div className=' w-full md:w-[600px] rounded-lg p-4 bg-muted mb-4' key={index} >
               <p className='font-bold' >
                   {item.comment}
               </p>
               <p>{ new Date(item.created_at).toDateString() }</p>
        </div>
        )
       }
    </div>
  )
}



