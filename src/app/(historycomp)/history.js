import { TiMessageTyping } from "react-icons/ti";
import { MdOutlineWebhook } from "react-icons/md";
import { useToggle } from "../toggleContext";
import { useEffect, useState } from "react";
import TodayHistory from "./todayhistory";
import YesterdayHistory from "./yesterdayhistory";
import Prev7DaysHistory from "./prev7dayhistory";
import Prev30DaysHistory from "./prev30dayhistory";
import Prev60DaysHistory from "./prev60dayhistory";
import OlderHistory from "./olderhistory";

const HistoryExpanded = ({ handleNewConversation, convoArr }) => {


    const { historyToggle } = useToggle()

    const [history, setHistory] = useState({
        todaysHistory: [],
        yesterdaysHistory: [],
        previous7Days: [],
        previous30Days: [],
        previous60Days: [],
        olderHistory: [],
    });

    useEffect(() => {
        const storedHistory = localStorage.getItem('convHistory');
        const getHistory = storedHistory ? JSON.parse(storedHistory) : [];
        const now = new Date();

        if (!getHistory.length) return;

        const todaysHistory = [];
        const yesterdaysHistory = [];
        const previous7Days = [];
        const previous30Days = [];
        const previous60Days = [];
        const olderHistory = [];

        getHistory.forEach(hist => {
            const histDate = new Date(hist.date);
            const diffDays = (now - histDate) / (1000 * 3600 * 24);

            if (histDate.getDate() === now.getDate() && histDate.getMonth() === now.getMonth() && histDate.getFullYear() === now.getFullYear()) {
                todaysHistory.push(hist);
            } else if (diffDays < 2) {
                yesterdaysHistory.push(hist);
            } else if (diffDays < 8) {
                previous7Days.push(hist);
            } else if (diffDays < 31) {
                previous30Days.push(hist);
            } else if (diffDays < 61) {
                previous60Days.push(hist);
            } else {
                olderHistory.push(hist);
            }
        });

        setHistory(prev => ({
            ...prev,
            todaysHistory,
            yesterdaysHistory,
            previous7Days,
            previous30Days,
            previous60Days,
            olderHistory
        }));

    }, [convoArr]);

    return (
        <div className={`absolute min-h-screen overflow-y-visible z-30 py-3 px-2 top-16 hidden transition-left ease-in-out duration-200 md:block bottom-0 ${!historyToggle ? 'left-[-1000px]' : 'left-0'} w-[300px] bg-[#4a5568] text-white`}>
            <div className="mb-2">
                <label className="flex py-1 px-1 rounded items-center justify-between cursor-pointer hover:bg-[#e7e9ee]/10 transition-colors duration-200 ease-in-out" htmlFor="chatInput"
                    onClick={() => { handleNewConversation() }}
                >

                    <div className="flex gap-3 items-center">
                        <span className="border rounded-full p-0"><MdOutlineWebhook className="text-lg" /></span>
                        <span className="text-md tracking-tighter">New Chat</span>
                    </div>
                    <span><TiMessageTyping className="text-2xl" /></span>
                </label>
            </div>
            <div>

                <TodayHistory history={history.todaysHistory} />
                <YesterdayHistory history={history.yesterdaysHistory} />
                <Prev7DaysHistory history={history.previous7Days} />
                <Prev30DaysHistory history={history.previous30Days} />
                <Prev60DaysHistory history={history.previous60Days} />
                <OlderHistory history={history.olderHistory} />

            </div>
        </div >
    )
}

export default HistoryExpanded
