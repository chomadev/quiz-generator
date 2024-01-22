// 'use server;'

// import { ChatOpenAI } from "@langchain/openai";
// import { JsonOutputParser } from "@langchain/core/output_parsers";
// import { NextRequest, NextResponse } from "next/server";
// import {
//     ChatPromptTemplate, SystemMessagePromptTemplate,
//     HumanMessagePromptTemplate
// } from "@langchain/core/prompts";

// export async function generateQuiz(theme: string) { //request: NextRequest, context: { params: { theme: string } }
//     const difficulty = null; //request.nextUrl.searchParams.get("difficulty")

//     //theme: string
//     const model = new ChatOpenAI({
//         modelName: "gpt-4",
//         openAIApiKey: process.env.OPENAI_API_KEY,
//     }).bind({
//         functions: [getExtractionFunction()],
//         function_call: { name: "extractor" },
//     });

//     const systemMessagePromptTemplate = "You are the host for a trivia TV show, that can ask questions about anything, in different difficulty levels";
//     const promptTemplateContent =
//         "Generate five trivia questions with four options for a quiz game. The theme for the questions is '{theme}', and the difficulty of questions is {difficulty}."+
//         " The response needs to be a JSON, containing the question, a list of alternatives, the correct answer with an explanation why the others are incorrect, and the difficulty of the question.";

//     const promptFromMessages = ChatPromptTemplate.fromMessages([
//         SystemMessagePromptTemplate.fromTemplate(systemMessagePromptTemplate),
//         HumanMessagePromptTemplate.fromTemplate(promptTemplateContent)
//     ]);

//     const message = await promptFromMessages.formatMessages({
//         theme,
//         difficulty: difficulty ?? 'easy'
//     });

//     const gptPipe = promptFromMessages.pipe(model);
//     const gptReponse = await gptPipe.invoke({ theme, difficulty });
//     console.log({ gptReponse });

//     return NextResponse.json(gptReponse.content)
// }

// function getExtractionFunction() {
//     return {
//         name: "extractor",
//         description: "Extracts fields from the input.",
//         parameters: {
//             type: "object",
//             properties: {
//                 question: {
//                     type: "string",
//                     description: "The generated question",
//                 },
//                 alternatives: {
//                     type: "string",
//                     description: "An array of alternatives",
//                 },
//                 answer: {
//                     type: "string",
//                     description: "The correct answer for the question, with an explanation why the others are incorrect",
//                 },
//                 "difficulty": {
//                     type: "string",
//                     enum: ["easy", "medium", "hard", "very hard"],
//                     description: "The dificulty of the question generated"
//                 }
//             },
//             required: ["question", "alternatives", "answer", "difficulty"],
//         },
//     };
// }