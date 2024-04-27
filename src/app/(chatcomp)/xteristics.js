import Image from "next/image"
import styles from './chat.module.css'
import { useAppStore } from "../appcontext"

const XteristicsComp = ({ title, value }) => {

    const { historyToggle } = useAppStore()

    return (
        <ul className={`relative overflow-hidden before:inline-block before:h-1 h-auto ${styles.functionality_gradient} before:content-[''] before:bg-[#3498dbde] flex flex-col ${historyToggle ? 'md:w-auto lg:w-[33.3%]' : 'lg:w-[33.3%] md:w-auto'} text-[#36454F] pb-2`}>
            <li className="mx-auto font-bold md:text-lg text-md py-2">{title.charAt(0).toUpperCase() + title.slice(1)}</li>
            {value.map((func, index) => (


                func.title ?
                    <li key={index} className={`px-5 my-1 lg:text-sm  text-xs text-wrap text-start font-bold`}>
                        <span> <b>{func.title}</b>: {func.description}</span>
                    </li>
                    :
                    <li className="px-5 my-1 lg:text-sm text-xs text-black" key={index}>{func}</li>


            ))}
        </ul >
    )
}

export default XteristicsComp
