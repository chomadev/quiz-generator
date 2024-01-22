'use client'
import { QuestionModel } from "@/models/question-model"
import { useState } from "react"
import Question from "./Question";

export default function Questions(props: { questions: QuestionModel[], showAnswers: boolean }) {
    return (<div className="flex flex-col gap-4">
        {props.questions && props.questions.map((question: QuestionModel, index: number) => <>
            <div key={`question_${index}`}>
                <Question question={question} index={index} showAnswers={props.showAnswers} />
            </div>
        </>)}
    </div>)
}