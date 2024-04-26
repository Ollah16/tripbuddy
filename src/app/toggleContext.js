'use client'
import { createContext, useState, useContext } from 'react'

const ToggleContext = createContext(null)

export const HandleToggle = ({ children }) => {
    const [historyToggle, handleHisToggle] = useState(false)
    const [navExpandToggle, hanleNavToggle] = useState(false)

    return (
        <ToggleContext.Provider value={{ historyToggle, handleHisToggle, navExpandToggle, hanleNavToggle, }}>
            {children}
        </ToggleContext.Provider>
    )
}

export const useToggle = () => useContext(ToggleContext)

