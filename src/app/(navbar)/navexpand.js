'use client'

import Link from "next/link"
import { useToggle } from "../toggleContext"
import { navList } from "./navlist"
import { useEffect } from "react"

const NavExpand = () => {

    const { navExpandToggle } = useToggle()

    useEffect(() => {
        const bodyEffect = () => document.querySelector('body').style.overflow = navExpandToggle ? 'hidden' : 'auto'
        bodyEffect()
    }, [navExpandToggle])

    return (
        <div className={`absolute px-4 min-h-screen w-[300px] bg-[#4a5568] transition-left duration-200 ease-in-out overflow-y-auto top-16 md:hidden block bottom-0 ${!navExpandToggle ? 'left-[-1000px]' : 'left-0'}`}>
            <ul className="flex flex-col">
                {navList.map((list, index) => (
                    <li key={index} className={`text-[#f0f0f0] cursor-pointer py-2 after:w-full relative
                     after:bg-white after:absolute after:h-[0.5px] after:bottom-0 after:left-0 after:content-['']`}>{list}</li>
                ))}

                <Link href={'/'} className="border-0 bg-[#0077B6] px-3 py-2 my-2 text-center rounded hover:bg-[#66A8D5] transition-colors duration-200 ease-in-out text-white text-sm">Login</Link>
                <Link href={'/'} className="border-0 bg-[#3498db] hover:bg-[#2980b9] text-center transition-colors duration-200 ease-in-out px-3  py-2 text-white rounded text-sm">Sign up</Link>
            </ul>
        </div >
    )
}

export default NavExpand
