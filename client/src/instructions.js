import { useState } from 'react'

export default function Instructions() {

    const [phaseState, setPhaseState] = useState(0);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center quiz">
            {phaseState === 0 ? (
                <div className='m-3 d-flex flex-column align-items-center'>
                    <h1 className='text-center text-primary mt-2 display-2 fw-bold'>Build a Quiz with <span id='instructionSpan'>QuizForge</span></h1>
                    <h2 className='text-center text-primary mt-5 display-5'>Welcome! QuizForge provides a simplistic method for building creative, unique, and informative quizzes.</h2>
                    <h2 className='text-center text-primary mt-5 display-5'>Click on the Next Button to view instructions on using QuizForge to build intricate quizzes. If you are familiar with the process, click the 'Start' button to begin building a quiz!</h2>
                    <button onClick={() => setPhaseState(1)} className='action-button'>Next</button>
                </div>
            ) : phaseState === 1 ? (
                <div className='m-3 d-flex flex-column align-items-center'>
                    <h2 className='text-center text-primary mt-3 display-5'>Two formats are available: Type A as Percentage based Results, and Type B as Varying Value Results.</h2>
                    <h2 className='text-center text-success mt-3 display-5'>Type A will be great for building quizzes with a final score, which can be utilized in academic and trivia quizzes.</h2>
                    <h2 className='text-center text-danger mt-3 display-5'>Type B is a more complex method of building quizzes, which utilizes values for every answer to a question that will correlate with a final result. This is great for personality quizzes, or any quiz where there is no right or wrong answers.</h2>
                    <button onClick={() => setPhaseState(2)} className='action-button'>Type A</button>
                </div>
            ) : phaseState === 2 ? (
                <div className='m-5 d-flex flex-column align-items-center'>
                    <h2 className='text-center text-success display-4'>Type A</h2>
                    <h3 className='text-center text-success mt-5'>In a Type A quiz, an answer to a question can only have one of three values: A for a correct answer, B for an incorrect answer, and C for a partially correct answer.</h3>
                    <h3 className='text-center text-success mt-5'>You will not create results for a Type A quiz. An aggregate final score will be automatically calculated based on the ratio of correct, incorrect, and partially correct answers.</h3>
                    <button onClick={() => setPhaseState(3)} className='action-button'>Type B</button>
                </div>
            ) : phaseState === 3 ? (
                <div className='m-5 d-flex flex-column align-items-center'>
                <h2 className='text-center text-danger display-4'>Type B</h2>
                <h3 className='text-center text-danger mt-5'>Answers to questions will be assigned either a singular value or a combination of multiple values upon their creation. These values will accord with the 'mode' value assigned to each result that is created.</h3>
                <h3 className='text-center text-danger mt-5'>When creating results, assign each result a 'mode' value. Each result will be assigned based on the majority value selected in the questioning process.</h3>
                <button onClick={() => setPhaseState(4)} className='action-button'>Next</button>
            </div>
            ) : (
                <div class='mt-5'>
                    <h1 className='text-center text-primary m-5 display-3 fw-bold'>Now you are ready to build a quiz! Take your time, and have fun!</h1>
                </div>
            )}
        </div>
    )
}