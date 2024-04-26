import Image from "next/image"
import { useToggle } from "../toggleContext"
import styles from './chat.module.css'

const Functionalities = () => {

    const functionalities = [
        {
            title: 'Conversation',
            description: 'Engage users in natural language dialogues.'
        },
        {
            title: 'Information',
            description: ' Provide answers to questions and facts on various topics.'
        },
        {
            title: 'Games',
            description: 'Offer interactive quizzes and games for entertainment.'
        },
        {
            title: 'Storytelling',
            description: ' Narrate stories or adventures to captivate users.'
        },
        {
            title: ' Navigation',
            description: ' Assist users with directions and travel tips.'
        }
    ]

    const { historyToggle } = useToggle()

    return (
        <ul className={`relative overflow-hidden before:inline-block before:h-1 ${styles.functionality_gradient} before:content-[''] before:bg-[#3498dbde] flex flex-col ${historyToggle ? 'md:w-auto lg:w-[33.3%]' : 'lg:w-[33.3%] md:w-auto'} text-[#36454F] pb-2`}>
            <li className="mx-auto font-bold md:text-lg text-md py-2">Functionalities</li>
            {functionalities.map((func, index) => (
                <li key={index} className="px-5 my-1 md:text-sm text-md text-wrap text-start font-bold"><b>{func.title}</b>: {func.description}</li>
            ))}
            <Image width={500} height={500} src={'/functionality.webp'} className="absolute opacity-20" />
        </ul>
    )
}

export default Functionalities
