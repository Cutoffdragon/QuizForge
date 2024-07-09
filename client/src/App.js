import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import Quiz, { quizLoader } from "./quiz"
import Home from "./home"
import CreateQuiz from "./createquiz"
import Error from "./error"
import "./App.css"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route exact path="/" element={<Home />} />
      <Route path="/error" element={<Error />} />
      <Route path="/quiz" element={<CreateQuiz />} />
      <Route path=":id" element={<Quiz />} loader={quizLoader} />
    </Route>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}