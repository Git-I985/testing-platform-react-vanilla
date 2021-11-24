import ReactDOM from "react-dom";
import React, {useEffect, useState} from 'react';
import 'bulma-checkradio';
import 'bulma-switch';
import '../../css/bulma.custom.scss';
import {Question} from "./components/Question";
import {Answer} from "./components/Answer";
import {SettingsDashboard} from "./components/Dashboard";
import {createAnswerObject, createQuestionObject, ONE_ANSWER_TYPE} from "./entities/common";
import {EmptyDataMessage, ID} from "./components/Common";
import {mergeData, dataIsValid} from "./functions/common";
import SimpleCrypto from "simple-crypto-js"
import {saveAs} from 'file-saver'
import {ControlsBar} from "./components/ControlsBar";

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [settings, setSettings] = useState({});

    const generateTest = () => {
        const combinedQuestions = mergeData({questions, answers, settings})
        // TODO if(dataIsValid(combinedQuestions)) { }
        const secretKey = ID();
        const crypter = new SimpleCrypto(secretKey);
        const encodedData = crypter.encrypt(combinedQuestions)
        saveAs(new Blob([JSON.stringify({secretKey, encodedData})], {type: 'application/json'}), 'test.json')
    }

    // TODO =============== DEBUG
    const [generated, setGenerated] = useState('')
    const [debugMode, setDebugMode] = useState(false)
    useEffect(() => {
        if (debugMode) {
            setGenerated(JSON.stringify(mergeData({questions, answers, settings}), null, 4))
        }
    }, [questions, answers, settings, debugMode]);
    // TODO =============== DEBUG

    const addQuestion = () => {
        setQuestions([...questions, createQuestionObject()])
    }

    const addQuestionAnswer = (questionId) => {
        setAnswers([...answers, createAnswerObject(questionId)])
    }

    const deleteQuestion = (questionId) => {
        setQuestions(questions.filter(question => question.id !== questionId))
    }

    const deleteAnswer = (answerId) => {
        setAnswers(answers.filter(({id}) => id !== answerId))
    }

    const resetQuestionAnswers = (questionId) => {
        setAnswers(answers.map((answer) => ({
            ...answer,
            ...answer.questionId === questionId && {correct: false}
        })))
    }

    const changeQuestionType = (questionId, type) => {
        setQuestions(questions.map(question => ({
            ...question,
            ...question.id === questionId && {type},
        })))

        resetQuestionAnswers(questionId)
    }

    const changeAnswerText = (answerId, text) => {
        setAnswers(answers.map(answer => ({
            ...answer,
            ...answer.id === answerId && {text}
        })))
    }

    const changeQuestionText = (questionId, text) => {
        setQuestions(questions.map(question => ({
            ...question,
            ...question.id === questionId && {text}
        })))
    }

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

    const clearQuestionAnswers = (questionId) => {
        setAnswers(answers.filter(({questionId: qId}) => qId !== questionId))
    }

    const duplicateQuestion = (questionId) => {
        /** duplicate values, but adds new unique IDs */
        const questionIndex = questions.findIndex(({id}) => id === questionId)
        const duplicatedQuestion = {...questions[questionIndex], id: ID()}
        const duplicatedAnswers = answers
            .filter(({questionId: qId}) => qId === questionId)
            .map(answer => ({
                ...answer,
                id: ID(),
                questionId: duplicatedQuestion.id
            }))

        /** insert after duplicated answer */
        let newQuestions = [...questions]
        newQuestions.splice(questionIndex, 0, duplicatedQuestion)
        setQuestions(newQuestions)
        setAnswers([...answers, ...duplicatedAnswers])
    }

    const handleSearchInputChange = ({target: {value: searchInputValue}}) => {
        setSearchString(searchInputValue.toLowerCase())
    }

    const filteredQuestions = searchString.length ? questions.filter(({text}) => text.toLowerCase().includes(searchString)) : questions;

    return (
        <div className="is-flex is-align-items-start">
            <SettingsDashboard
                onSettingsChange={(updatedSettings) => setSettings(updatedSettings)}
                header={
                    <ControlsBar
                        generateTest={generateTest}
                        addQuestion={addQuestion}
                        questions={questions}
                        handleSearchInputChange={handleSearchInputChange}
                    />
                }
                footer={
                    <div>
                        <div className="field is-unselectable">
                            <input id="switchRoundedInfo" type="checkbox" name="switchRoundedInfo"
                                   className="switch is-rounded is-info" checked={debugMode}
                                   onChange={() => setDebugMode(!debugMode)}
                            />
                            <label htmlFor="switchRoundedInfo">Режим отладки</label>
                        </div>
                        {debugMode && <pre>{generated}</pre>}
                    </div>
                }
            />
            <div className="is-flex-grow-5 px-6">
                {!questions.length && <EmptyDataMessage message={'Добавьте вопросы'}/>}
                <div className="questions-container">
                    {filteredQuestions.map((question, questionIndex) => (
                        <Question key={question.id}
                                  index={questionIndex}
                                  deleteQuestion={deleteQuestion}
                                  addQuestionAnswer={addQuestionAnswer}
                                  changeQuestionType={changeQuestionType}
                                  clearQuestionAnswers={clearQuestionAnswers}
                                  changeQuestionText={changeQuestionText}
                                  duplicateQuestion={duplicateQuestion}
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
        </div>
    );
};

ReactDOM.render(<App/>, document.querySelector('#app'))

