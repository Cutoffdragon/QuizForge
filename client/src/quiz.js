import { useLoaderData } from "react-router-dom"
import QuizTypeA from "./quiztypea.js"
import QuizTypeB from "./quiztypeb.js"

export default function Quiz() {

  const quizCredentials = useLoaderData();

  //Generate question card or results card
  return (
    <div className='App'>
      <a href='/'><h1 className='mb-5 text-center fw-bold' id='header'>QuizForge</h1></a>
      {quizCredentials['credentials']['quizType'] === 'A' ? (
        <QuizTypeA quizName={quizCredentials['credentials']['quizName']} creatorName={quizCredentials['credentials']['creatorName']} description={quizCredentials['credentials']['quizDescription']} questions={quizCredentials['questions']} />
      ) : (
        <QuizTypeB quizName={quizCredentials['credentials']['quizName']} creatorName={quizCredentials['credentials']['creatorName']} description={quizCredentials['credentials']['quizDescription']} questions={quizCredentials['questions']} finalResults={quizCredentials['results']} />
      )}
    </div>
  );
}

export const quizLoader = async ({ params }) => {
  const query = params['id']
  return await fetch(`http://localhost:8080/quizinfo?id=${query}`);
}