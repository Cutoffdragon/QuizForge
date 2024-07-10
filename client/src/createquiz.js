import { useState } from "react"
import Instructions from './instructions.js'

const quizObject = {
    quizName: '',
    creatorName: '',
    quizType: '',
    description: '',
    questions: [],
    results: []
}

let questionIndex = 1;

export default function CreateQuiz() {
    const [setQuizName, setQuizNameState] = useState([{ quizName: "", creatorName: "", description: "", quizType: "" }])
    const [setPhase, setPhaseState] = useState(0);
    const [addQuestion, addQuestionState] = useState([{ question: "" }]);
    const [addAnswer, addAnswerState] = useState([{ answer: "", answerValue: "" }]);
    const [addResult, addResultState] = useState([{ resultName: "", resultDescription: "", resultValue: "" }]);

    const submitQuizName = async () => {
        quizObject.quizName = setQuizName[0]['quizName'];
        quizObject.creatorName = setQuizName[0]['creatorName'];
        quizObject.quizType = setQuizName[0]['quizType'];
        setPhaseState(2);
    }

    const submitQuestion = async () => {
        let valueRegex = /^[A-Za-z0-9_.]+$/
        for (let i = 0; i < addAnswer.length; i++) {
            if (!valueRegex.test(addAnswer[i]['answerValue'])) {
                alert('Please make sure all your answer values are valid.');
                return;
            }
        }
        quizObject.questions.push({
            question: addQuestion,
            answers: addAnswer
        })
        addQuestionState([{ question: "" }]);
        addAnswerState([{ answer: "", answerValue: "" }]);
        questionIndex += 1;
        setPhaseState(3)
    }

    const submitResults = async () => {
        quizObject.results.push({
            result: addResult
        });
        onSubmitForm();
        setPhaseState(5)
    }

    const finalizeQuestions = async () => {
        if (setQuizName[0]['quizType'] == 'A') {
            onSubmitForm();
        } else {
            setPhaseState(4)
        }
    }

    const onSubmitForm = async () => {
        try {
            const body = quizObject;
            setPhaseState(5);
            const response = await fetch(process.env.SOURCE_SITE + "/quizinfo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            console.log(response);
        } catch (err) {
            console.error(err.message);
            window.location = '/error';
        }
    };

    const getQuizId = async () => {
        try {
            const query = setQuizName[0]['quizName'].replace(' ', '+')
            const response = await fetch(process.env.SOURCE_SITE+ `/quizid?quizname=${query}`)
            const results = await response.json();
            console.log(results);
            window.location = process.env.CLIENT_SITE + `/${results['quizId']}`
        } catch (err) {
            console.error(err.message);
            window.location = '/error'
        }
    };

    const addAnswerFunc = () => {
        addAnswerState([...addAnswer, { answer: "", answerValue: "" }]);
    };

    const removeAnswer = (index) => {
        let newArray = [...addAnswer];
        let indexToRemove = newArray.splice(index, 1);
        addAnswerState(newArray);
    }

    const addResultFunc = () => {
        addResultState([...addResult, { result: "" }]);
    };

    const removeResult = (index) => {
        let newArray = [...addResult];
        let indexToRemove = newArray.splice(index, 1);
        addResultState(newArray);
    }

    const handleQuizNameChange = (e) => {
        const { name, value } = e.target;
        const list = [...setQuizName];
        list[0][name] = value;
        setQuizNameState(list);
    }

    const handleAnswerChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...addAnswer];
        if (name == index) {
            list[index]['answerValue'] = value
        } else {
            list[index][name] = value;
        }
        addAnswerState(list);
    };

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        const list = [...addQuestion];
        list[0][name] = value;
        addQuestionState(list);
    };

    const handleResultChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...addResult];
        list[index][name] = value;
        addResultState(list);
    }

    return (
        <>
            <a href='/'><h1 className='mb-5 text-center fw-bold' id='header'>QuizForge</h1></a>
            {setPhase === 0 ? (
                <div className='d-flex flex-column align-items-center'>
                    <Instructions />
                    <button type='button' className='mt-2 action-button' onClick={() => setPhaseState(1)}>Start</button>
                </div>
            ) : setPhase === 1 ? (
                <div className='d-flex flex-column align-items-center'>
                    <label className='text-center text-primary display-4 mt-3 fw-bold' htmlFor='quizName'>What is the name of your quiz?</label>
                    <input className='w-50 p3 text-center mt-4 main-input' type='text' name='quizName' value={setQuizName[0]['quizName']} onChange={(e) => handleQuizNameChange(e)} placeholder='Enter Quiz Name'></input>
                    <label className='text-center mt-5 display-4 text-primary fw-bold' htmlFor='creatorName'>Create a nickname to author the quiz.</label>
                    <input className='w-50 p3 text-center mt-4 main-input' type='text' name='creatorName' value={setQuizName[0]['creatorName']} onChange={(e) => handleQuizNameChange(e)} placeholder='Enter a Nickname'></input>
                    <label className='text-center mt-5 display-4 text-primary fw-bold' htmlFor='description'>Write a description for the quiz.</label>
                    <textarea className='main-textarea' type='text' name='description' value={setQuizName[0]['description']} onChange={(e) => handleQuizNameChange(e)} placeholder='Enter Description'></textarea>
                    <label className='text-center text-primary display-6 mt-4' htmlFor='quizType'>Choose a Quiz Type: A for percentage based results, or B for varying value results.</label>
                    <div className='d-flex flex-row mt-5'>
                        <div className='d-flex flex-column align-items-center'>
                            <label htmlFor='A' className='display-5 text-success'>A</label>
                            <input type='radio' id='A' value='A' name='quizType' className='radio-button' onClick={(e) => handleQuizNameChange(e)}></input>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <label htmlFor='B' className='display-5 text-danger'>B</label>
                            <input type='radio' id='B' value='B' name='quizType' className='radio-button' onClick={(e) => handleQuizNameChange(e)}></input>
                        </div>
                    </div>
                    <button className='mt-3 action-button' type='button' onClick={() => submitQuizName()}>Start</button>
                </div>
            ) : setPhase === 2 ? (
                <div className='d-flex flex-column align-items-center'>
                    <label className='display-2 text-center text-primary fw-bold' htmlFor='questionName'>Question {questionIndex}</label>
                    <textarea type='text' name='question' className='main-textarea mt-3' value={addQuestion[0]['question']} onChange={(e) => handleQuestionChange(e)}></textarea>
                    {addAnswer.map((answerName, index) => (
                        <div key={index} className=' d-flex align-items-center flex-column mt-3 p-4'>
                            <label className='fs-4 fw-bold text-center text-primary' htmlFor='answer'>Add a potential answer for the question.</label>
                            <textarea type='text' name='answer' className='main-textarea' value={addAnswer[index]['answer']} onChange={(e) => handleAnswerChange(e, index)}></textarea>
                            {setQuizName[0]['quizType'] === 'B' ? (
                                <>
                                    <label className='fs-4 text-center text-primary mt-3' htmlFor='answerValue'>Add a value or multiple values for this answer. The Values will be used to determine the final results.</label>
                                    <input type='text' name='answerValue' className='main-input2' value={addAnswer[index]['answerValue']} onChange={(e) => handleAnswerChange(e, index)}></input>
                                </>
                            ) : (
                                <>
                                    <h4 className='fs-4 text-primary text-center mt-3'>Add one value for this answer. A for correct, B for incorrect, or C for partially correct.</h4>
                                    <div className='d-flex flex-row mt-2'>
                                        <div className='d-flex flex-column align-items-center'>
                                            <label htmlFor='A' className='fs-2 text-success'>A</label>
                                            <input type='radio' id='A' value='A' name={index} className='radio-button' onClick={(e) => handleAnswerChange(e, index)}></input>
                                        </div>
                                        <div className='d-flex flex-column align-items-center'>
                                            <label htmlFor='B' className='fs-2 text-danger'>B</label>
                                            <input type='radio' id='B' value='B' name={index} className='radio-button' onClick={(e) => handleAnswerChange(e, index)}></input>
                                        </div>
                                        <div className='d-flex flex-column align-items-center'>
                                            <label htmLFor='C' className='fs-2 text-warning'>C</label>
                                            <input type='radio' id='C' value='C' name={index} className='radio-button' onClick={(e) => handleAnswerChange(e, index)}></input>
                                        </div>
                                    </div>
                                </>
                            )}
                            <button type='button' className='remove-button fw-bold' title='Remove Answer' onClick={() => removeAnswer(index)}>X</button>
                        </div>
                    ))}
                    <div className='d-flex flex-row justify-content-center'>
                        <button type='button' className='action-button fs-5' onClick={() => addAnswerFunc()}>Add an answer</button>
                        <button type='button' className='action-button fs-5' onClick={() => submitQuestion()}>Submit Question</button>
                    </div>
                </div>
            ) : setPhase === 3 ? (
                <div className='d-flex flex-column align-items-center mt-5'>
                    <h1 className='text-center text-primary display-1 fw-bold'>Add a New Question?</h1>
                    <button type='button' className='action-button fs-5' onClick={() => setPhaseState(2)}>New Question?</button>
                    <h1 className='text-center text-primary display-1 fw-bold'>Or Finalize Questions?</h1>
                    <button type='button' className='action-button fs-5' onClick={() => finalizeQuestions()}>Finalize Questions</button>
                </div>
            ) : setPhase === 4 ? (
                <div className='d-flex flex-column align-items-center'>
                    {addResult.map((result, index) => (
                        <div key={index} className='d-flex align-items-center flex-column mt-5'>
                            <label className='fs-4 fw-bold text-center text-primary' htmlFor='resultName'>Create a result</label>
                            <input type='text' name='resultName' className='p3 text-center mt-3 main-input' value={addResult[index]['resultName']} onChange={(e) => handleResultChange(e, index)}></input>
                            <label className='fs-4 fw-bold text-center text-primary' htmlFor='resultDescription'>Write a description for the result.</label>
                            <textarea type='text' name='resultDescription' className='main-textarea mt-3' value={addResult[index]['resultDescription']} onChange={(e) => handleResultChange(e, index)}></textarea>
                            <label className='fs-4 text-center text-primary mt-3' htmlFor='resultValue'>Set the mode value required for the result.</label>
                            <input type='text' maxLength='1' name='resultValue' className='main-input2' value={addResult[index]['resultValue']} onChange={(e) => handleResultChange(e, index)}></input>
                            <button type='button' className='remove-button fw-bold' title='Remove Result' onClick={() => removeResult(index)}>X</button>
                        </div>
                    ))}
                    <div className='d-flex flex-row justify-content-center'>
                        <button type='button' className='action-button fs-5' onClick={() => addResultFunc()}>Add a new result</button>
                        <button type='button' className='action-button fs-5' onClick={() => submitResults()}>Submit Quiz</button>
                    </div>
                </div>
            ) : (
                <div className='d-flex flex-column align-items-center mt-5'>
                    <h1 className='text-center text-primary display-1 fw-bold'>Try your Original Quiz!</h1>
                    <button className='action-button fs-2' onClick={() => getQuizId()}>Quiz</button>
                    <button className='action-button fs-4' onClick={() => {
                        window.location = '/'
                    }}>Home Page</button>
                </div>
            )}
        </>
    )
}