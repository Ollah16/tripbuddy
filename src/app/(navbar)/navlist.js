'use client'
import { useEffect, useRef } from "react"
import { useAppStore } from "../appcontext"

export const navList = ['About', 'Activities', 'FAQs']


const Navlist = () => {
    const navListRef = useRef()
    const navHover = useRef()
    const { historyToggle, handleHisToggle } = useAppStore()

    useEffect(() => {
        const listRef = navListRef.current
        listRef.addEventListener('mouseover', handleMouseOver)
        listRef.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            listRef.removeEventListener('mouseover', handleMouseOver)
            listRef.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [])

    const handleMouseOver = (e) => {
        const currentTarget = e.target.nodeName
        if (currentTarget === 'LI') {
            const rect = e.target.getBoundingClientRect()
            navHover.current.style.width = `${rect.width}px`
            navHover.current.style.left = `${rect.left}px`
            navHover.current.style.height = `5px`
        }
    }

    const handleMouseLeave = (e) => {
        navHover.current.style.height = `0px`
    }

    const handleNavList = (toggleType) => {
        handleHisToggle(!historyToggle)
    }

    return (
        <ul className=" gap-3 h-full hidden md:flex" ref={navListRef}>
            {navList.map((list, index) => (
                <li key={index} onClick={() => handleNavList(list)} className="cursor-pointer text-[#3498db] font-semibold px-2 py-5 text-md">
                    <span>{list}</span>
                </li>
            ))}
            <li className={`absolute bg-[#3498db] h-0 bottom-0 transition-left transition-height transition-width duration-200 ease-in-out`} ref={navHover}></li>
        </ul>
    )
}

export default Navlist
