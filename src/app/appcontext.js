'use client'
import { createContext, useState, useContext, useEffect } from 'react'
import { getResponse } from './(chatcomp)/fetchresponse'

const AppContext = createContext(null)

export const HandleApp = ({ children }) => {
    const [historyToggle, handleHisToggle] = useState(false)
    const [navExpandToggle, hanleNavToggle] = useState(false)
    const [prompt, setPrompt] = useState('')
    const [isPromptSent, setPromptSent] = useState()
    const [checkEdits, setEdits] = useState()

    const now = new Date();

    const [convoArr, setConvoArr] = useState([])

    useEffect(() => {
        handleIncHistory()
    }, [])

    useEffect(() => {
        const getMostRecentConv = localStorage.getItem('convHistory')
        const convHistory = getMostRecentConv ? JSON.parse(getMostRecentConv) : []
        setConvoArr(convHistory[convHistory.length - 1].convoArr)
        setEdits(true)
    }, [])

    const handleConvo = (e) => {

        if ((e?.key === 'Enter' || !e) && prompt) {
            handleSentPrompt(true)
            setEdits(true)
            const initConv = {
                prompt,
                response: '',
                convId: convoArr.length,
                date: new Date()
            };

            const newConvoArr = [...convoArr, initConv]

            const request = { newChat: newConvoArr }

            getResponse(request)
                .then((response) => {
                    const updatedConvoArr = newConvoArr.map((chat, index) => {
                        if (chat.response === '') {
                            return { ...chat, response: response.content, convId: index, isEdit: false, isRename: false, isShare: false, isOption: false };
                        } return chat
                    });
                    handleSentPrompt(false)
                    setConvoArr(updatedConvoArr);
                    setPrompt('');
                    handleHistory(updatedConvoArr);
                })
                .catch((err) => {
                    console.error('Error fetching response:', err);
                });
        }
    };

    const handleSentPrompt = (res) => {
        setPromptSent(res)
    }

    const handleHistory = (convoArr) => {

        let historyId = localStorage.getItem('historyId') || 0
        const storedConvHistory = localStorage.getItem('convHistory');
        const convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];
        const findHistory = convHistory.find(conv => conv.historyId == historyId)

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
        hanleNavToggle(false)
        handleIncHistory()
    };

    const handleIncHistory = () => {
        let historyId = localStorage.getItem('historyId')
        historyId++
        localStorage.setItem('historyId', historyId)
    }

    const handleDeleteConverSation = (convId) => {
        let updateScreen = [...convoArr]
        updateScreen = updateScreen.filter(screen => screen.convId !== convId)
        setConvoArr(updateScreen)
    }

    const handleFetchHistory = (historyId) => {
        const storedConvHistory = localStorage.getItem('convHistory');
        const convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];
        const findHistory = convHistory.find(conv => conv.historyId === historyId)
        setConvoArr(findHistory.convoArr)
        hanleNavToggle(false)
        setEdits(true)
    }

    const handleUpdateScreen = (convId, prompt) => {
        let updateScreen = [...convoArr]
        updateScreen = updateScreen.map(each => {
            if (convId == each.convId) {
                return {
                    ...each,
                    prompt
                }
            } return each
        })
        setConvoArr(updateScreen)
    }


    return (
        <AppContext.Provider
            value={{
                historyToggle, handleHisToggle, navExpandToggle, hanleNavToggle,
                convoArr, handleConvo, handleHistory, handleNewConversation,
                handleDeleteConverSation, handleFetchHistory, handleUpdateScreen,
                setPrompt, setConvoArr, prompt, handleSentPrompt, isPromptSent, checkEdits, setEdits
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppStore = () => useContext(AppContext)

