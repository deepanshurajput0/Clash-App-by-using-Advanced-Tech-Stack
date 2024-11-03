import React from "react";
import { getServerSession } from 'next-auth'
import { authOptions } from "./api/auth/[...nextauth]/options";
import HeroSection from "@/components/base/HeroSection";
export default async function Home(){
  const session = await getServerSession(authOptions)
  console.log('This is session data ', session) 
  return(
    <div>
      <HeroSection/>
    </div>
  )
}