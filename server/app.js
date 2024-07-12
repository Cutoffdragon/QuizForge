'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.post('/quizinfo', async (req, res) => {
    const quizName = await pool.query(
        "INSERT INTO quizzes (quiz_name, creator_name, quiz_type) VALUES($1, $2, $3)",
        [req.body.quizName, req.body.creatorName, req.body.quizType]
    );

    const quizDescription = await pool.query(
        "INSERT INTO descriptions(quiz_name, description) VALUES($1, $2)",
        [req.body.quizName, req.body.description]
    );

    for (let i = 0; i < req.body.questions.length; i++) {
        let questionAdd = await pool.query(
            "INSERT INTO questions(quiz_name, question) VALUES($1, $2)",
            [req.body.quizName, req.body.questions[i]['question'][0]['question']]
        )
        for (let j = 0; j < req.body.questions[i]['answers'].length; j++) {
            let answersAdd = await pool.query(
                "INSERT INTO answers(quiz_name, question, answer, values) VALUES($1, $2, $3, $4)",
                [req.body.quizName, req.body.questions[i]['question'][0]['question'], req.body.questions[i]['answers'][j]['answer'], req.body.questions[i]['answers'][j]['answerValue']]
            )
        }
    };

    if (req.body.quizType === 'B') {
        for (let k = 0; k < req.body.results[0]['result'].length; k++) {
            let resultAdd = await pool.query(
                "INSERT INTO results(quiz_name, result, description, value) VALUES($1, $2, $3, $4)",
                [req.body.quizName, req.body.results[0]['result'][k]['resultName'], req.body.results[0]['result'][k]['resultDescription'], req.body.results[0]['result'][k]['resultValue']]
            )
        };
    }
});

app.get('/quizinfo', async (req, res) => {
    let quizQuery = req.query.id;
    const questions = [];
    const finalResults = [];
    let credentialInfo = await pool.query(
        "SELECT * FROM quizzes WHERE id=$1",
        [quizQuery]
    );

    let description = await pool.query(
        "SELECT * FROM descriptions WHERE quiz_name=$1",
        [credentialInfo['rows'][0]['quiz_name']]
    )

    const credentials = {
        quizName: credentialInfo['rows'][0]['quiz_name'],
        creatorName: credentialInfo['rows'][0]['creator_name'],
        quizDescription: description['rows'][0]['description'],
        quizType: credentialInfo['rows'][0]['quiz_type']
    }
    let questionInfo = await pool.query(
        "SELECT question FROM questions WHERE quiz_name=$1",
        [credentials['quizName']]
    );
    for (let i = 0; i < questionInfo['rows'].length; i++) {
        questions.push({
            question: questionInfo['rows'][i]['question'],
            options: []
        });
        let answerInfo = await pool.query(
            "SELECT answer, values FROM answers WHERE quiz_name=$1 AND question=$2",
            [credentials['quizName'], questionInfo['rows'][i]['question']]
        );
        for (let j = 0; j < answerInfo['rows'].length; j++) {
            questions[i]['options'].push({
                id: j,
                text: answerInfo['rows'][j]['answer'],
                values: answerInfo['rows'][j]['values'].split('')
            })
        }
    };

    if(credentials['quizType'] === 'B') {
        let resultInfo = await pool.query(
            "SELECT result, value, description FROM results WHERE quiz_name=$1",
            [credentials['quizName']]
        );

        for (let i = 0; i < resultInfo['rows'].length; i++) {
            finalResults.push({
                id: resultInfo['rows'][i]['value'],
                result: resultInfo['rows'][i]['result'],
                resultDescription: resultInfo['rows'][i]['description']
            })
        }
    }
    res.json({
        credentials: credentials,
        questions: questions,
        results: finalResults
    })
});

app.get('/populatequizzes', async (req, res) => {
    let quizQuery = req.query.query.replace('+', ' ')
    let quizzes = await pool.query(
        "SELECT * FROM quizzes WHERE quiz_name ILIKE $1 OR creator_name ILIKE $1 ORDER BY id DESC LIMIT 12",
        ['%' + quizQuery + '%']
    );
    res.json({
        rows: quizzes['rows']
    })
});

app.get('/quizid', async (req, res) => {
    let quizName = req.query.quizname.replace('+', ' ');
    let quizId = await pool.query(
        "SELECT id FROM quizzes WHERE quiz_name=$1",
        [quizName]
    );
    res.json({
        quizId: quizId['rows'][0]['id']
    })
})

//Start our server and tests!
const listener = app.listen(process.env.PORT || 8080, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app; 