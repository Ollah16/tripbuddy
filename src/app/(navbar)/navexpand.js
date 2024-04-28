import Link from "next/link"
import { useAppStore } from "../appcontext"
import HistoryFeed from "../(historycomp)/historyFeed"
import NewChat from "../(historycomp)/newchat"

const NavExpand = () => {

    const { navExpandToggle } = useAppStore()


    return (
        <div className={`absolute px-1 py-2  w-[300px] bg-[#4a5568] transition-left duration-200 ease-in-out overflow-x-visible over top-16 md:hidden block bottom-0 ${!navExpandToggle ? 'left-[-1000px]' : 'left-0'}`}>

            <NewChat />
            <HistoryFeed />
            <Link href={'/'} className="border-0 block bg-[#0077B6] px-1 py-2 my-2 text-center rounded hover:bg-[#66A8D5] transition-colors duration-200 ease-in-out text-white text-sm">Login</Link>
            <Link href={'/'} className="border-0 block bg-[#3498db] hover:bg-[#2980b9] text-center transition-colors duration-200 ease-in-out px-3  py-2 text-white rounded text-sm">Sign up</Link>

        </div >
    )
}

export default NavExpand
