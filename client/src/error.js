export default function Error() {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h1 className='text-danger display-1 fw-bold m-3'>Sorry!</h1>
            <h2 className='text-warning display-5 fw-bold m-3'>Something went wrong when loading this page.</h2>
            <h2 className='text-warning display-5 m-5'>If you were making a quiz, there may be a quiz with the same name already. Please make the quiz again under a different name.</h2>
            <h2 className='text-warning display-5 m-5'>If you were taking a quiz, there may be something wrong with the quiz, where the answers contain values that do not correlate to a result. Please try taking a different quiz.</h2>
            <button className='action-button fs-4 animated' onClick={() => {
                        window.location='/'
                    }}>Home Page</button>
        </div>
    )
}