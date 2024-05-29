import { useEffect, useState } from "react"
import ChatBoxComp from "./chatboxcomp"
import Conversations from "./conversations"
import XteristicsComp from "./xteristics"
import { useAppStore } from "../appcontext"
import styles from './chat.module.css'

const ChatComp = () => {


    const { historyToggle, handleHisToggle, convoArr } = useAppStore()

    // characteristics of the ai journey buddy 

    const xteristics = {

        'sample prompts': [
            "What's on your mind today? I'm here to help! 🤔",
            "Tell me about your journey. I'm listening! 🛤️",
            "Need some company on your journey? Just say hi! 👋",
            "Feeling bored? Let's chat and pass the time together! 💬",
            `Ready for adventure? Let's explore together! 🚀`],

        'functionalities': [
            {
                title: 'Conversation',
                description: 'Engage users in natural language dialogues. 💬'
            },
            {
                title: 'Information',
                description: 'Provide answers to questions and facts on various topics. 📚'
            },
            {
                title: 'Games',
                description: 'Offer interactive quizzes and games for entertainment.🎮'
            },
            {
                title: 'Storytelling',
                description: ' Narrate stories or adventures to captivate users.📖'
            },
            {
                title: ' Navigation',
                description: ' Assist users with directions and travel tips.🧭'
            }
        ],

        'fun facts': [
            'The Great Wall of China could circle the Earth eight times! 🗣️',
            `The Eiffel Tower was supposed to be temporary! 🧠`,
            `Australia's Great Barrier Reef is visible from space! 🎲`,
            `The Amazon Rainforest is called "The Lungs of the Earth! 📚🔥`,
            `Penguins can dive 1,850 feet underwater!🧭`],

    }

    useEffect(() => {
        // monitor with event listener

        const handleScreen = () => {
            // close history tab when screen is below medium

            if (window.innerWidth < 768) {
                handleHisToggle(false)
            }
        }

        window.addEventListener('resize', handleScreen)

        return () => window.removeEventListener('resize', handleScreen)
    }, [])

    return (
        <div className="flex flex-col items-center gap-10 chatcomp relative" >
            <Conversations convoArr={convoArr} />

            <div className={`transition-opacity duration-200 py-5 relative overflow-y-auto ease-in-out ${styles.conversation_box} ${convoArr.length ? 'hidden' : 'flex'} gap-5 items-center w-11/12 md:w-8/12 mx-auto  
            ${historyToggle ? 'md:flex-col lg:flex-row px-5' : 'flex-col sm:flex-row md:flex-row'}`}>

                {Object.entries(xteristics).map(([key, value]) => {
                    return <XteristicsComp title={key} key={key} value={value} />;
                })}
            </div>

            <ChatBoxComp />

        </div>
    )
}

export default ChatComp
