'use client'

import { NavBar } from "../(navbar)/navbar"
import IntroComp from "../(introcomp)/intro"
import ChatComp from "../(chatcomp)/chatcomp"
import HistoryExpanded from "../(historycomp)/history"
import { useToggle } from "../toggleContext"
import NavExpand from "../(navbar)/navexpand"
import { useState } from "react"
import { getResponse } from "../(chatcomp)/fetchresponse"

const Main = () => {
    const { historyToggle, handleHisToggle } = useToggle()

    const [convoArr, setConvoArr] = useState([])
    const [prompt, setPrompt] = useState('')
    const now = new Date();

    const handleConvo = (e) => {

        if ((e?.key === 'Enter' || !e) && prompt) {

            const initConv = {
                prompt,
                response: '',
                convId: convoArr.length,
                date: new Date()
            };

            const newConvoArr = [...convoArr, initConv]

            const content = `Remember, each response should be gentle and tailored as if you're chatting with a child on an adventure. Your role is to be their friendly AI travel companion, so begin each interaction with a comforting tone.
            \n ${prompt}`;

            getResponse(content)
                .then((response) => {
                    const updatedConvoArr = newConvoArr.map((chat, index) => {
                        const substrings = response.content.split(/\d+/);
                        const updatedResponse = substrings.join('\n');
                        return { ...chat, response: updatedResponse, convId: index, isRename: false, isShare: false, isOption: false };
                    });

                    setConvoArr(updatedConvoArr);
                    setPrompt('');
                    handleHistory(updatedConvoArr);
                })
                .catch((err) => {
                    console.error('Error fetching response:', err);
                });
        }
    };


    const handleHistory = (convoArr) => {

        let historyId = localStorage.getItem('historyId') || 0
        const storedConvHistory = localStorage.getItem('convHistory');
        const convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];
        const findHistory = convHistory.find(conv => conv.historyId === historyId)

        if (findHistory) {
            findHistory.convoArr = convoArr
        }
        else {
            const newHistory = {
                date: now,
                convoArr,
                historyId
            }
            convHistory.push(newHistory)
        }

        localStorage.setItem('convHistory', JSON.stringify(convHistory));

    }

    const handleNewConversation = () => {
        setConvoArr([])
        handleHisToggle(false)
        if (!localStorage.getItem('convHistory')) return
        let historyId = localStorage.getItem('historyId')
        historyId++
        localStorage.setItem('historyId', historyId)
    };

    const handleDeleteConverSation = (convId) => {
        let updateScreen = [...convoArr]
        updateScreen = updateScreen.filter(screen => screen.convId !== convId)
        setConvoArr(updateScreen)
    }

    return (<section>
        <NavBar />
        <div className={`${historyToggle ? 'md:left-[150px]' : 'left-0'} duration-200 ease-in-out transition-left relative`}>
            <IntroComp />
            <ChatComp convoArr={convoArr} handleConvo={handleConvo} prompt={prompt} setPrompt={setPrompt} />
        </div>
        <HistoryExpanded handleNewConversation={handleNewConversation} convoArr={convoArr} handleDeleteConverSation={handleDeleteConverSation} />
        <NavExpand />
    </section >)
}

export default Main
