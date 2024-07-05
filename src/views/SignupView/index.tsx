'use client'

import React, { useEffect, useState } from "react";
import Footer from "../HomeView/elements/Footer";
import { useAuthContext } from "@/components/contexts/AuthContext";
import { toast } from "@/components/Toast";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { InfinitySpin } from "react-loader-spinner";

function SignupView() {
  const router = useRouter()

    const [emailValue, setEmailValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
    const [formErrors, setFormErrors] = useState({email: '', password: '', confirmPassword: ''})

    const { signup, error, isLoading } = useAuthContext()

    const handleSignup = () => {
        let errors = { email: '', password: '', confirmPassword: ''};

        if (passwordValue.length < 8) {
            errors.password = "Password length must be at least 8 characters."
        }
        if (passwordValue != confirmPasswordValue) {
            errors.confirmPassword = "Passwords do not match.";
        }

        if (!isEmailValid(emailValue)) {
            errors.email = "Please input a valid email.";
        }

        if (errors.email || errors.password || errors.confirmPassword) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({ email: '', password: '', confirmPassword: ''});

        signup({
            name: nameValue,
            email: emailValue,
            password: passwordValue
        })
    }

    const isEmailValid = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return false
        }
        return true
    }

    useEffect(()=>{
        if (error != '')
        toast.error(error)
    },[error])

  return (
    <main className="flex overflow-hidden flex-col items-center pt-8 min-h-screen bg-[#141414] lg:px-10 gap-5">
        <h1 className='text-3xl lg:text-[50px] font-bold'>blink.<span className='text-[#FAD810]'>it</span></h1>
      <section className="w-full lg:w-1/3 bg-[#1F1F1F] rounded-3xl p-7 lg:p-10 lg:py-7 min-h-full flex flex-col justify-center items-center">
        <h2 className="font-semibold text-xl mb-3">Sign up</h2>
        <div className="flex flex-col gap-5 w-full mb-3">
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold" htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Budi" 
                onChange={(e) => setNameValue(e.target.value)}
                value={nameValue}
                className='text-white text-sm bg-white/10 rounded-md p-3
              placeholder:text-stone-500 focus:placeholder:text-yellow-400/[.5] hover:placeholder:text-yellow-400/[.5]'/>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold" htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="budi@gmail.com" 
                onChange={(e) => setEmailValue(e.target.value)}
                value={emailValue}
                className='text-white text-sm bg-white/10 rounded-md p-3
                placeholder:text-stone-500 focus:placeholder:text-yellow-400/[.5] hover:placeholder:text-yellow-400/[.5]'/>
                {formErrors.email && <p className="text-xs text-red-400">{formErrors.email}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold" htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="min. 8 characters"
                onChange={(e) => setPasswordValue(e.target.value)}
                value={passwordValue}
                className='text-white text-sm bg-white/10 rounded-md p-3
                placeholder:text-stone-500 focus:placeholder:text-yellow-400/[.5] hover:placeholder:text-yellow-400/[.5]'/>
                {formErrors.password && <p className="text-xs text-red-400">{formErrors.password}</p>}
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold" htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" placeholder="enter your password again"
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
                value={confirmPasswordValue}
                className='text-white text-sm bg-white/10 rounded-md p-3
                placeholder:text-stone-500 focus:placeholder:text-yellow-400/[.5] hover:placeholder:text-yellow-400/[.5]'/>
                {formErrors.confirmPassword && <p className="text-xs text-red-400">{formErrors.confirmPassword}</p>}
            </div>
            <Button onClick={handleSignup} disabled={isLoading || !emailValue || !passwordValue || !confirmPasswordValue || !nameValue}>
                {isLoading ? <InfinitySpin width="50" color="#fad810" /> : 'Sign up'}
            </Button>
        </div>
        <p className="text-xs">Already have an account? <span className="text-yellow-300 font-bold hover:cursor-pointer" onClick={() => router.push('/login')}>Sign in!</span></p>
      </section>
      <Footer />
    </main>
  )
}

export default SignupView;
