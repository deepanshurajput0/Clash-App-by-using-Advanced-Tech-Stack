import React from "react";
import Link from "next/link";
import Register from "@/components/auth/Register";
export default function register() {
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
