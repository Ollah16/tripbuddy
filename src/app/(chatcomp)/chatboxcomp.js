import { BsSendFill } from "react-icons/bs";
import { useAppStore } from "../appcontext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from './chat.module.css'

const ChatBoxComp = () => {

    const { historyToggle, setPrompt, handleConvo, prompt, handleSentPrompt, isPromptSent } = useAppStore()

    return (
        <div className={`w-11/12  ${historyToggle ? 'md:w-8/12' : 'md:w-9/12'} overflow-hidden h-24`}>

            <div className="border border-gray-500/50 rounded flex justify-between items-center gap-2 px-2" onKeyUp={handleConvo}>
                <input
                    id="chatInput"
                    className="h-16 rounded w-[85%] align-middle inline break-words py-5 resize-none border-0 focus:outline-none px-1 bg-transparent"
                    placeholder="Hi there! What adventure shall we go on today? 🚀"
                    onInput={(e) => setPrompt(e.target.value)}
                    value={prompt}
                />


                <button
                    onClick={() => { handleConvo(); handleSentPrompt(true) }}
                    className={`flex justify-center w-10 h-10 border-0 bg-transparent relative items-center`} >
                    <AiOutlineLoading3Quarters className={`text-xl absolute text-black ${styles.loading_animation} transition-opacity ease-in-out duration-200 ${isPromptSent ? 'opacity-100' : 'opacity-0'}`} />

                    <BsSendFill className={`text-xl absolute ${!isPromptSent ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in-out duration-200 text-black hover:rotate-45 ${prompt ? 'rotate-45' : ''} transition-transform cursor-pointer animation`} />
                </button>
            </div>
        </div >
    )
}

export default ChatBoxComp
