import { useAppStore } from "../appcontext"
import HistoryFeed from "../(historycomp)/historyFeed"
import NewChat from "../(historycomp)/newchat"

const NavExpand = () => {

    const { navExpandToggle } = useAppStore()


    return (
        <div className={`absolute px-1 py-2 w-[300px] bg-[#4a5568] transition-left duration-200 ease-in-out overflow-x-visible over top-16 md:hidden block bottom-0 ${!navExpandToggle ? 'left-[-1000px]' : 'left-0'}`}>

            <NewChat />
            <HistoryFeed />
        </div >
    )
}

export default NavExpand
