

const IntroComp = () => {
    const welcomeMessage = `Welcome to the AI Trip Pal!`;

    return (
        <div className="relative w-full flex flex-col items-center py-10">
            <input className="bg-inherit border-0 font-bold text-3xl focus:outline-none w-max h-10 inline-block text-[#3c5c7c] transition-text duration-200 ease-in-out" value={welcomeMessage} readOnly />
        </div>
    );
};

export default IntroComp;
