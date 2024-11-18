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
import DeleteClash from './DeleteClash'
import { toast } from 'sonner'

const EditClash = dynamic(()=>import('./EditClash'))

export default function ClashCardMenu({clash,token}:{clash:ClashType,token:string}) {
    const [open,setOpen] = useState(false)
    const [deleteopen,setDeleteOpen] = useState(false)
   
    const handleCopy =()=>{
      navigator.clipboard.writeText(`http://localhost:3000/clash/${clash.id}`)
      toast.success('Link copied successfully')
    }

  return (
    <>
    {
        open && <EditClash open={open} setOpen={setOpen} clash={clash} token={token} /> 
    }
    {
        deleteopen && <DeleteClash open={deleteopen} setOpen={setDeleteOpen} id={clash.id} token={token} /> 
    }
    <DropdownMenu>
    <DropdownMenuTrigger>
        <EllipsisVertical/>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={()=>setOpen(true)} >Edit</DropdownMenuItem>
      <DropdownMenuItem onClick={handleCopy} >Copy Link</DropdownMenuItem>
      <DropdownMenuItem onClick={()=>setDeleteOpen(true)} >Delete</DropdownMenuItem>
     </DropdownMenuContent>
  </DropdownMenu>
    </>
  
  )
}



