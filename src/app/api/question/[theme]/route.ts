import { QuestionModel, QuestionRequestResult } from "@/models/question-model";
import { generateQuiz } from "@/services/quiz-generator.service"
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { theme: string } }): Promise<NextResponse> {
    const difficulty = request.nextUrl.searchParams.get("difficulty");

    const data = await generateQuiz(params.theme, difficulty!);
    // const data = getSampleData();
    return NextResponse.json(data);
}

function getSampleData(): QuestionRequestResult {
    return {
        "isOk": true,
        "message": "ok",
        "questions": [
            {
                "question": "What is the name of the famous children's book about a young girl who falls down a rabbit hole?",
                "options": {
                    "a": "Alice in Wonderland",
                    "b": "Charlotte's Web",
                    "c": "Matilda",
                    "d": "The Secret Garden"
                },
                "correct_answer": "a",
                "explanation": "The correct answer is Alice in Wonderland. This classic story by Lewis Carroll follows the adventures of Alice after she falls down a rabbit hole into a fantasy world.",
                "difficulty": "null"
            },
            {
                "question": "What is the name of the famous puppet who wants to be a real boy in the story by Carlo Collodi?",
                "options": {
                    "a": "Pinocchio",
                    "b": "Peter Pan",
                    "c": "Pippi Longstocking",
                    "d": "Winnie the Pooh"
                },
                "correct_answer": "a",
                "explanation": "The correct answer is Pinocchio. In the story, Pinocchio is a wooden puppet who dreams of becoming a real boy and goes on a series of adventures to achieve his goal.",
                "difficulty": "null"
            }
        ]
    }
}