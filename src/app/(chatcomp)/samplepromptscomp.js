import Image from "next/image"
import { useToggle } from "../toggleContext"
import styles from './chat.module.css'

const SamplePrompts = () => {
    const samplePrompts = [
        "What's on your mind today? I'm here to help!",
        "Tell me about your journey. I'm listening!",
        "Need some company on your journey? Just say hi!",
        "Feeling bored? Let's chat and pass the time together!",
        `Ready for adventure? Let's explore together!`]

    const { historyToggle } = useToggle()

    return (
        <ul className={`relative overflow-hidden before:inline-block ${styles.sample_gradient} text-[#002D62] font-bold before:h-1 before:content-[''] before:bg-[#3498dbde] flex flex-col ${historyToggle ? 'md:w-auto lg:w-[33.3%]' : 'lg:w-[33.3%] md:w-auto'}  pb-2 h-max`}>
            <li className="mx-auto font-bold md:text-lg text-md py-2">Sample Prompts</li>
            {samplePrompts.map((prompt, index) => (
                <li key={index} className="px-5 my-1 md:text-sm text-xs">{prompt}</li>
            ))}

            <Image width={500} height={500} src={'/sampleprompts.webp'} className="absolute z-10 opacity-20" />

        </ul>
    )
}

export default SamplePrompts
