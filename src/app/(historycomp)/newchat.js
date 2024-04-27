import { useAppStore } from "../appcontext"
import { MdOutlineWebhook } from "react-icons/md";
import { TiMessageTyping } from "react-icons/ti";

const NewChat = () => {
    const { handleNewConversation } = useAppStore()

    return (
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
        </div>)
}

export default NewChat
