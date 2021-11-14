import ReactDOM from "react-dom";
import React, {useState} from 'react';
import 'bulma-checkradio';
import 'bulma';
import {Question} from "./components/Question";
import {Answer} from "./components/Answer";
import {Dasboard} from "./components/Dashboard";
import {createAnswerObject, createQuestionObject, MULTIPLE_ANSWERS_TYPE, ONE_ANSWER_TYPE} from "./entities/common";
import {Box, Control, EmptyDataMessage, Field, ID} from "./components/Common";
import {combineAnswersAndQuestions, dataIsValid} from "./functions/common";
import SimpleCrypto from "simple-crypto-js"
import {saveAs} from 'file-saver'


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


    const generateTest = () => {
        const combinedQuestions = combineAnswersAndQuestions({questions, answers})
        // if(dataIsValid(combinedQuestions)) { }
        const secretKey = ID();
        const crypter = new SimpleCrypto(secretKey);
        const encodedData = crypter.encrypt(combinedQuestions)
        saveAs(new Blob([JSON.stringify({secretKey, encodedData})], {type: 'application/json'}), 'test.json')
    }

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
        <div className='pt-6 container questions-container'>
            <Dasboard/>

            <Box style={{position: "sticky", top: "0", zIndex: "1", borderRadius: "0 0 6px 6px"}} my-0>
                <Field has-addons>
                    <Control is-expanded>
                        <input className="input" type="text" placeholder="Найти вопрос... любое слово или фраза"/>
                    </Control>
                    <Control>
                        <button className="button is-info">
                            <span>Найти</span>
                            <span className="icon"><i className="fas fa-search" aria-hidden="true"/></span>
                        </button>
                    </Control>
                </Field>
                <Field is-grouped>
                    <Control is-expanded>
                        <button className='button is-info is-fullwidth' onClick={addQuestion}>Добавить вопрос</button>
                    </Control>
                    <Control>
                        <button className='button is-primary' onClick={generateTest}>
                            <span>Сохранить тест</span>
                            <span className="icon"><i className="fas fa-download" aria-hidden="true"/></span>
                        </button>
                    </Control>
                    <Control>
                        <button className='button is-light' onClick={() => window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })}>
                            <span>Наверх</span>
                            <span className="icon"><i className="fas fa-arrow-up" aria-hidden="true"/></span>
                        </button>
                    </Control>
                    <Control>
                        <button className='button is-light' onClick={() => window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: "smooth"
                        })}>
                            <span>Вниз</span>
                            <span className="icon"><i className="fas fa-arrow-down" aria-hidden="true"/></span>
                        </button>
                    </Control>
                </Field>
            </Box>

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
};

ReactDOM.render(<App/>, document.querySelector('#app'))

