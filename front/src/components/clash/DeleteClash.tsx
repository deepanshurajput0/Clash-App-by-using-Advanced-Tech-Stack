import React, { Dispatch, SetStateAction, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import axios from 'axios'
import { CLASH_URL } from '@/lib/apiEndPoints'
import { clearCache } from '@/actions/commonActions'
  
export default function DeleteClash({open,setOpen,id,token}:{open:boolean,setOpen:Dispatch<SetStateAction<boolean>>,id:number,token:string}) {
    const [loading, setLoading] = useState(false)
  const deleteClash =async()=>{
     try {
        setLoading(true)
        const { data } = await axios.delete(`${CLASH_URL}/${id}`,{
            headers:{
                Authorization:token
            }
        })
        if(data.message){
            setLoading(false)
            clearCache('dashboard')
            toast.success(data.message)
        }
     } catch (error) {
        setLoading(false)
        toast.error('Something went wrong')
     }
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen} >
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action will delete your Clash  
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deleteClash} disabled={loading} >
        {loading ? 'Processing' : 'Yes Continue'}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}



