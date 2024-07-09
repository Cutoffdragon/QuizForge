import { useState } from 'react'

export default function QuizTypeB(props) {

  const [showResults, setResultState] = useState(0);
  const [results, setResults] = useState(0);
  const [currentQuestion, getQuestion] = useState(0);
  const [resultObject, setResultObject] = useState({});

  //To get the next question or calculate results
  const answerSelected = (optionValue) => {
    let list = resultObject
    if (currentQuestion + 1 < props.questions.length) {
      for (let i = 0; i < optionValue.length; i++) {
        if (list[optionValue[i]]) {
          list[optionValue[i]] += 1;
        } else {
          list[optionValue[i]] = 1;
        }
        setResultObject(list);
        console.log(list)
      }
      getQuestion(currentQuestion + 1)
    } else {
      for (let i = 0; i < optionValue.length; i++) {
        if (list[optionValue[i]]) {
          list[optionValue[i]] += 1;
        } else {
          list[optionValue[i]] = 1;
        }
        setResultObject(list);
      }
      getResults(resultObject)
      setResultState(2);
    };
  };

  //Reset button logic
  const resetQuiz = () => {
    setResultObject({});
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

  //Calculate results based on values obtained from the answers selected
  const getResults = (obj) => {
    try {
      let maxLetter = "";
      let maxValue = 0;
      for (let i = 0; i < Object.keys(obj).length; i++) {
        if (Object.values(obj)[i] > maxValue) {
          maxValue = Object.values(obj)[i];
          maxLetter = Object.keys(obj)[i];
        };
      };
      //Find the result from the finalResults Array that matches the resultKey
      let resultArrayIndex = NaN
      for (let i = 0; i < props.finalResults.length; i++) {
        if (maxLetter === props.finalResults[i]['id']) {
          resultArrayIndex = i;
        }
      }
      setResults(resultArrayIndex);
    } catch {
      window.location = '/error'
    }
  }

  return (
    <div className="App">
      {showResults === 2 ? (
        <div className="results-div">
          <h3 className="display-1 fw-bold text-primary animated mt-5 ">Your Result is...</h3>
          <h1 className="display-2 fw-bold text-success animated mt-5 ">{props.finalResults[results]['result']}</h1>
          <h2 className="display-5 fw-bold text-success animated mt-5  mb-5">{props.finalResults[results]['resultDescription']}</h2>
          <button className="action-button" onClick={() => resetQuiz()} >Reset Quiz</button>
          <button className='action-button fs-4 animated' onClick={() => {
            window.location = '/'
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


        <div className="question-card">
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
            <button className="action-button mt-5 " id="reset-button" onClick={() => resetQuiz()} >Reset Quiz</button>
          </div>
        </div>
      )}
    </div>
  );
} 