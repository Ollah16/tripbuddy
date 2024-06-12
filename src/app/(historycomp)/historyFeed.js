import { useMemo } from "react";
import { useHistoryFeed } from "../context/historycontext";
import { processedHistory } from "./processhistory";
import HistoryDisplay from "./historydisplay";
import styles from './history.module.css'
import { useConvContext } from "../context/convoContext";

const HistoryFeed = () => {

    const { convoArr } = useConvContext()
    const { isHistoryUpDate } = useHistoryFeed()

    const history = useMemo(() => processedHistory(), [convoArr, isHistoryUpDate])

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
