'use client'
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar'
import LogoutModal from '../auth/LogoutModal'
  
export default function Navbar() {
    const [open, setOpen] = useState<boolean>(false)
  return (
    <>
    <LogoutModal open={open} setOpen={setOpen} />
    <nav className=' flex justify-between items-center h-14 p-2 w-full' >
        <h1 className=' text-4xl  font-bold' > Clash </h1>
        <DropdownMenu>
  <DropdownMenuTrigger>
    <UserAvatar/>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem onClick={()=>setOpen(true)} >Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

    </nav>
    </>
  )
}



