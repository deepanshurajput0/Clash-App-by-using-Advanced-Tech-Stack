import { getImageUrl } from '@/lib/utils'
import { ClashType } from '@/types'
import Image from 'next/image'
import React, { Fragment } from 'react'

export default function ViewClashItems({clash}:{clash:ClashType}) {
  return (
    <div className=' mt-10' >
       <div className=' flex flex-wrap lg:flex-nowrap justify-between items-center' >
        {
            clash.ClashItem && clash.ClashItem.length > 0 && clash.ClashItem.map((item,index)=>{
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
    </div>
  )
}



