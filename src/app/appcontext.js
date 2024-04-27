'use client'
import { createContext, useState, useContext, useEffect } from 'react'
import { getResponse } from './(chatcomp)/fetchresponse'

const AppContext = createContext(null)

export const HandleApp = ({ children }) => {
    const [historyToggle, handleHisToggle] = useState(false)
    const [navExpandToggle, hanleNavToggle] = useState(false)
    const [prompt, setPrompt] = useState('')

    const now = new Date();

    const [convoArr, setConvoArr] = useState([])

    useEffect(() => {
        handleIncHistory()
    }, [])


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
        const findHistory = convHistory.find(conv => conv.historyId == historyId)

        if (findHistory) {
            findHistory.convoArr = convoArr
            console.log('preent')

        }
        else {
            console.log('not')

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
                prompt, setPrompt
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppStore = () => useContext(AppContext)

