import { useState } from 'react'

export default function QuizTypeA(props) {

    const [showResults, setResultState] = useState(0);
    const [results, setResults] = useState(100);
    const [currentQuestion, getQuestion] = useState(0);

    //To get the next question or calculate results
    const answerSelected = (optionValue) => {
        if (currentQuestion + 1 < props.questions.length) {
            if (optionValue == 'B') {
                setResults(results - (100 / props.questions.length))
            } else if (optionValue == 'C') {
                setResults(results - (50 / props.questions.length))
            }
            getQuestion(currentQuestion + 1)
        } else {
            if (optionValue == 'B') {
                setResults(results - (100 / props.questions.length))
            } else if (optionValue == 'C') {
                setResults(results - (50 / props.questions.length))
            }
            setResultState(2);
        };
    };

    //Reset button logic
    const resetQuiz = () => {
        setResults(100);
        getQuestion(0);
        setResultState(1);
    }

    const startQuiz = async () => {
        try {
            setResultState(1)
        } catch {
            console.log("error")
        }
    }

    return (
        <div className="App quiz">
            {showResults === 2 ? (
                <div className="results-div">
                    <h3 className="display-1 fw-bold text-primary animated mt-5 ">Your Result is...</h3>
                    <h1 className="display-2 fw-bold text-success animated mt-5 mb-5">{parseInt(results)}%</h1>
                    <button className="action-button animated mt-5" onClick={() => resetQuiz()} >Reset Quiz</button>
                    <button className='action-button fs-4 animated' onClick={() => {
                        window.location='/'
                    }}>Home Page</button>
                </div>


            ) : showResults === 0 ? (
                <div id="header-div">
                    <h1 id='quiz-title' className='animated'>{props.quizName}</h1>
                    <h3 className="sub-header animated">By {props.creatorName}</h3>
                    <h3 className='sub-header animated'>{props.description}</h3>
                    <button className="action-button animated" onClick={() => startQuiz()}>Start Quiz</button>
                </div>
            ) : (


                <div>
                    <div className="question">
                        <h3 className="fs-2 fw-bold mt-5 text-primary animated">{props.questions[currentQuestion]['question']}</h3>
                    </div>
                    <div className="answers">
                        <ul>
                            {props.questions[currentQuestion]['options'].map((option) => {
                                return (
                                    <li className='list mt-4' onClick={() => answerSelected(option['values'])} key={option['id']}>{option['text']}</li>
                                )
                            })}
                        </ul>
                        <button className="action-button mt-5 animated" id="reset-button" onClick={() => resetQuiz()} >Reset Quiz</button>
                    </div>
                </div>
            )}
        </div>
    )
}