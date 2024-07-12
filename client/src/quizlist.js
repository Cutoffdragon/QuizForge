import { useState, useEffect } from "react"

export default function QuizList(props) {

  const [quizzes, setQuizzes] = useState([]);
  const [quizQuery, setQuizQuery] = useState('')

  const populateQuizzes = async() => {
    try {
      const quizParam = quizQuery.replace(' ', '+')
      const response = await fetch(process.env.REACT_APP_SOURCE_SITE + `/populatequizzes?query=${quizParam}`);
      const results = await response.json();
      console.log(results);
      setQuizzes(results['rows']);
    } catch {
      console.log("error populating quizzes");
    }
  }

  useEffect(() => {
    populateQuizzes();
    window.addEventListener('load', populateQuizzes());
    return () => {
      window.removeEventListener('load', populateQuizzes());
    };
  }, []);

  const handleQuery = (e) => {
    const { value } = e.target;
    setQuizQuery(value);
    populateQuizzes()
  }

  return (
    <div className='d-flex flex-column align-items-center'>
      <input type='text' className='main-input m-2' placeholder='Search Quizzes' value={quizQuery} onChange={(e) => handleQuery(e)}></input>
      <div id='quizList'>
        {quizzes.map((result, index) => (
          <div className='m-5' key={index}>
            <a className='quizLink fw-bold' href={result['id'].toString()}>{result['quiz_name']}</a>
            <h4 className='fs-4 text-white'>By {result['creator_name']}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}