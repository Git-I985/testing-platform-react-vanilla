import ReactDOM from "react-dom";
import React, {useEffect, useState} from 'react';
import 'bulma-checkradio';
import 'bulma';
import {Question} from "./components/Question";
import {Answer} from "./components/Answer";
import {SettingsDashboard} from "./components/Dashboard";
import {createAnswerObject, createQuestionObject, ONE_ANSWER_TYPE} from "./entities/common";
import {Box, EmptyDataMessage,ID} from "./components/Common";
import {mergeData, dataIsValid} from "./functions/common";
import SimpleCrypto from "simple-crypto-js"
import {saveAs} from 'file-saver'
import {SearchBar} from "./components/SearchBar";
import {ControlsBar} from "./components/ControlsBar";


// TODO добавить поиск по вопросам
// TODO добавить кнопку дублирования вопроса
// TODO добавить кнопку очистка всех вопросов
// TODO добавить кнопку очистки всех ответов на вопрос

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [settings, setSettings] = useState({});

    const generateTest = () => {
        const combinedQuestions = mergeData({questions, answers, settings})
        // if(dataIsValid(combinedQuestions)) { }
        const secretKey = ID();
        const crypter = new SimpleCrypto(secretKey);
        const encodedData = crypter.encrypt(combinedQuestions)
        saveAs(new Blob([JSON.stringify({secretKey, encodedData})], {type: 'application/json'}), 'test.json')
    }

    // TODO =============== DEBUG
    const [generated, setGenerated] = useState('')
    useEffect(() => {
        setGenerated(JSON.stringify(mergeData({questions, answers, settings}), null, 4))
    }, [questions,answers,settings]);
    // TODO =============== DEBUG

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
        <div className='pt-6 container'>
            {/* TODO =============== DEBUG --> */}
            <div className="is-flex">
                <div>
                    <pre>{generated}</pre>
                </div>
                {/* TODO =============== DEBUG --> */}
                <div className="is-flex-grow-1">
                    <SettingsDashboard onSettingsChange={(updatedSettings) => setSettings(updatedSettings)}/>
                    <Box style={{
                        position: "sticky",
                        top: "0",
                        zIndex: "1",
                        borderRadius: "0 0 6px 6px",
                        border: "1px solid #dbdbdb",
                        borderTop: 'none'
                    }} my-0>
                        <SearchBar/>
                        <ControlsBar generateTest={generateTest} addQuestion={addQuestion} questions={questions}/>
                    </Box>

                    <hr/>

                    {!questions.length && <EmptyDataMessage message={'Добавьте вопросы'}/>}

                    <div className="questions-container">
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
                </div>
                {/* TODO =============== DEBUG --> */}
            </div>
            {/* TODO =============== DEBUG --> */}
        </div>
    );
};

ReactDOM.render(<App/>, document.querySelector('#app'))

