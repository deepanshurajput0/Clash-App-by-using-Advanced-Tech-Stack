import { LOGIN_URL } from "@/lib/apiEndPoints"
import axios from "axios"
import { AuthOptions, ISODateString } from "next-auth"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { signIn } from "next-auth/react"

export type CustomSession = {
    user:CustomUser,
    expires:ISODateString
}

export type CustomUser = {
  id:string | null 
  name:string | null
  email:string | null
  token:string | null
}

export const authOptions = {
   pages:{
    signIn:"/login"
   },
    callbacks:{
        async session({session,token,user}:{session:CustomSession,token:JWT,user:CustomUser}){
          session.user = token.user as CustomUser
          return session
        },
        async jwt({token,user}:{token:JWT,user:CustomUser}){
          if(user){
            token.user = user
          }
          return token
        }
    }
   ,
  providers: [
   CredentialsProvider({
    name:"Credentials",
    credentials:{
        email:{},
        password:{}
    },
    async authorize(credentials,req){
      const { data } = await axios.post(LOGIN_URL,credentials)
      const user = data?.data
      
       if(user){
         return user
       }else{
        return null
       }
    }
   })
    
  ],
}

export default NextAuth(authOptions)