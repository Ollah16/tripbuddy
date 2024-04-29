'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useAppStore } from "../appcontext";
import { getResponse } from "../(chatcomp)/fetchresponse";

const HistoryStore = createContext()


export const HistoryContext = ({ children }) => {

    const { handleDeleteConverSation, handleUpdateScreen, convoArr, setConvoArr } = useAppStore()
    const [isHistoryUpDate, setUpdate] = useState(false)
    const [newPrompt, setEditPrompt] = useState('')

    useEffect(() => {

        const updateRename = () => {
            const storedHistory = localStorage.getItem('convHistory');
            if (!storedHistory) {
                console.error('No conversation history found in localStorage.');
                return;
            }

            const historyArr = JSON.parse(storedHistory);
            if (!Array.isArray(historyArr)) {
                console.error('Invalid conversation history format.');
                return;
            }

            const updateHistory = historyArr.map(hist => {
                return {
                    ...hist,
                    convoArr: hist.convoArr.map(conv => ({
                        ...conv,
                        isRename: false,
                        isOption: false
                    }))
                };
            });

            localStorage.setItem('convHistory', JSON.stringify(updateHistory));

        }

        updateRename()

    }, [])


    const handleDelete = (convId, historyId) => {
        const storedHistory = localStorage.getItem('convHistory');

        if (!storedHistory) {
            console.error('No conversation history found in localStorage.');
            return;
        }

        const historyArr = JSON.parse(storedHistory);
        if (!Array.isArray(historyArr)) {
            console.error('Invalid conversation history format.');
            return;
        }

        let updateHistory = historyArr.map(historyItem => {
            if (historyItem.historyId == historyId) {
                return {
                    ...historyItem,
                    convoArr: historyItem.convoArr?.filter(conversation => conversation.convId != convId)
                };
            }
            return historyItem;
        }).filter(hist => hist.convoArr.length > 0)



        localStorage.setItem('convHistory', JSON.stringify(updateHistory));
        setUpdate(prev => !prev);
    };

    const handleClickRename = (convId, historyId) => {
        const storedHistory = localStorage.getItem('convHistory');
        if (!storedHistory) {
            console.error('No conversation history found in localStorage.');
            return;
        }

        const historyArr = JSON.parse(storedHistory);
        if (!Array.isArray(historyArr)) {
            console.error('Invalid conversation history format.');
            return;
        }

        const updateHistory = historyArr.map(hist => {
            if (hist.historyId === historyId) {
                return {
                    ...hist,
                    convoArr: hist.convoArr.map(conv => ({
                        ...conv,
                        isRename: conv.convId === convId
                    }))
                };
            }
            return {
                ...hist,
                convoArr: hist.convoArr.map(conv => ({
                    ...conv,
                    isRename: false
                }))
            };
        });

        localStorage.setItem('convHistory', JSON.stringify(updateHistory));

        setUpdate(prev => !prev);
    };

    const handleSubmitRename = (convId, historyId, prompt) => {
        const storedHistory = localStorage.getItem('convHistory');
        if (!storedHistory) {
            console.error('No conversation history found in localStorage.');
            return;
        }

        const historyArr = JSON.parse(storedHistory);
        if (!Array.isArray(historyArr)) {
            console.error('Invalid conversation history format.');
            return;
        }


        const updateHistory = historyArr.map(hist => {

            if (hist.historyId == historyId) {
                return {
                    ...hist,
                    convoArr: hist.convoArr.map(conv => {
                        if (conv.convId == convId) {
                            return {
                                ...conv,
                                prompt,
                                isRename: false
                            }
                        }
                        return conv
                    })
                }
            }
            return hist;
        })

        localStorage.setItem('convHistory', JSON.stringify(updateHistory));
        setUpdate(prev => !prev);
        handleUpdateScreen(convId, prompt)
    };

    const handleInputChange = (e) => {
        e.preventDefault()
        if (e.key === 'Enter') {
            if (e.target.tagName === 'INPUT') {
                const inputElement = e.target;
                const inputValue = inputElement.value;
                const [convId, historyId] = inputElement.id.split('-')
                handleSubmitRename(convId, historyId, inputValue)
            }
        }
    };

    const handleMore = (convId, historyId) => {

        const storedHistory = localStorage.getItem('convHistory');
        if (!storedHistory) {
            console.error('No convHistory found in localStorage.');
        }

        const historyArr = JSON.parse(storedHistory);

        if (!Array.isArray(historyArr)) {
            console.error('Invalid convHistory format.');
            return
        }

        const updateHistory = historyArr.map(hist => {

            if (hist.historyId === historyId) {
                return {
                    ...hist,
                    convoArr: hist.convoArr.map(conv => ({
                        ...conv,
                        isOption: conv.convId === convId
                    }))
                };
            }
            return {
                ...hist,
                convoArr: hist.convoArr.map(conv => ({
                    ...conv,
                    isOption: false
                }))
            };;
        });

        localStorage.setItem('convHistory', JSON.stringify(updateHistory));

        setUpdate(prev => !prev);
    }

    const handleOptionEvents = (functionType, convId, historyId) => {
        switch (functionType) {
            case 'Rename':
                handleClickRename(convId, historyId)
                break;
            case 'Delete chat':
                handleDelete(convId, historyId)
                handleDeleteConverSation(convId)
                break;
        }

    }

    const handleInputMouseLeave = () => {

        let updateRename = localStorage.getItem('convHistory')
        if (!updateRename) {
            console.log('no history found')
            return
        }
        let parsedHistory = JSON.parse(updateRename)
        parsedHistory = parsedHistory.map(hist => {
            return {
                ...hist,
                convoArr: hist.convoArr.map(conv => {
                    return {
                        ...conv,
                        isRename: false
                    }
                })
            }
        })

        localStorage.setItem('convHistory', JSON.stringify(parsedHistory))
        setUpdate(prev => !prev)
    }

    const handleAmends = (params) => {

        const { amendType, convId, prevPrompt, chatResponse } = params
        let updatePrompt = [...convoArr]
        const storedConvHistory = localStorage.getItem('convHistory');
        let convHistory = storedConvHistory ? JSON.parse(storedConvHistory) : [];
        let newResponse;



        switch (amendType) {
            case 'edit':
                updatePrompt = updatePrompt.map((chat) => {

                    if (convId === chat.convId && prevPrompt === chat.prompt && chat.response === chatResponse) {
                        return { ...chat, isEdit: true };
                    }
                    return chat
                });

                break;

            case 'save':
                if (!newPrompt) return
                updatePrompt = updatePrompt.map((chat) => {
                    if (convId == chat.convId && prevPrompt == chat.prompt && chat.response == chatResponse) {

                        return { ...chat, prompt: newPrompt };
                    }
                    return chat
                });

                getResponse(updatePrompt)
                    .then((response) => {
                        newResponse = response.content
                        updatePrompt = updatePrompt.map((chat) => {

                            if (convId == chat.convId && chat.isEdit && chat.response == chatResponse) {
                                return { ...chat, prompt: newPrompt, response: response.content, isEdit: false };
                            }
                            return chat
                        });
                        setConvoArr(updatePrompt);
                        updateLocalHistory()
                    })
                    .catch((err) => {
                        console.error('Error fetching response:', err);
                    });
                break;

            case 'cancel':
                updatePrompt = updatePrompt.map((chat) => {
                    if (convId === chat.convId && prevPrompt === chat.prompt && chat.response === chatResponse) {
                        return { ...chat, isEdit: false };
                    }
                    return chat
                });

                break;
        }

        setConvoArr(updatePrompt);


        const updateLocalHistory = () => {

            convHistory = convHistory.map(hist => {
                return {
                    ...hist,
                    convoArr: hist.convoArr.map(conv => {
                        if (convId == conv.convId && conv.prompt == prevPrompt && conv.response == chatResponse) {
                            return {
                                ...conv,
                                prompt: newPrompt,
                                response: newResponse
                            }
                        }
                        return conv
                    })
                }
            })

            localStorage.setItem('convHistory', JSON.stringify(convHistory))

            setUpdate(prev => !prev)
            setEditPrompt('')

        }


    }


    return (
        <HistoryStore.Provider
            value={{
                setEditPrompt, handleAmends, handleDelete, handleInputMouseLeave,
                handleClickRename, handleSubmitRename, handleInputChange, handleMore, handleOptionEvents, isHistoryUpDate, setUpdate
            }}>
            {children}
        </HistoryStore.Provider>
    )

}

export const useHistoryFeed = () => useContext(HistoryStore)
