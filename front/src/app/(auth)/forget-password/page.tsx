import ForgetPassword from '@/components/auth/ForgetPassword'
import React from 'react'

export default function forgetPassword() {
  return (
    <div>
        <div className=' flex justify-center items-center h-screen' >
       <div className=' w-[550px] bg-white rounded-xl py-5 shadow-md space-y-2 pl-5 pr-5' >
       <h1 className=' text-3xl font-bold' >Forget Password</h1>
        <p>don't worry it happens. Just enter your email below and we will send you the password reset link.</p>
        <ForgetPassword/>
       </div>           
    </div>
    </div>
  )
}







