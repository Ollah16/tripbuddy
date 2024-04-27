import { useEffect, useState } from "react";
import { useAppStore } from "../appcontext";
import { HistoryContext, useHistoryFeed } from "./historycontext";
import { processedHistory } from "./processhistory";
import HistoryDisplay from "./historydisplay";

const HistoryFeed = () => {

    const [history, setHistory] = useState();
    const { convoArr } = useAppStore()

    const { isHistoryUpDate } = useHistoryFeed()

    useEffect(() => {
        const getProcessedHistory = processedHistory()
        setHistory(getProcessedHistory)

    }, [convoArr, isHistoryUpDate]);


    return (<div>
        {history && Object.entries(history).map((hist) => {
            const [key, value] = hist;
            return Array.isArray(value) && value.length > 0 && (
                <div key={key}>
                    <HistoryDisplay
                        title={key}
                        history={value}
                    />
                </div>
            );
        })}

    </div>
    )
}

export default HistoryFeed
