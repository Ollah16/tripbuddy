'use client'
import { createContext, useState, useContext, useEffect } from 'react'
import { getResponse } from './(chatcomp)/fetchresponse'

const AppContext = createContext(null)

export const HandleApp = ({ children }) => {

    // handle history toggle

    const [historyToggle, handleHisToggle] = useState(false)

    // handle nav toggle

    const [navExpandToggle, handleNavToggle] = useState(false)

    // handle new prompt

    const [prompt, setPrompt] = useState('')

    // check if any new prompt is sent to invoke loading animation

    const [isPromptSent, setPromptSent] = useState()

    // check for any edits on screen

    const [isConvEdits, setEdits] = useState()

    const [isOpenConv, setIsOpenConv] = useState({})

    const [isNewConv, setNewConv] = useState({})

    const [convoArr, setConvoArr] = useState([])

    const [isDelActive, setDelActive] = useState(false)

    //  * Loads the most recent open conversation from local storage when the component mounts.

    useEffect(() => {
        // Attempt to fetch the most recent conversation history from localStorage.
        const storedConvHistory = localStorage.getItem('convHistory');

        // Parse the stored conversation history, defaulting to an empty array if none exists.
        const convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];

        // Find the conversation that is marked as open and not yet closed.
        const openConv = convHistory.find(hist => hist.isOpen);

        // update open conversation state to handle history properly

        setIsOpenConv(prev => ({ ...prev, onLoadOpenConv: openConv ? true : false }))

        // update new conversation state which is dependent on open conversation

        if (!openConv) {
            handleNewConversation()
        }

        // Set the fetched conversation array to state, or an empty array if no open conversation exists.

        setConvoArr(openConv ? openConv.convoArr : []);

        // turnoff edit mode for scrollTo client height
        setEdits(false);

    }, []);

    useEffect(() => {

        if (isDelActive && convoArr.length < 1) {
            handleNewConversation()
        }
        setDelActive(prev => prev = false)

    }, [isDelActive]);

    const handleConvo = (e) => {
        // Process conversation if 'Enter' key is pressed or event is not provided, and prompt is not empty.
        if ((e?.key === 'Enter' || !e) && prompt) {
            // Indicate loading state
            handleSentPrompt(true);

            // Scroll to the bottom of the conversation area
            setEdits(false);

            // Create a new conversation entry
            const initConv = {
                prompt: prompt,
                response: '',
                convId: convoArr.length,
                date: new Date()
            };

            // Append the new conversation to the existing array
            const newConvoArr = [...convoArr, initConv];

            // Prepare the request object for the server
            const request = { newChat: newConvoArr };

            // Fetch response for the given prompt
            getResponse(request)
                .then((response) => {
                    // Map through conversations to update the response
                    const updatedConvoArr = newConvoArr.map((chat, index) => {
                        if (chat.response === '') {
                            return { ...chat, response: response.content, convId: index, isEdit: false, isRename: false, isShare: false, isOption: false };
                        }
                        return chat;
                    });

                    // Disable loading animation
                    handleSentPrompt(false);

                    // Update the conversation array in the state
                    setConvoArr(updatedConvoArr);

                    // Clear the prompt input field
                    setPrompt('');

                    // Update the history with the new conversation array
                    handleHistory(updatedConvoArr);
                })
                .catch((err) => {
                    console.error('Error fetching response:', err);

                    // disable loading animation

                    handleSentPrompt(false);
                });
        }
    };

    const handleSentPrompt = (res) => {
        // handle animation loading suspense
        setPromptSent(res)
    }

    const handleHistory = (convoArr) => {
        // Fetch existing history ID or default to 0 if none exists.
        // const historyId = JSON.parse(localStorage.getItem('historyId')) || 0;

        // Retrieve conversation history from local storage and parse it.
        const storedConvHistory = localStorage.getItem('convHistory');
        let convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];

        // Find existing history record.
        let findHistory = convHistory.find(conv => conv.historyId === isNewConv.historyId);


        if (findHistory) {
            // Update the existing history record if found.

            convHistory = convHistory.map((conv) => conv.historyId === isNewConv.historyId ? { ...conv, convoArr } : conv)

        } else {
            if (isNewConv.isConvNew && isNewConv.historyId) {
                // Create a new history record and add it to the array.
                convHistory.push({
                    date: new Date(),
                    convoArr,
                    historyId: isNewConv.historyId,
                    isOpen: true
                });

            } else if (isOpenConv.onLoadOpenConv && !isOpenConv.historyConv && !isOpenConv.historyId) {
                // Update open conversation effectively
                convHistory = convHistory.map(conv => conv.isOpen ? { ...conv, convoArr } : conv);
            } else if (isOpenConv.historyConv && isOpenConv.historyId) {
                // Update the specific conversation in history
                convHistory = convHistory.map(conv =>
                    conv.historyId === isOpenConv.historyId ? { ...conv, convoArr } : conv
                );
            }
        }

        // Store the updated conversation history back into local storage.
        localStorage.setItem('convHistory', JSON.stringify(convHistory));

    };

    const handleNewConversation = () => {
        // Clear current conversation array to start fresh.
        setConvoArr([]);

        // Fetch existing history ID or default to 0 if none exists.
        let newHistoryId = JSON.parse(localStorage.getItem('historyId')) || 0;
        newHistoryId++

        setNewConv(prev => ({ ...prev, isConvNew: true, historyId: newHistoryId }))

        // reset the dialogue and change it to false
        setIsOpenConv(prev => ({ ...prev, onLoadOpenConv: false, historyConv: false, historyId: null }))

        // Close the history and navigation tabs.
        handleHisToggle(false);
        handleNavToggle(false);

        // Increment the history ID to ensure a unique identifier for new conversations.
        localStorage.setItem('historyId', JSON.stringify(newHistoryId))

        // Attempt to fetch and process the conversation history from localStorage.
        const storedConvHistory = localStorage.getItem('convHistory');

        if (!storedConvHistory) {
            // Exit the function early if no history is stored.
            return;
        }

        // Parse the fetched history and mark all conversations as not open.
        const convHistory = JSON.parse(storedConvHistory);
        const closeConv = convHistory.map(conv => ({ ...conv, isOpen: false }));

        // Update the local storage with the new state of conversations.
        localStorage.setItem('convHistory', JSON.stringify(closeConv));

    };

    const handleDeleteConverSation = (convId) => {
        // HANDLE UPDATE DELETED CONVERSATION ON CONVO BOX
        let updateScreen = [...convoArr]

        // reset the dialogue and change it to false

        setIsOpenConv(prev => ({ ...prev, onLoadOpenConv: false, historyConv: false, historyId: null }))

        updateScreen = updateScreen.filter(screen => screen.convId !== convId)

        // UPDATE CONVERSATION ARRAY

        setConvoArr(updateScreen)

        // update for new conversation if neccessary

        setDelActive(prev => prev = true)
    }

    const handleFetchHistory = (historyId) => {

        // Retrieve the conversation history from localStorage.
        const storedConvHistory = localStorage.getItem('convHistory');
        const convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];

        // Find the specific history that matches the given historyId.
        const findHistory = convHistory.find(conv => conv.historyId == historyId);

        if (!findHistory) {
            console.error('No history found with the given ID:', historyId);
            return;
        }

        // Generating a history conversation, reset the new conversation validator

        setNewConv(prev => ({ ...prev, isConvNew: false, historyId: null }))

        // Update the conversation array in the state with the fetched history.
        setConvoArr(findHistory.convoArr);

        // Close navigation expansion.
        handleNavToggle(false);

        // handle no scroll with edits as true
        setEdits(false);

        // Mark the fetched history as open and update others as not open.
        const newConvHistory = convHistory.map(conv => ({
            ...conv,
            isOpen: conv.historyId === historyId
        }));

        // Update the local storage with the new state of the conversation histories.
        localStorage.setItem('convHistory', JSON.stringify(newConvHistory));

        // update type of conversation displayed
        setIsOpenConv(prev => ({ ...prev, onLoadOpenConv: false, historyConv: true, historyId }))

    };

    const handleUpdateScreen = (convId, prompt) => {
        // Create a new array with updated items where the specified conversation's prompt is updated.
        const updatedConvoArray = convoArr.map(conversation => {
            if (conversation.convId == convId) {
                return { ...conversation, prompt }; // Update the prompt of the matching conversation.
            }
            return conversation; // Return unmodified for non-matching conversations.
        });

        // Update the state with the new conversation array.
        setConvoArr(updatedConvoArray);
    };


    return (
        <AppContext.Provider
            value={{
                historyToggle, handleHisToggle, navExpandToggle, handleNavToggle,
                convoArr, handleConvo, handleHistory, handleNewConversation,
                handleDeleteConverSation, handleFetchHistory, handleUpdateScreen,
                setPrompt, setConvoArr, prompt, handleSentPrompt, isPromptSent, isConvEdits, setEdits
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppStore = () => useContext(AppContext)

