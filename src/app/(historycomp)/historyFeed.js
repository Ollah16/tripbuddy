import { useEffect, useState } from "react";
import { useAppStore } from "../appcontext";
import { useHistoryFeed } from "./historycontext";
import { processedHistory } from "./processhistory";
import HistoryDisplay from "./historydisplay";
import styles from './history.module.css'

const HistoryFeed = () => {

    const [history, setHistory] = useState();
    const { convoArr, historyToggle, navExpandToggle } = useAppStore()
    const [isBigScreen, setBigScreen] = useState()
    const { isHistoryUpDate } = useHistoryFeed()

    useEffect(() => {
        const getProcessedHistory = processedHistory()
        setHistory(getProcessedHistory)

    }, [convoArr, isHistoryUpDate]);

    useEffect(() => {
        const handleScreen = () => {
            if (window.innerWidth > 768) {
                return setBigScreen(true)
            }
            return setBigScreen(false)
        }
        handleScreen()

    }, [navExpandToggle, historyToggle])


    return (<div className={`overflow-y-auto ${!isBigScreen ? styles.history_height : styles.history_heightBigScreen}`}>
        {
            history && Object.entries(history).map((hist) => {
                const [key, value] = hist;
                return Array.isArray(value) && value.length > 0 && (
                    <HistoryDisplay
                        title={key}
                        key={key}
                        history={value}
                    />
                );
            })
        }

    </div >
    )
}

export default HistoryFeed
