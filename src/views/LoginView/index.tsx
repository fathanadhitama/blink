'use client'

import React, { useEffect, useState } from "react";
import Footer from "../HomeView/elements/Footer";
import { useAuthContext } from "@/components/contexts/AuthContext";
import { toast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { InfinitySpin } from "react-loader-spinner";

function LoginView() {
  const router = useRouter()

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const { login, error, isLoading } = useAuthContext()

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
    <main className="flex overflow-hidden flex-col items-center pt-8 min-h-screen bg-[#141414] lg:px-10 gap-5">
      <h1 className='text-3xl lg:text-[50px] font-bold'>blink.<span className='text-[#FAD810]'>it</span></h1>
      <section className="w-full my-20 lg:w-1/3 bg-[#1F1F1F] rounded-3xl p-7 lg:p-10 lg:py-7 min-h-full flex flex-col justify-center items-center">
      <h2 className="font-semibold text-xl mb-3">Sign in</h2>
        <div className="flex flex-col gap-5 w-full mb-3">
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
            <Button onClick={handleLogin} disabled={isLoading || !emailValue || !passwordValue}>
              {isLoading ? <InfinitySpin width="50" color="#fad810" /> : 'Sign in'}
            </Button>
        </div>
        <p className="text-xs">Are you new here? <span className="text-yellow-300 font-bold hover:cursor-pointer" onClick={() => router.push('/signup')}>Sign up!</span></p>
      </section>
      <Footer />
    </main>
  )
}

export default LoginView;
