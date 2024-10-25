import Image from 'next/image'
import React from 'react'

export default function HeroSection() {
  return (
    <div className=' w-full h-screen flex flex-col justify-center items-center'>
        <div>
            <Image 
            src='/banner.svg' 
            width={600} 
            height={600} 
            alt='banner' />
        </div>
        <div>
            <h1 className=' text-6xl  font-bold' > Clash </h1>
        </div>
    </div>
  )
}
