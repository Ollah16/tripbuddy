'use client'

import { NavBar } from "../(navbar)/navbar"
import IntroComp from "../(introcomp)/intro"
import ChatComp from "../(chatcomp)/chatcomp"
import HistoryExpanded from "../(historycomp)/historycomp"
import NavExpand from "../(navbar)/navexpand"
import { useAppStore } from "../appcontext"

const Main = () => {
    const { historyToggle } = useAppStore()

    return (<section>
        <NavBar />
        <div className={`${historyToggle ? 'md:left-[150px]' : 'left-0'} duration-200 ease-in-out transition-left relative`}>
            <IntroComp />
            <ChatComp />
        </div>
        <HistoryExpanded />
        <NavExpand />
    </section >)
}

export default Main