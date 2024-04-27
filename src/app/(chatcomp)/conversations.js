import { PiUserDuotone } from "react-icons/pi";
import { MdOutlineWebhook } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { useAppStore } from "../appcontext";
import styles from './chat.module.css'

const Conversations = () => {

    const { historyToggle, convoArr } = useAppStore()
    const convRef = useRef()
    const [convScroll, setConvScroll] = useState(true)

    useEffect(() => {
        handleScrollDown()
    }, [convoArr])

    let prevScrollTop = convRef.current?.scrollTop

    useEffect(() => {
        convRef.current?.addEventListener('scroll', (e) => {
            const currScrollTop = convRef.current.scrollTop
            if (prevScrollTop < currScrollTop) {
                return prevScrollTop = currScrollTop
            }
            const isFullyScrolled = convRef.current.scrollTop === (convRef.current.scrollHeight - convRef.current.clientHeight)
            setConvScroll(isFullyScrolled)

        })

        return () => {
            convRef.current?.removeEventListener('scroll', () => {
                setConvScroll(isFullyScrolled)
            })
        }
    }, [])

    const handleScrollDown = () => convRef.current?.scrollTo({
        top: convRef.current.scrollHeight,
        behavior: 'smooth'
    });

    return (<div ref={convRef} className={`bg-gray-200 ${styles.conversation_box} border rounded ${historyToggle ? 'md:w-8/12' : 'md:w-9/12'} border-gray-900/10 overflow-y-auto w-11/12 mx-auto p-5 ${convoArr.length ? 'block' : 'hidden'}`}>
        <div>
            <ul className="inline-block w-full text-gray-800 relative">
                {convoArr.map((chat, index) => (
                    <li key={index} className="flex flex-col gap-2 my-2 w-full">
                        <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-2">
                                <span className="border border-black rounded-full p-0">
                                    <PiUserDuotone className="text-xl text-gray-800" />
                                </span>
                                <span className="text-md font-bold">You</span>
                            </span>
                            <span className="ml-[1.5rem] text-pretty break-words">{chat.prompt}</span>
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
        <button onClick={() => handleScrollDown()} className={`${convScroll} rounded-full w-fit mx-auto p-2 absolute hover:bg-white/80 transition-color ease-in-out duration-200 delay-500 ${!convScroll ? `block` : 'hidden'} left-0 right-0 bottom-36 bg-white/70`}><FaAngleDown className="text-2xl text-black" /></button>

    </div >
    )
}

export default Conversations
