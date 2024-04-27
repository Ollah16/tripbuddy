

const IntroComp = () => {
    const welcomeMessage = `Welcome to the AI Trip Pal!`;

    return (
        <div className="relative w-full flex flex-col items-center py-5">
            <h4 className="bg-inherit border-0 font-bold md:text-3xl text-xl focus:outline-none w-max h-10 inline-block text-[#3c5c7c] transition-text duration-200 ease-in-out"> {welcomeMessage} </h4>
        </div>
    );
};

export default IntroComp;
