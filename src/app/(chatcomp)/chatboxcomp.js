import { BsSendFill } from "react-icons/bs";
import { TiMicrophoneOutline } from "react-icons/ti";
import { FaRegImage } from "react-icons/fa6";
import { useAppStore } from "../appcontext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from './chat.module.css'

const ChatBoxComp = () => {

    const { historyToggle, setPrompt, handleConvo, prompt, handleSentPrompt, isPromptSent } = useAppStore()

    return (
        <div className={`w-11/12  ${historyToggle ? 'md:w-8/12' : 'md:w-9/12'} overflow-hidden h-24`}>

            <div className="border border-gray-500/50 rounded flex items-center gap-2 px-2" onKeyUp={handleConvo}>
                <span className="flex justify-center cursor-pointer w-[5%]"><TiMicrophoneOutline className="text-xl" /></span>
                <span className="flex justify-center cursor-pointer w-[5%]"><FaRegImage className="text-xl" /></span>
                <input
                    id="chatInput"
                    className="h-16 rounded w-[85%] align-middle inline break-words py-5 resize-none border-0 focus:outline-none px-1 bg-transparent"
                    placeholder="Ask me anything"
                    onInput={(e) => setPrompt(e.target.value)}
                    value={prompt}
                />


                <button
                    onClick={() => { handleConvo(); handleSentPrompt(true) }}
                    className={`flex justify-center w-[5%] border-0 bg-transparent`} >
                    {isPromptSent && <AiOutlineLoading3Quarters className={`text-xl text-black ${styles.loading_animation}`} />}

                    {!isPromptSent && <BsSendFill className={`text-xl text-black duration-200 ease-in-out hover:rotate-45 ${prompt ? 'rotate-45' : ''} transition-transform cursor-pointer animation`} />}
                </button>
            </div>
        </div >
    )
}

export default ChatBoxComp
