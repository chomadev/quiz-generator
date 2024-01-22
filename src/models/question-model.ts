export interface QuestionModel {
    question: string
    options: { [key: string]: string },
    correct_answer: string,
    explanation: string,
    difficulty: "easy" | "medium" | "hard" | "very hard" | string;
}

export interface QuestionRequestResult {
    isOk: boolean
    questions: QuestionModel[]
    message: string
}