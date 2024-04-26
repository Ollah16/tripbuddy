import Image from "next/image"
import { useToggle } from "../toggleContext"
// import funfacts from '/funfacts.webp'

const FunFacts = () => {

    const facts = [
        'The Great Wall of China could circle the Earth eight times!',
        `The Eiffel Tower was supposed to be temporary!`,
        `Australia's Great Barrier Reef is visible from space!`,
        `The Amazon Rainforest is called "The Lungs of the Earth"!`,
        `Penguins can dive 1,850 feet underwater!`]

    const { historyToggle } = useToggle()


    return (
        <ul className={`relative overflow-hidden before:inline-block before:h-1 before:content-[''] before:bg-[#3498dbde] flex flex-col ${historyToggle ? 'md:w-auto lg:w-[33.3%]' : 'lg:w-[33.3%] md:w-auto'} bg-gray-200 pb-2 h-max`}>
            <li className="mx-auto font-bold md:text-lg text-md text-[#3498db] py-2">Fun facts</li>

            {facts.map((fact, index) => (
                <li className="px-5 my-1 md:text-sm text-xs text-black" key={index}>{fact}</li>
            ))}
            <Image width={500} height={500} src={'/funfacts.webp'} className="absolute z-10 opacity-30" />
        </ul>
    )
}

export default FunFacts
