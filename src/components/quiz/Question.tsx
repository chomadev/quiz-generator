import { QuestionModel } from "@/models/question-model";
import { useEffect, useState } from "react";

interface QuestionProps {
    index: number
    question: QuestionModel
    showAnswers: boolean | undefined
}

export default function Question({ index, question, showAnswers }: QuestionProps) {
    const [selectedAlternative, setSelectedAlternative] = useState<string>();
    const [isCorrect, setIsCorrect] = useState<boolean | undefined>();
    useEffect(() => {
        if (selectedAlternative && showAnswers) {
            setIsCorrect(question.correct_answer === selectedAlternative)
        }
    }, [showAnswers])
    
    return (<>
        <p>{index + 1} - {question.question}</p>
        <ul>
            {Object.keys(question.options).map((option, alternativeIndex) => (
                <li
                    key={`queston_${index}_alternative_${alternativeIndex}`}
                    className={!!showAnswers ? (isCorrect ? "text-green-400" : "text-red-400") : ""}>
                    <input
                        type="radio"
                        value={option}
                        id={`${index}_${option}`}
                        name={`question_${index}`}
                        checked={option === selectedAlternative}
                        onChange={(e) => setSelectedAlternative(e.target.value)} />
                    <label htmlFor={`${index}_${option}`}> {question.options[option]}</label>
                </li>)
            )}
        </ul>
        {
            showAnswers &&
            <p><small><i>Correct answer: <b>{question.correct_answer}, {question.options[question.correct_answer]}</b></i></small></p>
        }
    </>)
}