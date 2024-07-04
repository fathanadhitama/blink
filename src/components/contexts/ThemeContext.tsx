'use client'

import { createContext, useContext } from "react"

type Theme = {
    colors: {
        primary: string
        secondary: string
    }
}

const defaultTheme : Theme = {
    colors: {
        primary: '#141414',
        secondary: '#fad810'
    }
}

const ThemeContext = createContext<Theme>(defaultTheme)

export const useTheme = () => useContext(ThemeContext)

export const ThemeContextProvider = (
    {children} : {children: React.ReactNode}
) => {
    return (
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider>
    )
}

