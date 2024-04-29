import Image from "next/image"
import styles from './chat.module.css'
import { useAppStore } from "../appcontext"

const XteristicsComp = ({ title, value }) => {

    const { historyToggle } = useAppStore()

    return (
        <ul className={`relative before:inline-block before:h-1 h-max ${styles.functionality_gradient} before:content-[''] before:bg-[#3498dbde] flex flex-col ${historyToggle ? 'md:w-auto lg:w-[33.3%]' : 'lg:w-[33.3%] md:w-auto'} text-[#36454F] pb-2`}>
            <li className="mx-auto font-bold md:text-lg text-md py-2">{title.charAt(0).toUpperCase() + title.slice(1)}</li>
            {value.map((func, index) => (

                func.title ?
                    <li key={index} className={`px-2 my-1 lg:text-sm text-xs text-wrap text-start`}>
                        <span><b>{func.title}</b></span>: <span>{func.description}</span>
                    </li>
                    :
                    <li className="px-3 my-1 lg:text-sm text-xs text-black" key={index}>{func}</li>


            ))}
        </ul >
    )
}

export default XteristicsComp
