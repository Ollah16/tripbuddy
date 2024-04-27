import { SlOptions } from "react-icons/sl";
import { BsChatSquareFill } from "react-icons/bs";
import OptionComp from "./optioncomp";
import { useAppStore } from "../appcontext";
import { useHistoryFeed } from "./historycontext";

const HistoryDisplay = ({
    history,
    title
}) => {

    const { handleFetchHistory } = useAppStore()

    const { handleMore, handleInputChange } = useHistoryFeed()

    return (
        history.length > 0 &&
        <ul className="px-1">

            <li className="text-xs my-1">{title.charAt(0).toUpperCase() + title.slice(1)}</li>

            {history.map((hist) => {
                return hist.convoArr.map((conv, index) => {

                    return (<li className="relative history text-md history hyphens-manual flex py-[0.5px] ml-[-0.25rem] px-1 rounded items-center justify-between cursor-pointer hover:bg-[#e7e9ee]/10 transition-colors duration-200 ease-in-out" key={index}>
                        {!conv.isRename ?
                            <h5 className="cursor-pointer w-full" onClick={() => handleFetchHistory(hist.historyId)}>{conv.prompt}</h5>
                            :
                            <input
                                id={`${conv.convId}-${hist.historyId}`}
                                defaultValue={conv.prompt}
                                onKeyUp={handleInputChange}
                                className="bg-transparent ring-1 ring-white rounded focus:outline-none px-2 caret-black" />}
                        <button onClick={() => handleMore(conv.convId, hist.historyId)} className={`h-fit after:content-[${<BsChatSquareFill />}] optionBtn after:block after:text-xs after:tracking-tight after:absolute after:right-0 after:bottom-0 after:top-0 after:w-6 hover:after:inline-block`}><SlOptions /></button>

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
