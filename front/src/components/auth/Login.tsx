'use client'
import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/common/SubmitBtn'
import Link from "next/link";
import { useEffect } from "react";
import { useActionState } from 'react';
import { toast } from "sonner";
import { loginAction } from '@/actions/authActions';
import { signIn } from 'next-auth/react'
export default function Login() {
    const initState = {
        status: 0,
        message: "",
        errors: {},
        data:{}
    };

    const [state, formAction] = useActionState(loginAction, initState);
    useEffect(()=>{
      if(state.status === 500){
        toast.error(state.message)
      }else if(state.status === 200){
        toast.success(state.message)
        signIn('credentials',{
            email:state.data.email,
            password:state.data.password,
            redirect:true,
            callbackUrl:'/dashboard'
        })
      }
    },[state])
  return (
    <div>
      <form action={formAction} >
<div className=' mt-4'>
  <Label htmlFor='email' >Email</Label>
  <Input id='email' type='email' name='email' placeholder='Enter your email...' />
  <span className="text-red-500">{state.errors?.email}</span>
</div>
<div className=' mt-4'>
  <Label htmlFor='password' >Password</Label>
  <Input id='password' type='password' name='password' placeholder='Enter your password...' />
  <span className="text-red-500">{state.errors?.password}</span>
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
    </div>
  )
}
