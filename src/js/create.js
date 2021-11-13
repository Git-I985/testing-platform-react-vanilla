import ReactDOM from "react-dom";
import React, {useState} from 'react';
import 'bulma-checkradio';
import 'bulma';
import {Question} from "./components/Question";
import {Answer} from "./components/Answer";
import {EmptyDataMessage, ID} from "./components/Common";


const App = () => {
    const [questions, setQuestions] = useState([
        {
            id: "ixwzovt3f",
            type: "multipleAnswers",
            text: "Гегель выделял следующие ветви власти"
        },
        {
            id: "0m5pcsym8",
            type: "oneAnswer",
            text: "Автором работы Левиафан является"
        }
    ]);

    const [answers, setAnswers] = useState([]);

    const addQuestion = () => setQuestions([...questions, {id: ID(), type: "oneAnswer", text: ''}])

    const addQuestionAnswer = (questionId) => setAnswers([...answers, {id: ID(), correct: false, questionId, text: ''}])

    const deleteQuestion = (questionId) => setQuestions(questions.filter(question => question.id !== questionId))

    const deleteAnswer = (answerId) => setAnswers(answers.filter(({id}) => id !== answerId))

    const resetQuestionAnswers = (questionId) => setAnswers(answers.map((answer) => ({
        ...answer,
        ...answer.questionId === questionId && {correct: false}
    })))

    const changeQuestionType = (questionId, type) => {
        setQuestions(questions.map(question => ({
            ...question,
            ...question.id === questionId && {type},
        })))

        resetQuestionAnswers(questionId)
    }

    const changeAnswerText = (answerId, text) => setAnswers(answers.map(answer => ({
        ...answer,
        ...answer.id === answerId && {text}
    })))

    const changeQuestionText = (questionId, text) => setQuestions(questions.map(question => ({
        ...question,
        ...question.id === questionId && {text}
    })))

    const handleCorrectAnswerCheckboxChange = (answerId) => {
        const {questionId} = answers.find(({id}) => id === answerId)
        const {type: questionType} = questions.find(({id}) => id === questionId)

        setAnswers(answers.map(answer => {
            if (answer.questionId !== questionId) return answer;
            if (answer.id !== answerId) return {
                ...answer,
                correct: questionType === 'oneAnswer' ? false : answer.correct
            }
            return {...answer, correct: !answer.correct}
        }))
    }

    return (
        <div className='py-6 container questions-container'>
            <button className='button is-fullwidth is-info mb-4'
                    onClick={addQuestion}>
                Добавить вопрос
            </button>

            <hr/>

            {!questions.length && <EmptyDataMessage message={'Добавьте вопросы'}/>}

            {questions.map((question, questionIndex) => (
                <Question key={question.id}
                          index={questionIndex}
                          deleteQuestion={deleteQuestion}
                          addQuestionAnswer={addQuestionAnswer}
                          changeQuestionType={changeQuestionType}
                          changeQuestionText={changeQuestionText}
                          {...question}
                >{answers
                    .filter(({questionId}) => questionId === question.id)
                    .map((answer) => (
                        <Answer key={answer.id}
                                deleteAnswer={deleteAnswer}
                                question={question}
                                handleCorrectAnswerCheckboxChange={handleCorrectAnswerCheckboxChange}
                                changeAnswerText={changeAnswerText}
                                {...answer}/>
                    ))}
                </Question>
            ))}
        </div>
    );
}

ReactDOM.render(
    <App/>
    , document.querySelector('#app'))

