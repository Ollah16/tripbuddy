'use server'
import OpenAI from "openai";

export const getResponse = async (content) => {
    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const requestData = {
            model: "gpt-3.5-turbo",
            messages: [{ role: 'user', content }],
            temperature: 0.7,
        };

        const response = await openai.chat.completions.create(requestData)
        return response.choices[0].message
    }
    catch (err) {
        console.log(err)
    }

}



