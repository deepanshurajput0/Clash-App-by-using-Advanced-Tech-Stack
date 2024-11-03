'use client'
import React from 'react'
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/common/SubmitBtn'

import { useEffect } from "react";
import { useActionState } from 'react';
import { toast } from "sonner";
import { forgetPasswordAction} from '@/actions/authActions';
export default function ForgetPassword() {
    const initState = {
        status: 0,
        message: "",
        errors: {},

    };

    const [state, formAction] = useActionState(forgetPasswordAction, initState);
    useEffect(()=>{
      if(state.status === 500){
        toast.error(state.message)
      }else if(state.status === 200){
        toast.success(state.message)
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
   <SubmitButton/>
</div>
</form>      
    </div>
  )
}
