'use client'
import Questions from "@/components/quiz/Questions";
import { QuestionModel, QuestionRequestResult } from "@/models/question-model";
import { Suspense, useState } from "react";

type QuizState = "initial" | "loading" | "error" | "answering" | "finish";

export default function Home() {
  const [theme, setTheme] = useState<string>();
  const [questions, setQuestions] = useState<QuestionModel[]>();
  const [message, setMessage] = useState<string | undefined>();
  const [quizState, setQuizState] = useState<QuizState>("initial");
  const [showAnswers, setShowAnswers] = useState<boolean | undefined>();

  return (<>
    <main className="flex flex-col items-center justify-between p-24">
      <div className="w-full max-w-screen-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter any theme and we will give you a trivia quiz about it (anything!):
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="theme" type="text" placeholder="Theme of the question"
                onChange={(e) => setTheme(e.target.value)} />
            </label>
          </div>

          {
            quizState === "initial" &&
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => loadQuestions()}>
                Load question
              </button>
            </div>
          }
        </form>
        {quizState === "loading" && <p>Loading...</p>}
      </div>

      {theme && questions && (quizState === "answering" || quizState === "finish") &&
        <Questions questions={questions} showAnswers={quizState === "finish"}></Questions>
      }
      {message && <p>{message}</p>}
      {
        quizState !== "initial" && quizState !== "loading" &&
        <div className="flex flex-row gap-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setQuizState("finish")}
            disabled={showAnswers}
          >
            Check
          </button>
          <input
            type="reset"
            className="bg-transparent border-gray-100 border-1 border-solid text-white hover:bg-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => setQuizState("initial")}
            value="Restart"
          />
        </div>
      }
    </main>
    <footer></footer>
  </>);

  function loadQuestions() {
    setQuizState("loading");
    fetch(`/api/question/${theme}`, {
      method: 'GET', headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        Connection: "keep-alive",
      }
    })
      .then(response => response.json())
      .then((data: QuestionRequestResult) => {
        if (data.isOk) {
          setQuizState("answering");
          setQuestions(data.questions);
        } else {
          setQuizState("error");
          setMessage(data.message);
        }
      });
  }
}
