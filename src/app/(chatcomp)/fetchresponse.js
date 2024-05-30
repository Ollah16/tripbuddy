'use server'
import OpenAI from "openai";

export const getResponse = async (request) => {
    // fetch prompt response api


    // Process new chat entries or use edited prompt
    const newArray = request.map(element => {
        // Extract content from element and remove unnecessary properties
        const { prompt: content, response, convId, date, isEdit, isOption, isRename, isShare, ...rest } = element;

        // Prepare new element with a user-friendly and engaging message
        return {
            ...rest,
            role: 'user',
            content: `Remember, each response should be gentle and tailored as if you're chatting with a child on an adventure. Your role is to be their friendly AI travel companion, so each and every interaction should be in a comforting tone and ensure to add interesting emojis to conversations.
             """${content}"""`
        };
    })

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



