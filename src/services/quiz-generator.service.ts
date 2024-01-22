'use server;'

import { QuestionRequestResult } from "@/models/question-model";
import OpenAI from "openai";

export async function generateQuiz(theme: string, difficulty = "easy"): Promise<QuestionRequestResult> {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    const tools = [
        {
            type: "function",
            function: getExtractionFunction()
        }
    ]

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are the host for a trivia TV show, that can ask questions about anything, in different difficulty levels"
            },
            {
                role: "system",
                content: `Provide anwser in valid JSON content, containing the question, a list of alternatives prepend by an enumerating letter, the correct answer, an explanation why the others are incorrect, and the difficulty of the question.
                The JSON will be used with TypeScript and parsed to an object in the following format:
                {
                    questions: [{
                        question: string,
                        options: { [key: string]: string },
                        correct_answer: string,
                        explanation: string,
                        difficulty: "easy" | "medium" | "hard" | "very hard" | string;
                    }]
                }`
            },
            {
                role: "user",
                content: `Generate five trivia questions with four options for a quiz game. The theme for the questions is '${theme}', and the difficulty of questions is ${difficulty}.`
            },
        ],
        model: "gpt-3.5-turbo-1106",
        response_format: { type: "json_object" },
        temperature: 0,
    });

    const message = completion.choices[0].message;
    console.log({ message });

    const questions = message.content ? JSON.parse(message.content)?.questions : null;

    return {
        isOk: questions && completion.choices[0].finish_reason === "stop",
        message: completion.choices[0].finish_reason,
        questions
    } as QuestionRequestResult;
}

function getExtractionFunction() {
    return {
        name: "extractor",
        description: "Extracts fields from the input.",
        parameters: {
            type: "object",
            properties: {
                question: {
                    type: "string",
                    description: "The generated question",
                },
                alternatives: {
                    type: "string",
                    description: "An array of alternatives",
                },
                answer: {
                    type: "string",
                    description: "The correct answer for the question, with an explanation why the others are incorrect",
                },
                "difficulty": {
                    type: "string",
                    enum: ["easy", "medium", "hard", "very hard"],
                    description: "The dificulty of the question generated"
                }
            },
            required: ["question", "alternatives", "answer", "difficulty"],
        },
    };
}