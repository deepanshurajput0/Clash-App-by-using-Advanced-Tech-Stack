'use client'
import socket from '@/lib/socket'
import { getImageUrl } from '@/lib/utils'
import { ClashType } from '@/types'
import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react'
import CountUp from 'react-countup'

export default function ViewClashItems({clash}:{clash:ClashType}) {
    const [clashComments, setClashComments] = useState(clash.ClashComments)
    const [clashItems, setClashItems] = useState(clash.ClashItem)
    const updateCounter = (id: number) => {
      const updatedItems = clashItems.map((item) => 
        item.id === id ? { ...item, count: item.count + 1 } : item
      );
      setClashItems(updatedItems);
    };
    useEffect(()=>{
      socket.on(`clashing-${clash.id}`,(data)=>{
        updateCounter(data?.clashItemId)
      })
    })

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



