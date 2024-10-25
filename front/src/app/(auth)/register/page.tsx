import React from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function register() {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-[550px] bg-white rounded-xl py-5 shadow-md space-y-2 pl-5 pr-5">
        <h1 className=" text-3xl  font-bold text-center"> Clash </h1>
        <h1 className=" text-2xl  font-bold"> Register </h1>
        <p>Welcome Back </p>
        <form>
          <div className=" mt-4">
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name..."
            />
          </div>
          <div className=" mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className=" mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password..."
            />
          </div>
          <div className=" mt-4">
            <Label htmlFor="password">Confirm Password</Label>
            <Input
              id="cpassword"
              type="password"
              name="cpassword"
              placeholder="Enter your password..."
            />
          </div>
          <div className=" text-right font-bold p-2">
            <Link href={"forget-password"}>Forget Password ?</Link>
          </div>
          <div className=" mt-4">
            <Button className=" w-full">Submit</Button>
          </div>
        </form>
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
