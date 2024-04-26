

const IntroComp = () => {
    const welcomeMessage = `Welcome to the AI Trip Pal!`;

    // useEffect(() => {
    //     let index = 0;
    //     let intro = ''
    //     const interval = setInterval(() => {
    //         if (index < welcomeMessage.length) {
    //             intro += welcomeMessage[index]
    //             setDropMessage(intro);
    //             index++;
    //         } else {
    //             clearInterval(interval);
    //         }
    //     }, 20)

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="relative w-full flex flex-col items-center py-10">
            <input className="bg-inherit border-0 font-bold text-3xl w-max h-10 inline-block text-[#3c5c7c] transition-text duration-200 ease-in-out" value={welcomeMessage} readOnly />
        </div>
    );
};

export default IntroComp;
