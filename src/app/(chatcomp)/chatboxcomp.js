import { BsSendFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from './chat.module.css'
import { useEffect, useRef } from "react";
import { useConvContext } from "../context/convoContext";

const ChatBoxComp = () => {

    const { historyToggle, setPrompt, handleConvo, prompt, handleSentPrompt, isPromptSent } = useConvContext()

    const promptRef = useRef()

    useEffect(() => {
        const textArea = promptRef.current;

        const adjustTextAreaHeight = () => {
            const lineHeight = parseInt(window.getComputedStyle(textArea).lineHeight);
            const numberOfLines = Math.floor(textArea.scrollHeight / lineHeight);

            if (numberOfLines > 2) {
                textArea.style.height = `${textArea.scrollHeight}px`;
                textArea.style.overflowY = 'auto';
                textArea.style.maxHeight = '70px';
            } else if (numberOfLines === 2) {
                textArea.style.overflowY = 'hidden';
                textArea.style.maxHeight = '';
                textArea.style.height = '40px';
            } else {
                textArea.style.overflowY = 'hidden';
                textArea.style.height = '40px';
            }
        };

        textArea.addEventListener('input', adjustTextAreaHeight);

        return () => {
            textArea.removeEventListener('input', adjustTextAreaHeight);
        };
    }, [prompt]);


    return (
        <div className={`w-11/12  ${historyToggle ? 'md:w-8/12' : 'md:w-9/12'} h-[100px] overflow-hidden py-3`}>

            <div className="border border-gray-500/50 rounded flex h-auto py-2 justify-between max-h-[80px] items-center gap-2 px-1">
                <div className="flex items-center h-auto w-full">
                    <textarea
                        ref={promptRef}
                        id="chatInput"
                        className="rounded w-full h-[40px] inline-block resize-none py-2 border-0 focus:outline-none bg-transparent overflow-hidden px-2 placeholder:md:text-base placeholder:text-xs"
                        placeholder="Hi there! What adventure shall we go on today? 🚀"
                        onInput={(e) => setPrompt(e.target.value)}
                        value={prompt}
                    ></textarea>
                </div>

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
