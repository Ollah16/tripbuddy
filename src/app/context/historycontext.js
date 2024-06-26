'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { getResponse } from "../(chatcomp)/fetchresponse";
import { useConvContext } from "./convoContext";

const HistoryStore = createContext()


export const HistoryContext = ({ children }) => {

    const { handleDeleteConverSation, handleConvChanges, convoArr, setConvoArr, handleSentPrompt, setConvEdits } = useConvContext()

    const [isHistoryUpDate, setHistoryUpdate] = useState(false)

    const [newPrompt, setEditPrompt] = useState('')

    useEffect(() => {

        const initializeConversationHistory = () => {
            try {
                // Retrieve the conversation history from localStorage.
                const convHistory = JSON.parse(localStorage.getItem('convHistory')) || [];

                // Reset amend-related properties for all conversations.
                const updatedHistory = convHistory?.map(hist => {
                    return {
                        ...hist,
                        convoArr: hist.convoArr.map(conv => ({
                            ...conv,
                            isRename: false,
                            isOption: false,
                            isEdit: false
                        }))
                    }
                });

                localStorage.setItem('convHistory', JSON.stringify(updatedHistory));

            } catch (error) {
                console.error('Error initializing conversation history:', error);
            }
        };

        initializeConversationHistory();
    }, []);


    const handleDelete = (convId, historyId) => {
        // Fetch the stored conversation history from localStorage.

        const convHistory = JSON.parse(localStorage.getItem('convHistory'));

        const updatedHistory = convHistory.filter(conversation => conversation.historyId != historyId)

        localStorage.setItem('convHistory', JSON.stringify(updatedHistory));

        setHistoryUpdate(prev => !prev);

        // Additional UI handling for deleted conversation.
        handleDeleteConverSation(convId);
    };

    const handleClickRename = (convId, historyId) => {
        // Retrieve the conversation history from localStorage.
        const convHistory = JSON.parse(localStorage.getItem('convHistory'));

        const updatedHistory = convHistory.map(hist => ({
            ...hist,
            convoArr: hist.convoArr.map(conv => ({
                ...conv,
                isRename: hist.historyId == historyId && conv.convId == convId ? !conv.isRename : conv.isRename
            }))
        }));

        localStorage.setItem('convHistory', JSON.stringify(updatedHistory));

        setHistoryUpdate(prev => !prev);

    };

    const handleSubmitRename = (convId, historyId, prompt) => {
        // Retrieve the conversation history from localStorage.

        const convHistory = JSON.parse(localStorage.getItem('convHistory'));

        const updatedHistory = convHistory.map(hist => ({
            ...hist,
            convoArr: hist.historyId == historyId ?
                hist.convoArr.map(conv =>
                    conv.convId == convId ? { ...conv, prompt, isRename: false } : conv
                ) : hist.convoArr
        }));

        localStorage.setItem('convHistory', JSON.stringify(updatedHistory));

        setHistoryUpdate(prev => !prev);

        // Call to update the UI with the new prompt.
        handleConvChanges(convId, prompt);

    };

    const handleInputChange = (e) => {

        e.preventDefault();

        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {

            const inputElement = e.target;
            const inputValue = inputElement.value.trim();

            const [convId, historyId] = inputElement.id.split('-');
            if (!convId || !historyId) {
                console.error('Input ID is malformed or does not contain valid identifiers.');
                return;
            }

            // Call the function to handle the rename submission, passing the parsed IDs and user input.
            handleSubmitRename(convId, historyId, inputValue);
        }
    };

    const handleMore = (convId, historyId) => {
        // Retrieve the conversation history from localStorage.
        const convHistory = JSON.parse(localStorage.getItem('convHistory'));

        const updatedHistory = convHistory.map(hist => ({
            ...hist,
            convoArr: hist.convoArr.map(conv => ({
                ...conv,
                isOption: hist.historyId == historyId && conv.convId == convId
            }))
        }));

        localStorage.setItem('convHistory', JSON.stringify(updatedHistory));

        setHistoryUpdate(prev => !prev);

    };

    const handleOptionEvents = (functionType, convId, historyId) => {

        // Handle actions based on the functionType specified.

        switch (functionType) {
            case 'Rename':
                handleClickRename(convId, historyId);
                break;
            case 'Delete chat':
                handleDelete(convId, historyId);
                break;
        }
    };

    const handleInputMouseLeave = () => {
        // Retrieve conversation history from localStorage.
        const convHistory = JSON.parse(localStorage.getItem('convHistory'));

        const parsedHistory = convHistory.map(hist => ({
            ...hist,
            convoArr: hist.convoArr.map(conv => ({
                ...conv,
                isRename: false
            }))
        }));

        localStorage.setItem('convHistory', JSON.stringify(parsedHistory));

        // Trigger a state update to reflect changes in the UI.
        setHistoryUpdate(prev => !prev);

    };

    const handleAmends = ({ amendType, convId }) => {
        // Clone the conversation array for immutability.
        let updatedConvoArr = [...convoArr];

        // Fetch and parse the conversation history from localStorage.
        let convHistory = JSON.parse(localStorage.getItem('convHistory'));

        let newResponse;

        switch (amendType) {
            case 'edit':
                setConvEdits(true);
                updatedConvoArr = updatedConvoArr.map(chat =>
                ({
                    ...chat,
                    isEdit: convId === chat.convId
                }));

                break;

            case 'save':
                if (!newPrompt) return;
                handleSentPrompt(true);

                const extractConv = updatedConvoArr.filter((conv) => (conv.convId <= convId)).map(conv => (conv.convId === convId ? { ...conv, prompt: newPrompt, response: '' } : conv))

                const request = extractConv;

                getResponse(request)
                    .then(response => {
                        newResponse = response.content;
                        updatedConvoArr = updatedConvoArr.map(chat =>
                            convId === chat.convId && chat.isEdit
                                ? { ...chat, prompt: newPrompt, response: newResponse, isEdit: false }
                                : chat
                        );
                        setEditPrompt('')
                        setConvoArr(updatedConvoArr);
                        updateLocalHistory();
                        handleSentPrompt(false)
                    })
                    .catch(err => {
                        console.error('Error fetching response:', err);
                        handleSentPrompt(false);
                    });
                break;

            case 'cancel':
                updatedConvoArr = updatedConvoArr.map(chat =>
                    convId === chat.convId
                        ? { ...chat, isEdit: false }
                        : chat
                );
                setConvEdits(true);
                break;

            default:
                console.error('Invalid amendment type specified');
        }

        setConvoArr(updatedConvoArr);

        // Function to update local history.
        const updateLocalHistory = () => {
            convHistory = convHistory.map(hist =>
            (hist.isOpen ? {
                ...hist,
                convoArr: updatedConvoArr
            } : hist));

            localStorage.setItem('convHistory', JSON.stringify(convHistory));
            setHistoryUpdate(prev => !prev);
        };
    };

    return (
        <HistoryStore.Provider
            value={{
                setEditPrompt, handleAmends, handleDelete, handleInputMouseLeave,
                handleClickRename, handleSubmitRename, handleInputChange, handleMore,
                handleOptionEvents, isHistoryUpDate, setHistoryUpdate
            }}>
            {children}
        </HistoryStore.Provider>
    )

}

export const useHistoryFeed = () => useContext(HistoryStore)
