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

    const [isOpenConv, setIsOpenConv] = useState(false)

    const [isHistoryConv, setHistoryConv] = useState(false)
    // conversation array

    const [convoArr, setConvoArr] = useState([])

    useEffect(() => {
        // increase history ID in localstorage
        handleIncHistory()
    }, [])

    //  * Loads the most recent open conversation from local storage when the component mounts.

    useEffect(() => {
        try {
            // Attempt to fetch the most recent conversation history from localStorage.
            const storedConvHistory = localStorage.getItem('convHistory');

            // Parse the stored conversation history, defaulting to an empty array if none exists.
            const convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];

            // Find the conversation that is marked as open and not yet closed.
            const openConv = convHistory.find(hist => hist.isOpen);

            // update open conversation state to handle history properly

            setIsOpenConv(prev => prev = openConv)

            // Set the fetched conversation array to state, or an empty array if no open conversation exists.

            setConvoArr(openConv ? openConv.convoArr : []);

            // turnoff edit mode for scrollTo client height
            setEdits(false);

        } catch (error) {
            // Log any errors that occur during the fetch or parse process.
            console.error('Failed to load conversation history:', error);
        }
    }, []);

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
        const historyId = localStorage.getItem('historyId') || 0;

        // Retrieve conversation history from local storage and parse it.
        const storedConvHistory = localStorage.getItem('convHistory');
        let convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];

        // Find existing history record.
        let findHistory = convHistory.find(conv => conv.historyId == historyId);

        if (findHistory) {
            // Update the existing history record if found.
            findHistory.convoArr = convoArr;

        } else if (isOpenConv) {
            // Update open conversation effectively
            convHistory = convHistory.map(conv => {
                if (conv.isOpen) {
                    return { ...conv, convoArr };
                }
                return conv;
            });

        } else if (isHistoryConv.isHistory && isHistoryConv.historyId) {
            // If flagged as part of history, update the specific conversation array.
            convHistory = convHistory.map(conv => {
                if (conv.historyId == isHistoryConv.historyId) {
                    return { ...conv, convoArr };
                }
                return conv;
            });

        } else {
            // Create a new history record and add it to the array.
            const newHistory = {
                date: new Date(),
                convoArr,
                historyId,
                isOpen: true
            };

            convHistory.push(newHistory);
        }

        // Store the updated conversation history back into local storage.

        localStorage.setItem('convHistory', JSON.stringify(convHistory));

    };

    const handleNewConversation = () => {
        // Clear current conversation array to start fresh.
        setConvoArr([]);

        // reset the dialogue and change it to false
        setIsOpenConv(prev => prev = false)

        // Reset any selected history conversation state.
        setHistoryConv(false);

        // Close the history and navigation tabs.
        handleHisToggle(false);
        handleNavToggle(false);

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

        // Increment the history ID to ensure a unique identifier for new conversations.
        handleIncHistory();

    };

    const handleIncHistory = () => {
        // handle increase history ID

        let historyId = localStorage.getItem('historyId')
        historyId++
        localStorage.setItem('historyId', historyId)
    }

    const handleDeleteConverSation = (convId) => {
        // HANDLE UPDATE DELETED CONVERSATION ON CONVO BOX
        let updateScreen = [...convoArr]

        // reset the dialogue and change it to false
        setIsOpenConv(prev => prev = false)

        updateScreen = updateScreen.filter(screen => screen.convId !== convId)

        // UPDATE CONVERSATION ARRAY

        setConvoArr(updateScreen)
    }

    const handleFetchHistory = (historyId) => {

        // Retrieve the conversation history from localStorage.
        const storedConvHistory = localStorage.getItem('convHistory');
        const convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];

        // reset the dialogue and change it to false
        setIsOpenConv(prev => prev = false)

        // Increment the ID if there is an existing conversation before fetching history
        handleIncHistory();

        // Find the specific history that matches the given historyId.
        const findHistory = convHistory.find(conv => conv.historyId == historyId);

        if (!findHistory) {
            console.error('No history found with the given ID:', historyId);
            return;
        }

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

        // Update state to reflect the current active history.
        setHistoryConv({ isHistory: true, historyId });

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

