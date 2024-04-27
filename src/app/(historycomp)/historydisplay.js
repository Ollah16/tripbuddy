import { SlOptions } from "react-icons/sl";
import styles from './history.module.css'
import OptionComp from "./optioncomp";
import { useAppStore } from "../appcontext";
import { useHistoryFeed } from "./historycontext";
import { useEffect, useRef } from "react";

const HistoryDisplay = ({
    history,
    title
}) => {

    const { handleFetchHistory } = useAppStore()

    const { handleMore, handleInputChange, handleMouseLeave } = useHistoryFeed()

    return (
        history.length > 0 &&
        <ul className="px-1 text-white">

            <li className="text-xs my-1">{title.charAt(0).toUpperCase() + title.slice(1)}</li>
            {history.map((hist) => {
                return hist.convoArr.map((conv, index) => {

                    return (<li className="relative history text-md history flex py-[0.5px] ml-[-0.25rem] px-1 rounded items-center justify-between cursor-pointer hover:bg-[#e7e9ee]/10 transition-colors duration-200 ease-in-out" key={index}>
                        {!conv.isRename ?
                            <h5 className={`cursor-pointer overflow-hidden text-nowrap text-ellipsis w-11/12 ${styles.box_shadow}`} onClick={() => handleFetchHistory(hist.historyId)}>{conv.prompt}</h5>
                            :
                            <input
                                id={`${conv.convId}-${hist.historyId}`}
                                onMouseLeave={() => handleMouseLeave()}
                                defaultValue={conv.prompt}
                                onKeyUp={handleInputChange}
                                className="bg-transparent border-2 border-white rounded focus:outline-none px-2 caret-white" />}
                        <button onClick={() => handleMore(conv.convId, hist.historyId)}
                            onMouseLeave={() => handleMouseLeave()}
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
