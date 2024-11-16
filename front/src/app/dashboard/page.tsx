import React from 'react'
import Navbar from '@/components/base/Navbar'
import AddClash from '@/components/clash/AddClash'
import { getServerSession } from 'next-auth'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { ClashType } from '@/types'
import fetchClashes from '@/fetch/clashFetch'
import ClashCard from '@/components/clash/ClashCard'
export default async function dashboard() {
  const session:CustomSession | null = await getServerSession(authOptions)
  const clashes:Array<ClashType> | [] = await fetchClashes(session?.user.token!)
  return (
    <div className=' container'>
      <Navbar/>
      <div className=' text-end mt-10 mr-5' >
          <AddClash user={session?.user!} />
      </div>
      <div className=' flex space-x-5 flex-wrap space-y-4 items-center' >
           {
            clashes.length > 0 && clashes.map((item,index)=> <ClashCard clash={item} key={index} token={session?.user.token} />)
           }
      </div>
    </div>
  )
}




