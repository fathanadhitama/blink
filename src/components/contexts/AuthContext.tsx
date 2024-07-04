'use client'

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { jwtDecode } from "jwt-decode"
import { toast } from "../Toast";

type AuthContextType = {
    userEmail: string
    login: (data: {
        email: string
        password: string
    }) => void
    logout: () => void
    signup: (data : {
        name: string
        email: string
        password: string
    }) => void
    error: string
    isLoading: boolean
}

type AuthContextProviderType = {
    children: React.ReactNode
}

const AuthContext = createContext({} as AuthContextType)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children } : AuthContextProviderType) => {
    const [userEmail, setUserEmail] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const login = async (data : {email: string, password: string}) => {
        setIsLoading(true)
        await axios.post('/api/auth/login', {
            email: data.email,
            password: data.password
        })
        .then(function (response) {
            console.log(response)

            if (response.status !== 200) {
                setError(response.data)
            }

            setCookie("token", response.data.token)

            toast.success("Sign in success!")
            
            const decodedToken = jwtDecode<{ userEmail: string }>(response.data.token);
            
            setUserEmail(decodedToken.userEmail)
            router.push(`/`)
        })
        .catch(function (error) {
            console.log(error.response.data.error);
            setError(error.response.data.error)
        });
        setIsLoading(false)
    }
    
    const logout = () => {
        setUserEmail('')
        deleteCookie('token')
        router.push('/login')
    }
    
    const signup = async (data : {
        name: string
        email: string
        password: string
    }) => {
        setIsLoading(true)
        await axios.post('/api/auth/signup', {
            email: data.email,
            name: data.name,
            password: data.password
        })
        .then(response => {
            console.log(response)
            if (response.status !== 200) {
                setError(response.data)
            }
            toast.success("Sign up success!")
            router.push('/login')
        })
        .catch(error => {
            console.log(error.response.data.message)
            setError(error.response.data.message)
            return
        })
        setIsLoading(false)
    }

    useEffect(() => {
        const token = getCookie("token")
    
        if (token && token !== "undefined") {
            const decodedToken = jwtDecode<{ userEmail: string }>(token);
            setUserEmail(decodedToken.userEmail)
        }
    }, [])

    const contextValue = {
        userEmail,
        login,
        logout,
        signup,
        error,
        isLoading,
    }


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}