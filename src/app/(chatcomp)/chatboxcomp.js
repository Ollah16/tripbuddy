import { BsSendFill } from "react-icons/bs";
import { useAppStore } from "../appcontext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from './chat.module.css'
import { useEffect, useRef } from "react";

const ChatBoxComp = () => {

    const { historyToggle, setPrompt, handleConvo, prompt, handleSentPrompt, isPromptSent } = useAppStore()

    const promptRef = useRef()
    const textDivRef = useRef()

    useEffect(() => {
        const textArea = promptRef.current
        const textDivArea = textDivRef.current

        const flexTextHeight = () => {

            const hasOverflowY = textArea.scrollHeight > textArea.clientHeight;

            if (hasOverflowY) {
                textArea.style.height = textArea.scrollHeight + 'px'
                textArea.style.maxHeight = 70 + 'px'
                textDivArea.style.height = textArea.scrollHeight + 'px'
                textDivArea.style.maxHeight = 70 + 'px'

            } else {
                textArea.style.height = 45 + 'px'
            }
        }

        textArea.addEventListener('input', flexTextHeight)

        return () => {
            textArea.removeEventListener('input', flexTextHeight)
        }

    }, [])

    return (
        <div className={`w-11/12  ${historyToggle ? 'md:w-8/12' : 'md:w-9/12'} h-[100px] overflow-hidden py-3`}>

            <div ref={textDivRef} className="border border-gray-500/50 rounded h-auto max-h-[90px] flex justify-between items-center py-0 gap-2 px-1" onKeyUp={handleConvo}>
                <textarea
                    ref={promptRef}
                    id="chatInput"
                    className="rounded w-full h-[45px] inline-block resize-none py-2 border-0 focus:outline-none bg-transparent my-auto overflow-auto overflow-x-hidden px-2 placeholder:md:text-base placeholder:text-xs leading-5"
                    placeholder="Hi there! What adventure shall we go on today? 🚀"
                    onInput={(e) => setPrompt(e.target.value)}
                    value={prompt}
                ></textarea>

                <button
                    onClick={() => { handleConvo(); handleSentPrompt(true) }}
                    className={`flex justify-center w-10 h-10 border-0 bg-transparent relative items-center`} >
                    <AiOutlineLoading3Quarters className={`text-xl absolute text-black ${styles.loading_animation} transition-opacity ease-in-out duration-200 ${isPromptSent ? 'opacity-100' : 'opacity-0'}`} />

                    <BsSendFill className={`text-xl absolute ${!isPromptSent ? 'opacity-100' : 'opacity-0'} transition-opacity ease-in-out duration-200 text-black hover:rotate-45 ${prompt.trim('/n') ? 'rotate-45' : ''} transition-transform cursor-pointer animation`} />
                </button>
            </div>
        </div >
    )
}

export default ChatBoxComp
