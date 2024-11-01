import React from "react";
import { getServerSession } from 'next-auth'
import HeroSection from "@/components/base/HeroSection";
export default async function Home(){
  const session = await getServerSession()
  console.log(session) 
  return(
    <div>
      <HeroSection/>
    </div>
  )
}