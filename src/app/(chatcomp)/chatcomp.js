import { useEffect } from "react"
import { useToggle } from "../toggleContext"
import ChatBoxComp from "./chatboxcomp"
import Functionalities from "./functionalitiescomp"
import SamplePrompts from "./samplepromptscomp"
import Conversations from "./conversations"
import FunFacts from "./funfacts"

const ChatComp = ({ convoArr, handleConvo, prompt, setPrompt, pauseScroll, handlePause }) => {

    const { historyToggle, handleHisToggle } = useToggle()

    useEffect(() => {

        window.addEventListener('resize', handleScreen)

        return () => window.removeEventListener('resize', handleScreen)
    }, [])

    const handleScreen = () => {
        if (window.innerWidth < 768) {
            handleHisToggle(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-between gap-10 overflow-y-auto chatcomp relative" >
            <Conversations convoArr={convoArr} />

            <div className={`transition-opacity duration-200 relative ease-in-out ${convoArr.length ? 'hidden' : 'flex'} gap-5 items-center w-11/12 md:w-8/12 mx-auto  
            ${historyToggle ? 'md:flex-col lg:flex-row px-5' : 'flex-col sm:flex-row md:flex-row'}`}>
                <SamplePrompts />
                <Functionalities />
                <FunFacts />
            </div>

            <ChatBoxComp
                handleConvo={handleConvo}
                prompt={prompt}
                setPrompt={setPrompt} />

        </div>
    )
}

export default ChatComp
