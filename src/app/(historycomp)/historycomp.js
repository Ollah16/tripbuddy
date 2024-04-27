import { TiMessageTyping } from "react-icons/ti";
import { MdOutlineWebhook } from "react-icons/md";
import { useEffect, useState } from "react";
import HistoryDisplay from "./historydisplay";
import { useAppStore } from "../appcontext";
import { processedHistory } from "./processhistory";
import HistoryFeed from "./historyFeed";

const HistoryExpanded = () => {

    const { handleNewConversation, historyToggle } = useAppStore()

    return (
        <div className={`absolute min-h-screen overflow-y-visible z-30 py-3 px-2 top-16 hidden transition-left ease-in-out duration-200 md:block bottom-0 ${!historyToggle ? 'left-[-1000px]' : 'left-0'} w-[300px] bg-[#4a5568] text-white`}>
            <div className="mb-2">
                <label className="flex py-1 px-1 rounded items-center justify-between cursor-pointer hover:bg-[#e7e9ee]/10 transition-colors duration-200 ease-in-out" htmlFor="chatInput"
                    onClick={() => handleNewConversation()}
                >

                    <div className="flex gap-3 items-center">
                        <span className="border rounded-full p-0"><MdOutlineWebhook className="text-lg" /></span>
                        <span className="text-md tracking-tighter">New Chat</span>
                    </div>
                    <span><TiMessageTyping className="text-2xl" /></span>
                </label>
            </div>
            <div>


                <HistoryFeed />

            </div>
        </div >
    )
}

export default HistoryExpanded
