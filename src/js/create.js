import ReactDOM from "react-dom";
import React, {useState} from 'react';
import 'bulma-checkradio';
import 'bulma';
import {Question} from "./components/Question";
import {Answer} from "./components/Answer";
import {Dasboard} from "./components/Dashboard";
import {createAnswerObject, createQuestionObject, MULTIPLE_ANSWERS_TYPE, ONE_ANSWER_TYPE} from "./entities/common";
import {EmptyDataMessage} from "./components/Common";

// TODO вынести литералы объектов в нормальные классы
// TODO сделать функцию генерации json из данных
// TODO сделать функцию шифрования
// TODO добавить кнопку скачивания теста
// TODO добавить поиск по вопросам
// TODO добавить кнопку дублирования вопроса
// TODO добавить кнопку очистка всех вопросов
// TODO добавить кнопку очистки всех ответов на вопрос
const App = () => {
    const [questions, setQuestions] = useState([
        {
            id: "ixwzovt3f",
            type: MULTIPLE_ANSWERS_TYPE,
            text: "Гегель выделял следующие ветви власти"
        },
        {
            id: "0m5pcsym8",
            type: ONE_ANSWER_TYPE,
            text: "Автором работы Левиафан является"
        }
    ]);

    const [answers, setAnswers] = useState([]);

    const addQuestion = () => setQuestions([...questions, createQuestionObject()])

    const addQuestionAnswer = (questionId) => setAnswers([...answers, createAnswerObject(questionId)])

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
                correct: questionType === ONE_ANSWER_TYPE ? false : answer.correct
            }
            return {...answer, correct: !answer.correct}
        }))
    }

    return (
        <div className='py-6 container questions-container'>
            <Dasboard/>
                {/*
                        Можно просматривать предыдущие вопросы во время прохождения теста
                        Можно поменять ответ на предыдущие вопросы
                        Можно пропускать вопросы
                        Показывать результаты ответов по окончанию теста (правильный ответ или не правильный)
                            - Так же показывать какие ответы были правильными
                        Установить время на прохождение теста
                    */}

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
            <div className="is-flex is-justify-content-center">
                <button className="button is-rounded is-info px-4" title="Добавить вопрос" onClick={addQuestion}>
                    <span className="icon"><i className="fas fa-plus" aria-hidden="true"/></span>
                </button>
            </div>
        </div>
    );
}

ReactDOM.render(
    <App/>
    , document.querySelector('#app'))

