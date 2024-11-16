import React from "react";
import Link from "next/link";
import Register from "@/components/auth/Register";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export default async function register() {
  const session = await getServerSession(authOptions)
  if(session){
    redirect('/dashboard')
  }

  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-[550px] bg-white rounded-xl py-5 shadow-md space-y-2 pl-5 pr-5">
        <h1 className=" text-3xl  font-bold text-center"> Clash </h1>
        <h1 className=" text-2xl  font-bold"> Register </h1>

         <Register/>
        <p className=" text-center mt-2">
          Already have an account{" "}
          <strong>
            <Link href={"/login"}> Login Now </Link>
          </strong>
        </p>
      </div>
    </div>
  );
}
