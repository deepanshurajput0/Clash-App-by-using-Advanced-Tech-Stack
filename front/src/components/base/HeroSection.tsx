import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className=' w-full h-screen flex flex-col justify-center items-center'>
        <div>
            <Image 
            src='/banner.svg' 
            width={500} 
            height={500} 
            alt='banner' />
        </div>
        <div className=' text-center space-y-5'>
            <h1 className=' text-6xl  font-bold' > Clash </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, molestiae.</p>
        </div>
        <Link href={'/login'} >
        <Button className=' mt-2' > Start free </Button>
        </Link>
       
    </div>
  )
}
