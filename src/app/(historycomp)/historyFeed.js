import { useEffect, useState } from "react";
import { useAppStore } from "../appcontext";
import { useHistoryFeed } from "./historycontext";
import { processedHistory } from "./processhistory";
import HistoryDisplay from "./historydisplay";
import styles from './history.module.css'

const HistoryFeed = () => {

    const [history, setHistory] = useState();
    const { convoArr } = useAppStore()
    const { isHistoryUpDate } = useHistoryFeed()

    useEffect(() => {

        const fetchAndProcessHistory = async () => {
            try {
                const processedData = await processedHistory();
                setHistory(processedData);

            } catch (error) {
                console.error('Failed to fetch or process history:', error);
            }
        };

        fetchAndProcessHistory();

    }, [convoArr, isHistoryUpDate]);


    return (<div className={`overflow-y-auto ${styles.history_height}`}>
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
