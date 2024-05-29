'use client'
import { createContext, useState, useContext, useEffect } from 'react'
import { getResponse } from './(chatcomp)/fetchresponse'

const AppContext = createContext(null)

export const HandleApp = ({ children }) => {

    const [historyToggle, handleHisToggle] = useState(false)

    const [navExpandToggle, handleNavToggle] = useState(false)

    const [prompt, setPrompt] = useState('')

    const [isPromptSent, setPromptSent] = useState()

    const [isConvEdits, setConvEdits] = useState()

    const [newConvId, setNewConvId] = useState()

    const [convoArr, setConvoArr] = useState([])

    const [isDelActive, setDelActive] = useState(false)

    useEffect(() => {
        // Attempt to fetch the most recent conversation history from localStorage.
        const storedConvHistory = localStorage.getItem('convHistory');

        const convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];

        // Find the conversation that is marked as open and not yet closed.
        const openConv = convHistory.find(hist => hist.isOpen);

        if (!openConv) { handleNewConversation() }

        setConvoArr(openConv ? openConv.convoArr : []);

        setConvEdits(false);

    }, []);

    useEffect(() => {

        if (isDelActive && convoArr.length < 1) {
            handleNewConversation()
        }
        setDelActive(prev => prev = false)

    }, [isDelActive]);

    const handleConvo = () => {
        if (prompt.trim('\n') !== '') {
            handleSentPrompt(true);

            // Scroll to the bottom of the conversation area
            setConvEdits(false);

            // Create a new conversation entry
            const initConv = {
                prompt: prompt,
                response: '',
                convId: convoArr.length,
                date: new Date()
            };

            const newConvoArr = [...convoArr, initConv];

            // Prepare the request object for the server
            const request = { newChat: newConvoArr };

            // Fetch response for the given prompt
            getResponse(request)
                .then((response) => {

                    const updatedConvoArr = newConvoArr.map((chat, index) => {
                        if (chat.response === '') {
                            return { ...chat, response: response.content, convId: index, isEdit: false, isRename: false, isShare: false, isOption: false };
                        }
                        return chat;
                    });

                    handleSentPrompt(false);

                    setConvoArr(updatedConvoArr);

                    setPrompt('');

                    handleHistory(updatedConvoArr);
                })
                .catch((err) => {
                    console.error('Error fetching response:', err);
                    handleSentPrompt(false);
                });
        }
    };

    const handleSentPrompt = (res) => {
        // handle animation loading suspense
        setPromptSent(res)
    }

    const handleHistory = (convoArr) => {

        // Retrieve conversation history from local storage and parse it.
        const storedConvHistory = localStorage.getItem('convHistory');

        let convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];

        let isOpenConv = convHistory.find(conv => conv.isOpen);

        if (isOpenConv) {
            // Update the existing history record if found.
            convHistory = convHistory.map((conv) => conv.isOpen ? { ...conv, convoArr } : conv)

        } else {
            // Create new history record and add to the array.
            convHistory.push({
                date: new Date(),
                convoArr,
                historyId: newConvId,
                isOpen: true
            });

        }

        // Store the updated conversation history back into local storage.
        localStorage.setItem('convHistory', JSON.stringify(convHistory));
        localStorage.setItem('newConv', JSON.stringify(false))
    };

    const handleNewConversation = () => {
        // Clear current conversation array to start fresh.

        setConvoArr([]);

        const isNewConv = JSON.parse(localStorage.getItem('newConv'))

        // Fetch existing history ID or default to 0 if none exists.
        let newHistoryId = JSON.parse(localStorage.getItem('historyId')) || 0;

        newHistoryId = isNewConv ? newHistoryId : newHistoryId += 1

        setNewConvId(prev => prev = newHistoryId)

        handleHisToggle(false);
        handleNavToggle(false);

        localStorage.setItem('historyId', JSON.stringify(newHistoryId))

        const convHistory = JSON.parse(localStorage.getItem('convHistory'));

        if (!convHistory) {
            return;
        }

        const closeConv = convHistory.map(conv => ({ ...conv, isOpen: false }));

        localStorage.setItem('convHistory', JSON.stringify(closeConv));
        localStorage.setItem('newConv', JSON.stringify(true))

    };

    const handleDeleteConverSation = (convId) => {
        // HANDLE UPDATE DELETED CONVERSATION ON CONVO BOX
        let updateScreen = [...convoArr]

        updateScreen = updateScreen.filter(screen => screen.convId !== convId)

        setConvoArr(updateScreen)

        // update for new conversation if neccessary
        setDelActive(prev => prev = true)
    }

    const handleFetchHistory = (historyId) => {

        // Retrieve the conversation history from localStorage.
        const convHistory = JSON.parse(localStorage.getItem('convHistory'));

        // Find the specific history that matches the given historyId.
        const findHistory = convHistory.find(conv => conv.historyId == historyId);

        setConvoArr(findHistory.convoArr);

        handleNavToggle(false);

        setConvEdits(false);

        const newConvHistory = convHistory.map(conv => ({
            ...conv,
            isOpen: conv.historyId === historyId
        }));

        localStorage.setItem('convHistory', JSON.stringify(newConvHistory));

    };

    const handleConvChanges = (convId, prompt) => {
        // Create a new array with updated items where the specified conversation's prompt is updated.

        const updatedConvoArray = convoArr.map(conversation => {
            if (conversation.convId == convId) {
                return { ...conversation, prompt };
            }
            return conversation;
        });

        // Update the state with the new conversation array.
        setConvoArr(updatedConvoArray);
    };

    return (
        <AppContext.Provider
            value={{
                historyToggle, handleHisToggle, navExpandToggle, handleNavToggle,
                convoArr, handleConvo, handleHistory, handleNewConversation,
                handleDeleteConverSation, handleFetchHistory, handleConvChanges,
                setPrompt, setConvoArr, prompt, handleSentPrompt, isPromptSent, isConvEdits, setConvEdits
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppStore = () => useContext(AppContext)

