
const OlderHistory = ({ history }) => {
    return (
        history.length > 0 &&
        <ul className="px-1">
            <li className="text-xs">Older</li>
            {history.map((hist) => {

                return hist.convoArr.map((conv, index) => {
                    return (<li key={index}>{conv.prompt}</li>)
                }
                )
            })}
        </ul>

    )
}

export default OlderHistory
