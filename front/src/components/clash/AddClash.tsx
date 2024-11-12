'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from "@/components/ui/textarea"
import { ClassFromType, ClassFromTypeError } from '@/types'
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios, { AxiosError } from 'axios'
import { CLASH_URL } from '@/lib/apiEndPoints'
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import { toast } from 'sonner'
import { clearCache } from '@/actions/commonActions'
  
export default function AddClash({user}:{user:CustomUser}) {
    const [open, setOpen] = useState<boolean>(false)
    const [clashData, setClashData] = useState<ClassFromType>({})
    const [date, setDate] = React.useState<Date | null >(null)
    const [image,setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<ClassFromTypeError>({}) 
    const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
       const file = e.target.files?.[0]
       if(file) setImage(file)
    }
  const handleSubmit =async(e:React.FormEvent)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('title',clashData?.title ?? '')
      formData.append('description',clashData.description ?? '')
      formData.append('expire_at',date?.toISOString() ?? '')
      if(image) formData.append('image',image)
        const { data } = await axios.post(`${CLASH_URL}/create`,formData,{
      headers:{
        Authorization:user.token
      }})
      setLoading(false)
      if(data?.message){
        clearCache('dashboard')
        setClashData({})
        setDate(null)
        setImage(null)
        toast.success('Clash Added Successfully')
        setOpen(false)
      }
    } catch (error) {
       if(error instanceof AxiosError){
        if(error.response?.status===422){
            setErrors(error.response.data.errors)
        }
       }else{
        toast.error('Something went wrong please try again')
       }
    }
      
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
  <DialogTrigger asChild >
    <Button>Add Clash</Button>
  </DialogTrigger>
  <DialogContent onInteractOutside={(e)=>e.preventDefault()} >
    <DialogHeader>
      <DialogTitle>Create Description</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleSubmit} >
      <div className=' mt-4' >
         <Label htmlFor='title' >Title</Label>
         <Input id='title' 
         placeholder='Enter Your title' 
         value={clashData.title ?? ""} 
         onChange={(e)=>setClashData({...clashData, title:e.target.value})}
         />
         <span className=' text-red-500' >{errors.title}</span>
      </div>
      <div className=' mt-4' >
         <Label htmlFor='title' >description</Label>
         <Textarea id='description'
          placeholder='Enter Your Description...' 
          value={clashData.description ?? ""} 
          onChange={(e)=>setClashData({...clashData, description:e.target.value})}
          />
          <span className=' text-red-500' >{errors.description}</span>
      </div>
      <div className=' mt-4' >
         <Label htmlFor='' >Image</Label>
         <Input id='image'
         onChange={handleImageChange}
         type='file' 
         />
             <span className=' text-red-500' >{errors.image}</span>
      </div>

      <div className=' mt-4' >
         <Label htmlFor='expireAt' >Expire At</Label> <br />
         <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full mt-2 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? date.toDateString() : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ?? new Date() }
          onSelect={setDate}
        />
      </PopoverContent>
    </Popover>
    <span className=' text-red-500' >{errors.expire_at}</span>
      </div>
      <div className=' mt-4'>
        <Button className=' w-full' disabled={loading} >
          {
            loading ? 'Processing' : 'Submit'
          }
        </Button>
      </div>
    </form>
  </DialogContent>
</Dialog>

  )
}



