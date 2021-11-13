import ReactDOM from "react-dom";
import React, {useEffect, useState} from 'react';
import 'bulma-checkradio';
import '../css/bulma.custom.scss';
import {Dropdown} from "./components/dropdown";

/**
 * Навигация по текстовым инпутам стрелочными клавишами
 */
const nextInputOnPressEnterHandler = ({key, target}) => {
    if (!['ArrowUp', 'ArrowDown'].includes(key)) return;
    const container = target.closest('.questions-container')
    const inputs = container.querySelectorAll('input[type=text]');
    const pressedInputIndex = [...inputs].findIndex((el) => el === target)
    const nextInputIndex = {
        ArrowUp: pressedInputIndex > 0 ? pressedInputIndex - 1 : inputs.length - 1,
        ArrowDown: pressedInputIndex < inputs.length - 1 ? pressedInputIndex + 1 : 0,
    }[key];
    inputs[nextInputIndex].focus()
}

/**
 * Генерирует рандомный текстовый ID
 */
const ID = () => Math.random().toString(36).substr(2, 9);

const Answer = ({id, deleteAnswer, question, handleCorrectAnswerCheckboxChange, changeAnswerText, correct}) => {
    return (
        <div className="field is-grouped is-align-items-center my-4">
            <div className="control is-flex-grow-1">
                <input className={`input has-background-light ${correct ? 'is-primary' : ''}`}
                       type="text"
                       onInput={({target: input}) => changeAnswerText(id, input.value)}
                       onKeyDown={nextInputOnPressEnterHandler}
                       autoFocus/>
            </div>
            <div className="control is-unselectable">
                <input className={`is-checkradio is-primary ${correct && 'has-background-color'}`}
                       id={id}
                       type={question.type === 'multipleAnswers' ? 'checkbox' : "radio"}
                       name={question.type === 'multipleAnswers' ? id : question.id}
                       onChange={() => handleCorrectAnswerCheckboxChange(id)}
                       checked={correct}
                       tabIndex="-1"
                />
                <label htmlFor={id} className="py-0">Правильный ответ</label>
            </div>
            <div className="control">
                <button className="button is-danger is-light"
                        tabIndex="-1"
                        onClick={() => deleteAnswer(id)}
                >
                    <i className="fas fa-times"/>
                </button>
            </div>
        </div>
    )
}

const Question = (props) => {
    const {
        id,
        index,
        children,
        text,
        type,
        deleteQuestion,
        addQuestionAnswer,
        changeQuestionType,
        changeQuestionText
    } = props;

    const onQuestionTypeSelectChange = ({value}) => {
        changeQuestionType(id, value)
    }

    return (
        <div className="box">
            <div className="field is-grouped">
                {/* Question index (number) */}
                <div className="control">
                    <button className="button has-text-weight-bold is-info">{index + 1}</button>
                </div>
                {/* Question text */}
                <div className="control is-expanded">
                    <input className="input"
                           type="text"
                           placeholder="Введите вопрос"
                           value={text}
                           onInput={({target: input}) => changeQuestionText(id, input.value)}
                           onKeyDown={nextInputOnPressEnterHandler}
                           autoFocus/>
                </div>
                {/* Question type 2 */}
                <div className="control">
                    <Dropdown text={'Выберете тип ответа...'}
                              items={
                                  [
                                      {text: 'Один ответ', value: 'oneAnswer'},
                                      {text: 'Несколько вариантов', value: 'multipleAnswers'}
                                  ].map(item => ({
                                      ...item,
                                      selected: item.value === type
                                  }))
                              }
                              onChange={onQuestionTypeSelectChange}
                    />
                </div>
                {/* Question answers */}
                <div className="control">
                    <button className="button is-info"
                            onClick={() => addQuestionAnswer(id)}
                            tabIndex="-1">
                        Добавить ответ
                    </button>
                </div>
                {/* Delete question*/}
                <div className="control">
                    <button className="button is-danger"
                            tabIndex="-1"
                            title="Удалить вопрос"
                            onClick={() => deleteQuestion(id)}>
                        <span>Удалить вопрос</span>
                        <span className="icon is-small">
                          <i className="fas fa-times"/>
                        </span>
                    </button>
                </div>
            </div>
            <div>
                {!children.length &&
                <p className="has-text-centered has-text-grey-light my-3 is-unselectable">Добавьте ответы на вопрос</p>}
                {children}
            </div>
        </div>
    )
}

const Base = () => {
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

    useEffect(() => {
    })

    const addQuestion = () => setQuestions([...questions, {id: ID(), type: "oneAnswer", text: ''}])

    const addQuestionAnswer = (questionId) => setAnswers([...answers, {id: ID(), correct: false, questionId, text: ''}])

    const deleteQuestion = (questionId) => setQuestions(questions.filter(question => question.id !== questionId))

    const deleteAnswer = (answerId) => setAnswers(answers.filter(({id}) => id !== answerId))

    /**
     * Обнуляет выбранные ответы для вопроса
     */
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

    return (
        <div className='py-6 container questions-container'>
            <button className='button is-fullwidth is-info mb-4' onClick={addQuestion}>Добавить вопрос</button>
            <hr/>
            {!questions.length && <p className="has-text-centered has-text-grey-light my-3 is-unselectable">
                Добавьте вопросы
            </p>}
            {questions.map((question, questionIndex) => (
                <Question key={question.id}
                          index={questionIndex}
                          deleteQuestion={deleteQuestion}
                          addQuestionAnswer={addQuestionAnswer}
                          changeQuestionType={changeQuestionType}
                          changeQuestionText={changeQuestionText}
                          {...question}>
                    {answers
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

ReactDOM.render(<Base/>, document.querySelector('#app'))

