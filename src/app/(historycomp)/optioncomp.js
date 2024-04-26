import { FiShare } from "react-icons/fi";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

const OptionComp = () => {

    const options = [
        { func: 'Share', icon: <FiShare /> },
        { func: 'Rename', icon: <FiEdit2 /> },
        { func: 'Delete chat', icon: <MdOutlineDelete />, color: 'text-red-500' }
    ]

    return (
        <span className="flex flex-col gap-1 py-2 px-3 absolute right-[-50px] bg-black z-50 rounded">
            {options.map((opt, index) => (
                <button key={index} className={`flex w-32 gap-1 items-center transition-border ease-in-out duration-200 border border-black rounded hover:bg-white/5 hover:border-white px-2 py-1 text-sm ${opt.color && opt.color}`}><span>{opt.icon}</span><span>{opt.func}</span></button>
            ))}
        </span>)
}

export default OptionComp
