'use client'

import React, { useEffect, useState } from "react";
import Footer from "../HomeView/elements/Footer";
import { useAuthContext } from "@/components/contexts/AuthContext";
import { toast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

function LoginView() {
  const router = useRouter()

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const { login, error } = useAuthContext()

    const handleLogin = () => {
      login({
        email: emailValue,
        password: passwordValue
      })
    }

    useEffect(()=>{
        if (error != '')
        toast.error(error)
    },[error])

  return (
    <main className="flex overflow-hidden flex-col items-center justify-center min-h-screen bg-[#141414] lg:px-10 gap-10">
      <section className="w-11/12 lg:w-1/2 bg-[#1F1F1F] rounded-3xl p-7 lg:p-10 py-7 min-h-full flex flex-col justify-center items-center">
        <h1>Sign in</h1>
        <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="email" 
                onChange={(e) => setEmailValue(e.target.value)}
                value={emailValue}
                className='text-white text-sm bg-white/10 rounded-md p-3
              placeholder:text-stone-500 focus:placeholder:text-yellow-400/[.5] hover:placeholder:text-yellow-400/[.5]'/>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="password"
                onChange={(e) => setPasswordValue(e.target.value)}
                value={passwordValue}
                className='text-white text-sm bg-white/10 rounded-md p-3
                placeholder:text-stone-500 focus:placeholder:text-yellow-400/[.5] hover:placeholder:text-yellow-400/[.5]'/>
            </div>
            <Button onClick={handleLogin}>Login</Button>
        </div>
        <p>Are you new here? <span className="text-yellow-300" onClick={() => router.push('/signup')}>Sign up!</span></p>
      </section>
      <Footer />
    </main>
  )
}

export default LoginView;