'use client'
import { useAppStore } from "../appcontext"
import { GrClose } from "react-icons/gr";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const HistoryToggle = () => {
    const { historyToggle, handleHisToggle } = useAppStore()

    return (
        <ul className={`gap-3 h-full hidden md:flex fixed top-[50%] transition-left ease-in-out duration-200 ${historyToggle ? 'left-[300px]' : 'left-0'}`}>
            <li onClick={() => handleHisToggle(!historyToggle)} className="cursor-pointer text-[#3498db] font-semibold px-2 py-5 text-md">
                <span className={`text-3xl flex bg-gray-800/40 relative text-white p-1 items-center justify-center w-10 h-10 rounded hover:bg-gray-800/70 transition-colors ease-in-out duration-100`}>
                    <GrClose className={`${historyToggle ? 'opacity-100' : 'opacity-0'} absolute mx-auto`} />
                    <MdOutlineArrowForwardIos className={`${historyToggle ? 'opacity-0' : 'opacity-100'} absolute`} />
                </span>
            </li>
        </ul>
    )
}

export default HistoryToggle
