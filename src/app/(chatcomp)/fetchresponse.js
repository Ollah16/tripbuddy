'use server'
import OpenAI from "openai";

export const getResponse = async (request) => {

    const { newChat, newContent } = request

    const newArray = newChat ?
        newChat.map(element => {
            let content = element.prompt
            delete element.prompt
            delete element.response
            delete element.convId
            delete element.date

            return {
                ...element,
                role: 'user',
                content: `Remember, each response should be gentle and tailored as if you're chatting with a child on an adventure. Your role is to be their friendly AI travel companion, so begin each interaction with a comforting tone and ensure to add interesting emojis to conversations. ${content}`
            };
        })
        : newContent


    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const requestData = {
            model: "gpt-3.5-turbo",
            messages: newArray,
            temperature: 0.7,
        };

        const response = await openai.chat.completions.create(requestData)
        return response.choices[0].message
    }
    catch (err) {
        console.log(err)
    }

}



