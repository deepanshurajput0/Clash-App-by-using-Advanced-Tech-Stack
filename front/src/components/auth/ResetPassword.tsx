"use client";
import { Label } from "@radix-ui/react-label";
import { registerAction, resetPasswordAction } from "@/actions/authActions";
import { Input } from "../ui/input";
import Link from "next/link";
import { useEffect } from "react";
import { SubmitButton } from "../common/SubmitBtn";
import { useActionState } from "react";
import { useSearchParams } from 'next/navigation'
import { toast } from "sonner";

export default function ResetPassword() {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };

  const [state, formAction] = useActionState(resetPasswordAction, initState);
  const sParams = useSearchParams()
  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <div className="mt-4">
        <input type="hidden" name="token" value={sParams.get('token') ?? ''}  />
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email..."
          readOnly
          value={sParams.get('email') ?? ''}
        />
        <span className="text-red-500">{state.errors?.email}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password..."
        />
        <span className="text-red-500">{state.errors?.password}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="cpassword">Confirm Password</Label>
        <Input
          id="cpassword"
          type="password"
          name="confirm_password"
          placeholder="Enter your password..."
        />
        <span className="text-red-500">{state.errors?.confirm_password}</span>
      </div>
      <div className="text-right font-bold p-2">
        <Link href={"forget-password"}>Forget Password?</Link>
      </div>
      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
