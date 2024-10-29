import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'

import Link from 'next/link'
import { SubmitButton } from '@/components/common/SubmitBtn'
export default function login() {
  return (
    <div className=' flex justify-center items-center h-screen' >
       <div className=' w-[550px] bg-white rounded-xl py-5 shadow-md space-y-2 pl-5 pr-5' >
       <h1 className=' text-3xl  font-bold text-center' > Clash </h1>
       <h1 className=' text-2xl  font-bold' > Login </h1>
       <p>Welcome Back </p>
       <form>
          <div className=' mt-4'>
            <Label htmlFor='email' >Email</Label>
            <Input id='email' type='email' name='email' placeholder='Enter your email...' />
          </div>
          <div className=' mt-4'>
            <Label htmlFor='password' >Password</Label>
            <Input id='password' type='password' name='password' placeholder='Enter your password...' />
          </div>
          <div className=' text-right font-bold p-2' >
             <Link href={'forget-password'} >
             Forget Password ? 
             </Link>
          </div>
          <div className=' mt-4'>
             <SubmitButton/>
          </div>
       </form>
       <p className=' text-center mt-2' >
        Don't have an account ? <strong>
            <Link href={'/register'} > Register </Link>
        </strong>
       </p>
       </div>           
    </div>
  )
}



