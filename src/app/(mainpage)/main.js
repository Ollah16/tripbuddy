'use client'

import { NavBar } from "../(navbar)/navbar"
import IntroComp from "../(introcomp)/intro"
import ChatComp from "../(chatcomp)/chatcomp"
import HistoryExpanded from "../(historycomp)/historycomp"
import NavExpand from "../(navbar)/navexpand"
import styles from './main.module.css'
import HistoryToggle from "../(historycomp)/historytog"
import { useConvContext } from "../context/convoContext"

const Main = () => {
    const { historyToggle } = useConvContext()




    return (<section className="relative">
        <NavBar />
        <div className={`${styles.conversation_wrapper} ${historyToggle ? 'md:left-[150px]' : 'left-0'} duration-200 ease-in-out transition-left relative`}>
            <IntroComp />
            <ChatComp />
        </div>
        <HistoryToggle />
        <HistoryExpanded />
        <NavExpand />

    </section >)
}

export default Main
