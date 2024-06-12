'use client'

import { useConvContext } from "../context/convoContext"

const NavBurger = () => {
    const { navExpandToggle, handleNavToggle } = useConvContext()

    return (
        <div className="relative flex flex-col justify-center md:hidden gap-1 cursor-pointer w-6 h-6 overflow-hidden" onClick={() => handleNavToggle(!navExpandToggle)}>
            <hr className={`bg-[#3498db] h-1 w-6 border-0 transition-transform ease-in-out duration-200 ${navExpandToggle ? 'absolute top-auto bottom-auto right-0 rotate-[50deg]' : ''}`}></hr>
            <hr className={`bg-[#3498db] h-1 w-4 border-0 ml-auto relative transition-right duration-100 ease-in-out ${navExpandToggle ? 'opacity-0' : 'opacity-100'}`}></hr>
            <hr className={`bg-[#3498db] h-1 w-6 border-0 transition-transform ease-in-out duration-200 ${navExpandToggle ? 'absolute top-auto bottom-auto right-0 rotate-[-50deg]' : ''}`}></hr>
        </div>
    )
}

export default NavBurger
