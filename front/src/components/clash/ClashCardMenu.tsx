'use client'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from 'lucide-react'
import { ClashType } from '@/types'
import dynamic from 'next/dynamic'

const EditClash = dynamic(()=>import('./EditClash'))

export default function ClashCardMenu({clash,token}:{clash:ClashType,token:string}) {
    const [open,setOpen] = useState(false)
  return (
    <>
    {
        open && <EditClash open={open} setOpen={setOpen} clash={clash} token={token} /> 
    }
    <DropdownMenu>
    <DropdownMenuTrigger>
        <EllipsisVertical/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={()=>setOpen(true)} >Edit</DropdownMenuItem>
      <DropdownMenuItem>Copy Link</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
     </DropdownMenuContent>
  </DropdownMenu>
    </>
  
  )
}



