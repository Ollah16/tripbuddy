import { useConvContext } from "../context/convoContext";
import HistoryFeed from "./historyFeed";
import NewChat from "./newchat";

const HistoryExpanded = () => {

    const { historyToggle } = useConvContext()

    return (
        <div className={`absolute min-h-screen z-30 py-3 px-2 top-16 hidden transition-left ease-in-out duration-200 md:block bottom-0 ${!historyToggle ? 'left-[-1000px]' : 'left-0'} w-[300px] bg-[#4a5568] text-white`}>

            <NewChat />
            <div>
                <HistoryFeed />
            </div>
        </div >
    )
}

export default HistoryExpanded
