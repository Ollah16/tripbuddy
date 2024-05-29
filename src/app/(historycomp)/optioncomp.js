import { useEffect, useRef } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { useHistoryFeed } from "./historycontext";

const OptionComp = ({ convId, historyId, isOption }) => {

    const options = [
        { func: 'Rename', icon: <FiEdit2 /> },
        { func: 'Delete chat', icon: <MdOutlineDelete />, color: 'text-red-500' }
    ]

    const { handleOptionEvents, setHistoryUpdate } = useHistoryFeed()

    const optionRef = useRef()

    useEffect(() => {
        // monitor dropdown options when the mouse cursor leaves the area
        const optionCurrent = optionRef.current

        optionCurrent.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            optionCurrent.removeEventListener('mouseleave', handleMouseLeave)
        }

    }, [])



    const handleMouseLeave = () => {
        // Close dropdown options when the mouse cursor leaves the area

        const convHistory = JSON.parse(localStorage.getItem('convHistory'));

        const updateHistory = convHistory.map(hist => {

            return {
                ...hist,
                convoArr: hist.convoArr.map(conv => ({
                    ...conv,
                    isOption: false
                }))
            };
        });

        localStorage.setItem('convHistory', JSON.stringify(updateHistory));

        setHistoryUpdate(prev => !prev);
    }

    return (
        <span ref={optionRef} className={`${isOption ? 'flex' : 'hidden'} flex-col gap-1 py-2 px-3 absolute right-0 bottom-[-80px] bg-black/90 z-50 rounded`}>
            {options.map((opt, index) => (
                <button key={index} onClick={() => handleOptionEvents(opt.func, convId, historyId)} className={`flex w-32 gap-1 items-center transition-border ease-in-out duration-200 border border-black rounded hover:bg-white/5 hover:border-white px-2 py-1 text-sm ${opt.color && opt.color}`}><span>{opt.icon}</span><span>{opt.func}</span></button>
            ))}
        </span>)
}

export default OptionComp
