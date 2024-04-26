
const Prev30DaysHistory = ({ history }) => {
    return (
        history.length > 0 &&
        <ul className="px-1">
            <li className="text-xs">Previous 30 days</li>
            {history.map((hist) => {

                return hist.convoArr.map((conv, index) => {
                    return (<li key={index}>{conv.prompt}</li>)
                }
                )
            })}
        </ul>

    )
}

export default Prev30DaysHistory
