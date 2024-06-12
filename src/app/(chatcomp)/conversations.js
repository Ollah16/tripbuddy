'use client'

import { PiUserDuotone } from "react-icons/pi";
import { MdOutlineWebhook } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import styles from './chat.module.css'
import { MdOutlineEdit } from "react-icons/md";
import { useHistoryFeed } from "../context/historycontext";
import { useConvContext } from "../context/convoContext";

const Conversations = () => {

    const { historyToggle, convoArr, isConvEdits } = useConvContext()

    const { handleAmends, setEditPrompt } = useHistoryFeed()

    const convRef = useRef()

    // update if screen is fully loaded to remove scroll btn

    const [convScroll, setConvScroll] = useState(true)

    useEffect(() => {
        // monitor any edits on the screen and hinder scroll

        if (isConvEdits) return

        handleScrollDown()

    }, [convoArr, isConvEdits])


    useEffect(() => {

        // Define a stable scroll event handler

        const handleScroll = () => {
            if (convRef.current) {
                const isFullyScrolled = convRef.current.scrollTop + convRef.current.clientHeight === convRef.current.scrollHeight;
                setConvScroll(isFullyScrolled);
            }
        };

        // Attach the scroll event listener if the element exists.

        const element = convRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
        }

        // Return a cleanup function to remove the event listener when the component unmounts or the dependencies change.

        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
        };
    }, [])

    const handleScrollDown = () => convRef.current.scrollTo({
        // scroll down the conversation box when theres overflow
        top: convRef.current.scrollHeight,
        behavior: 'smooth'
    });

    return (<div ref={convRef} className={`bg-gray-200 ${styles.conversation_box} border rounded ${historyToggle ? 'md:w-8/12' : 'md:w-9/12'} border-gray-900/10 overflow-y-auto w-11/12 mx-auto p-5 ${convoArr.length ? 'block' : 'hidden'}`}>
        <div>
            <ul className="inline-block w-full text-gray-800 relative">
                {convoArr.map((chat, index) => (
                    <li key={index} className="flex flex-col gap-2 my-2 w-full">
                        <div className="flex flex-col gap-1 promptDiv">
                            <span className="flex items-center gap-2">
                                <span className="border border-black rounded-full p-0">
                                    <PiUserDuotone className="text-xl text-gray-800" />
                                </span>
                                <span className="text-md font-bold">You</span>
                            </span>
                            <div className="ml-[1.5rem] flex flex-col">
                                <span className={`text-pretty break-words ${chat.isEdit ? 'hidden' : 'block'}`}>{chat.prompt}</span>

                                {chat.isEdit &&
                                    <input onInput={(e) => setEditPrompt(e.target.value)} defaultValue={chat.prompt}
                                        className={`caret-black mb-2 text-wrap w-full h-auto rounded px-1 resize-none block focus:border border-white bg-transparent focus:outline-none`} />
                                }

                                <button className={`${chat.isEdit ? 'hidden' : 'block'} bg-transparent edit_Btn`}
                                    onClick={() => handleAmends({ amendType: 'edit', convId: chat.convId })} ><MdOutlineEdit /></button>

                                <div className={`flex flex-col gap-2 ${chat.isEdit ? 'block' : 'hidden'}`}>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAmends({ amendType: 'save', convId: chat.convId })} className="bg-green-800 transition-bg ease-in-out duration-100 hover:bg-green-800/90 p-1 rounded text-white">Save & Submit</button>
                                        <button onClick={() => handleAmends({ amendType: 'cancel', convId: chat.convId })} className="bg-transparent p-1 rounded  hover:bg-transparent/10 border border-black/70">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-2">
                                <span className="border border-black rounded-full p-0">
                                    <MdOutlineWebhook className="text-xl text-gray-800" />
                                </span>
                                <span className="text-md font-bold">Pal</span>
                            </span>

                            <span className="ml-[1.5rem] response">{chat.response}</span>

                        </div>
                    </li >
                ))}
            </ul >
        </div>
        <button onClick={() => handleScrollDown()} className={`${convScroll} rounded-full w-fit mx-auto p-2 bottom-[10rem] absolute hover:bg-white/80 transition-color ease-in-out duration-200 delay-500 ${!convScroll ? `block` : 'hidden'} left-0 right-0 bottom-36 bg-white/70`}><FaAngleDown className="text-2xl text-black" /></button>

    </div >
    )
}

export default Conversations
