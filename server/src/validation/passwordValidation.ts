import { z } from 'zod'

export const forgetPasswordSchema = z.object({
    email:
     z.string({message:'Email is required'})
     .email({message:'Email must be a correct email'}),
})



export const resetPasswordSchema = z
  .object({
    email: z
      .string({ message: "Email is required" })
      .email({ message: "Please type correct email" }),
    token: z
      .string({ message: "Token is required" }),
    password: z
      .string({ message: "Password is required" })
      .min(6, { message: "Password must be 6 characters long" }),
    confirm_password: z
      .string({ message: "Confirm password is required" })
      .min(6, { message: "Confirm Password must be 6 characters long" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm password not matched",
    path: ["confirm_password"],
  });

