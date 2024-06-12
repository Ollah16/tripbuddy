import { SlOptions } from "react-icons/sl";
import OptionComp from "./optioncomp";
import { useConvContext } from "../context/convoContext";
import { useHistoryFeed } from "../context/historycontext";

const HistoryDisplay = ({ history, title }) => {


    const { handleFetchHistory } = useConvContext()
    const { handleMore, handleInputChange, handleInputMouseLeave } = useHistoryFeed()

    return (
        history.length > 0 &&
        <ul className="px-1 text-white">

            <li className="text-xs my-1">{title.charAt(0).toUpperCase() + title.slice(1)}</li>

            {history.sort((a, b) => new Date(b.date) - new Date(a.date)).map((hist) => {

                return hist.convoArr.slice(0, 1).sort((a, b) => b.convId - a.convId).map((conv, index) => {

                    return (
                        <li
                            className={`relative over histLi history text-md history flex py-[0.5px] ml-[-0.25rem] px-1 rounded items-center justify-between cursor-pointer hover:bg-[#e7e9ee]/10 transition-colors duration-200 ease-in-out`} key={index}>
                            {!conv.isRename ?
                                <h5 className={`cursor-pointer overflow-hidden text-nowrap text-ellipsis w-11/12`}
                                    onClick={() => handleFetchHistory(hist.historyId)}
                                >{conv.prompt}</h5>
                                :
                                <input
                                    id={`${conv.convId}-${hist.historyId}`}
                                    onMouseLeave={() => handleInputMouseLeave()}
                                    defaultValue={conv.prompt}
                                    onKeyUp={handleInputChange}
                                    className="bg-transparent border-2 border-white rounded focus:outline-none px-2 caret-white" />}
                            <button
                                onClick={() => handleMore(conv.convId, hist.historyId)}
                                className={`h-fit optionBtn`}><SlOptions /></button>


                            <OptionComp
                                convId={conv.convId}
                                historyId={hist.historyId}
                                isOption={conv.isOption}
                            />
                        </li>)
                }
                )
            })}
        </ul >

    )
}

export default HistoryDisplay
