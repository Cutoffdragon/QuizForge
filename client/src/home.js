import QuizList from "./quizlist.js"
export default function Home() {

  return (
    <>
      <a href='/'><h1 className='my-5 text-center fw-bold' id='header'>QuizForge</h1></a>
      <div className='d-flex align-items-center homeDiv'>
        <div className='d-flex flex-column align-items-center w-75 py-5 m-3'>
          <h3 className="text-center heroText fw-bold text-white animated">Need to create an academic quiz? Looking to create a fun personality test for your friends? Create original quizzes in a fun, intuitive way with <span className='text-success fw-bold display-2'>QuizForge</span></h3>
        </div>
        <div className='d-flex flex-column align-items-center p-3'>
          <a href='/quiz'><button className='action-button animated'>Create Quiz</button></a>
        </div>
      </div>
        <h2 className='text-center fs-1 fw-bold text-primary m-5 animated'>Check out these quizzes from users like you!</h2>
      <QuizList />
    </>
  )
}