
const Prev7DaysHistory = ({ history }) => {
    return (
        history.length > 0 &&
        <ul className="px-1">
            <li className="text-xs">Previous 7 Days</li>
            {history.map((hist) => {

                return hist.convoArr.map((conv, index) => {
                    return (<li key={index}>{conv.prompt}</li>)
                }
                )
            })}
        </ul>

    )
}

export default Prev7DaysHistory
