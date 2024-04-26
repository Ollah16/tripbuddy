import { SlOptions } from "react-icons/sl";
import { BsChatSquareFill } from "react-icons/bs";
import OptionComp from "./optioncomp";

const TodayHistory = ({ history }) => {

    const handleMore = () => {
        console.log('hi')
    }

    return (
        history.length > 0 &&
        <ul className="px-1">
            <li className="text-xs my-1">Today</li>
            {history.map((hist) => {

                return hist.convoArr.map((conv, index) => {
                    return (<li className="relative text-md history hyphens-manual flex py-[0.5px] ml-[-0.25rem] px-1 rounded items-center justify-between cursor-pointer hover:bg-[#e7e9ee]/10 transition-colors duration-200 ease-in-out" key={index}>
                        {conv.prompt}
                        <button onClick={() => handleMore()} className={`h-fit after:content-[${<BsChatSquareFill />}] after:block after:text-xs after:tracking-tight after:absolute after:right-0 after:bottom-0 after:top-0 after:w-6 hover:after:inline-block`}><SlOptions /></button>


                    </li>)
                }
                )
            })}
            <OptionComp />

        </ul >

    )
}

export default TodayHistory
