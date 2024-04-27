import { BsSendFill } from "react-icons/bs";
import { TiMicrophoneOutline } from "react-icons/ti";
import { FaRegImage } from "react-icons/fa6";
import { useAppStore } from "../appcontext";

const ChatBoxComp = () => {

    const { historyToggle, setPrompt, prompt, handleConvo } = useAppStore()

    return (
        <div className={`w-11/12  ${historyToggle ? 'md:w-8/12' : 'md:w-9/12'} overflow-hidden h-24`}>

            <div className="border border-gray-500/50 rounded flex items-center gap-2 px-2" onKeyUp={handleConvo}>
                <span className="flex justify-center cursor-pointer w-[5%]"><TiMicrophoneOutline className="text-xl" /></span>
                <span className="flex justify-center cursor-pointer w-[5%]"><FaRegImage className="text-xl" /></span>
                <input
                    id="chatInput"
                    className="h-16 rounded w-[85%] break-words inline-block border-0 focus:outline-none px-1 bg-transparent"
                    placeholder="Ask me anything"
                    value={prompt}
                    onInput={(e) => setPrompt(e.target.value)}
                />

                <button
                    onClick={() => handleConvo()}
                    className={`flex justify-center w-[5%] border-0 bg-transparent`} >
                    <BsSendFill
                        className={`text-xl text-black duration-200 ease-in-out hover:rotate-45 ${prompt ? 'rotate-45' : ''} transition-transform cursor-pointer animation`} />
                </button>
            </div>
        </div >
    )
}

export default ChatBoxComp
