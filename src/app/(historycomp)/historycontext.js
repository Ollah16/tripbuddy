'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useAppStore } from "../appcontext";
import { getResponse } from "../(chatcomp)/fetchresponse";

const HistoryStore = createContext()


export const HistoryContext = ({ children }) => {

    const { handleDeleteConverSation, handleUpdateScreen, convoArr, setConvoArr, handleSentPrompt, setEdits } = useAppStore()

    // monitor any changes in history

    const [isHistoryUpDate, setUpdate] = useState(false)

    // set new prompt

    const [newPrompt, setEditPrompt] = useState('')

    useEffect(() => {
        const initializeConversationHistory = () => {
            try {
                // Retrieve the conversation history from localStorage.
                const storedHistory = localStorage.getItem('convHistory');
                if (!storedHistory) {
                    throw new Error('No conversation history found in localStorage.');
                }

                // Parse the stored history and validate its format.
                const historyArr = JSON.parse(storedHistory);
                if (!Array.isArray(historyArr)) {
                    throw new Error('Stored conversation history is not in the expected array format.');
                }

                // Reset amend-related properties for all conversations.
                const updatedHistory = historyArr.map(hist => ({
                    ...hist,
                    convoArr: hist.convoArr.map(conv => ({
                        ...conv,
                        isRename: false,
                        isOption: false,
                        isEdit: false
                    }))
                }));

                // Persist the updated history to localStorage.
                localStorage.setItem('convHistory', JSON.stringify(updatedHistory));
            } catch (error) {
                // Log the error to the console.
                console.error('Error initializing conversation history:', error);
            }
        };

        // Execute the initialization function.
        initializeConversationHistory();
    }, []);

    const handleDelete = (convId, historyId) => {
        // Fetch the stored conversation history from localStorage.
        const storedHistory = localStorage.getItem('convHistory');
        if (!storedHistory) {
            console.error('No conversation history found in localStorage.');
        }

        // Parse the stored history and validate its format.
        const historyArr = JSON.parse(storedHistory);
        if (!Array.isArray(historyArr)) {
            console.error('Stored conversation history is not in the expected array format.');
        }

        // Update the history by removing the specified conversation and filtering out any empty conversation arrays.
        const updatedHistory = historyArr.filter(conversation => conversation.historyId != historyId)

        // Persist the updated history to localStorage.
        localStorage.setItem('convHistory', JSON.stringify(updatedHistory));

        // Signal an update to trigger UI changes.
        setUpdate(prev => !prev);

        // Additional UI handling for deleted conversation.
        handleDeleteConverSation(convId);
    };

    const handleClickRename = (convId, historyId) => {
        // Retrieve the conversation history from localStorage.
        const storedHistory = localStorage.getItem('convHistory');
        if (!storedHistory) {
            console.error('No conversation history found in localStorage.');
        }

        // Parse the stored history and ensure it is in the correct format.
        const historyArr = JSON.parse(storedHistory);
        if (!Array.isArray(historyArr)) {
            console.error('Stored conversation history is not in the expected array format.');
        }

        // Update the conversation array to toggle the isRename flag for the specified conversation.
        const updatedHistory = historyArr.map(hist => ({
            ...hist,
            convoArr: hist.convoArr.map(conv => ({
                ...conv,
                isRename: hist.historyId == historyId && conv.convId == convId ? !conv.isRename : conv.isRename
            }))
        }));

        // Persist the updated history back to local storage.
        localStorage.setItem('convHistory', JSON.stringify(updatedHistory));

        // Trigger a state update to reflect changes.
        setUpdate(prev => !prev);

    };
    const handleSubmitRename = (convId, historyId, prompt) => {
        // Retrieve the conversation history from localStorage.
        const storedHistory = localStorage.getItem('convHistory');
        if (!storedHistory) {
            return console.error('No conversation history found in localStorage.');
        }

        // Parse the stored history and ensure it is in the correct format.
        const historyArr = JSON.parse(storedHistory);
        if (!Array.isArray(historyArr)) {
            return console.error('Stored conversation history is not in the expected array format.');
        }
        // Update the conversation array with the new prompt for the specified conversation.
        const updatedHistory = historyArr.map(hist => ({
            ...hist,
            convoArr: hist.historyId === historyId ?
                hist.convoArr.map(conv =>
                    conv.convId == convId ? { ...conv, prompt, isRename: false } : conv
                ) : hist.convoArr
        }));

        // Persist the updated history back to local storage.
        localStorage.setItem('convHistory', JSON.stringify(updatedHistory));

        // Trigger a state update to reflect changes.
        setUpdate(prev => !prev);

        // Call to update the UI with the new prompt.
        handleUpdateScreen(convId, prompt);

    };

    const handleInputChange = (e) => {
        e.preventDefault();  // Prevent the default action to avoid any form submission or additional side effects.

        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            // Ensure the action is processed only if 'Enter' is pressed while focused on an input element.
            const inputElement = e.target;
            const inputValue = inputElement.value.trim();  // Trim the input to remove any leading/trailing whitespace.

            const [convId, historyId] = inputElement.id.split('-');
            if (!convId || !historyId) {
                console.error('Input ID is malformed or does not contain valid identifiers.');
                return;  // exit if IDs are not correctly formatted or missing.
            }

            // Call the function to handle the rename submission, passing the parsed IDs and user input.
            handleSubmitRename(convId, historyId, inputValue);
        }
    };

    const handleMore = (convId, historyId) => {
        // Retrieve the conversation history from localStorage.
        const storedHistory = localStorage.getItem('convHistory');
        if (!storedHistory) {
            throw new Error('No conversation history found in localStorage.');
        }

        // Parse the stored history and check for format correctness.
        const historyArr = JSON.parse(storedHistory);
        if (!Array.isArray(historyArr)) {
            throw new Error('Stored conversation history is not in the expected array format.');
        }

        // Update isOption property for the specific conversation in the history.
        const updatedHistory = historyArr.map(hist => ({
            ...hist,
            convoArr: hist.convoArr.map(conv => ({
                ...conv,
                isOption: hist.historyId === historyId && conv.convId === convId
            }))
        }));

        // Persist the updated history back to localStorage.
        localStorage.setItem('convHistory', JSON.stringify(updatedHistory));

        // Trigger a state update to reflect changes.
        setUpdate(prev => !prev);

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
        const storedHistory = localStorage.getItem('convHistory');

        if (!storedHistory) {
            console.warn('No conversation history found in local storage.');
            return; // Exit function if no history is found.
        }

        // Parse the stored history and ensure all conversations are not in rename state.
        const parsedHistory = JSON.parse(storedHistory).map(hist => ({
            ...hist,
            convoArr: hist.convoArr.map(conv => ({
                ...conv,
                isRename: false  // Ensuring all items are set to not being renamed.
            }))
        }));

        // Persist the updated history back to local storage.
        localStorage.setItem('convHistory', JSON.stringify(parsedHistory));

        // Trigger a state update to reflect changes in the UI.
        setUpdate(prev => !prev);

    };

    const handleAmends = ({ amendType, convId, prevPrompt, chatResponse }) => {
        // Clone the conversation array for immutability.
        let updatedConvoArr = [...convoArr];

        // Fetch and parse the conversation history from localStorage.
        const storedConvHistory = localStorage.getItem('convHistory');
        let convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];

        // Define a variable to hold new responses for use in case 'save'.
        let newResponse;

        // Handle different types of amendments.
        switch (amendType) {
            case 'edit':
                // Enable editing mode.
                setEdits(true);
                updatedConvoArr = updatedConvoArr.map(chat =>
                ({
                    ...chat,
                    isEdit: convId === chat.convId && prevPrompt === chat.prompt && chat.response === chatResponse
                })
                );
                break;

            case 'save':
                if (!newPrompt) return; // Exit if no new prompt is provided.
                handleSentPrompt(true); // Show loading indication.

                const newEdit = {
                    role: 'user',
                    content: `Remember, each response should be gentle and tailored as if you're chatting with a child on an adventure. Your role is to be their friendly AI travel companion, so each and every interaction should be in a comforting tone and ensure to add interesting emojis to conversations. """${newPrompt}"""`
                };

                const request = { editedPrompt: [newEdit] };
                getResponse(request)
                    .then(response => {
                        newResponse = response.content;
                        updatedConvoArr = updatedConvoArr.map(chat =>
                            convId === chat.convId && chat.isEdit
                                ? { ...chat, prompt: newPrompt, response: newResponse, isEdit: false }
                                : chat
                        );

                        // Update conversation display.
                        setConvoArr(updatedConvoArr);
                        updateLocalHistory();
                        handleSentPrompt(false); // Hide loading indication.
                    })
                    .catch(err => {
                        console.error('Error fetching response:', err);
                        handleSentPrompt(false);
                    });
                break;

            case 'cancel':
                // Disable editing mode without saving changes.
                updatedConvoArr = updatedConvoArr.map(chat =>
                    convId === chat.convId && prevPrompt === chat.prompt && chat.response === chatResponse
                        ? { ...chat, isEdit: false }
                        : chat
                );
                setEdits(true);
                break;

            default:
                console.error('Invalid amendment type specified');
        }

        // Update the conversation array with any changes.
        setConvoArr(updatedConvoArr);

        // Function to update local history.
        const updateLocalHistory = () => {
            convHistory = convHistory.map(hist =>
            ({
                ...hist,
                convoArr: hist.convoArr.map(conv =>
                    convId === conv.convId && conv.prompt === prevPrompt && conv.response === chatResponse
                        ? { ...conv, prompt: newPrompt, response: newResponse }
                        : conv
                )
            })
            );

            // Persist the updated history to local storage.
            localStorage.setItem('convHistory', JSON.stringify(convHistory));
            setUpdate(prev => !prev); // Toggle state to force an update.
            setEditPrompt(''); // Clear the prompt input.
        };
    };



    return (
        <HistoryStore.Provider
            value={{
                setEditPrompt, handleAmends, handleDelete, handleInputMouseLeave,
                handleClickRename, handleSubmitRename, handleInputChange, handleMore,
                handleOptionEvents, isHistoryUpDate, setUpdate
            }}>
            {children}
        </HistoryStore.Provider>
    )

}

export const useHistoryFeed = () => useContext(HistoryStore)
