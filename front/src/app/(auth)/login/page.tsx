import React from 'react'
import Link from 'next/link'
import Login from '@/components/auth/Login'

export default function login() {
  return (
    <div className=' flex justify-center items-center h-screen' >
       <div className=' w-[550px] bg-white rounded-xl py-5 shadow-md space-y-2 pl-5 pr-5' >
       <h1 className=' text-3xl  font-bold text-center' > Clash </h1>
       <h1 className=' text-2xl  font-bold' > Login </h1>
       <p>Welcome Back </p>
        <Login/>
       <p className=' text-center mt-2' >
        Don't have an account ? <strong>
            <Link href={'/register'} > Register </Link>
        </strong>
       </p>
       </div>           
    </div>
  )
}



