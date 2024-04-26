'use client'
import Link from "next/link"

const NavAuthBtn = () => {
    return (
        <div className="gap-3 hidden md:flex">
            <Link href={'/'} className="border-0 bg-inherit px-5 py-2 text-[#3498db] text-sm">Login</Link>
            <Link href={'/'} className="border-0 bg-[#3498db] px-5 py-2 text-white rounded text-sm">Sign up</Link>
        </div>
    )
}

export default NavAuthBtn
