import ReactDOM from "react-dom";
import React, {useState} from 'react';
import 'bulma-checkradio';

const generateTestJSONData = ({questions, answers}) => {

}

const ID = () => Math.random().toString(36).substr(2, 9);

const Answer = ({id, deleteAnswer, question, handleCorrectAnswerCheckboxChange, correct}) => {
    return (
        <div className="field is-grouped is-align-items-center my-4">
            <div className="control is-flex-grow-1">
                <input className="input" type="text" autoFocus/>
            </div>
            <div className="control">
                <button className="button is-danger is-inverted"
                        tabIndex="-1"
                        onClick={() => deleteAnswer(id)}
                >
                    <i className="fas fa-times"/>
                </button>
            </div>
            <div className="control">
                <input className="is-checkradio"
                       id={id}
                       type={question.type === 'multipleAnswers' ? 'checkbox' : "radio"}
                       name={question.type === 'multipleAnswers' ? id : question.id}
                       onChange={() => handleCorrectAnswerCheckboxChange(id)}
                       checked={correct}
                />
                <label htmlFor={id}>Правильный ответ</label>
            </div>
        </div>
    )
}

const Question = ({id, index, children, deleteQuestion, addQuestionAnswer, changeQuestionType}) => {
    const onQuestionTypeSelectChange = ({target}) => {
        changeQuestionType(id, target.options[target.selectedIndex].value)
    }

    return (
        <div className="box">
            <div className="field has-addons mb-0">
                {/* Quection index (number) */}
                <div className="control">
                    <button className="button is-static">{index + 1}</button>
                </div>
                {/* Question text */}
                <div className="control is-flex-grow-1">
                    <input className="input" type="text" placeholder="Введите вопрос" autoFocus/>
                </div>
                {/* Question type */}
                <div className="control">
                    <div className="select">
                        <select tabIndex="-1"
                                onChange={onQuestionTypeSelectChange}>
                            <option value="oneAnswer">Один ответ</option>
                            <option value="multipleAnswers">Несколько вариантов</option>
                        </select>
                    </div>
                </div>
                {/* Qusetion answers */}
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
                        <span className="icon is-small">
                          <i className="fas fa-times"/>
                        </span>
                    </button>
                </div>
            </div>
            <div>
                {
                    children ? children : <p className="has-text-centered has-text-grey-light my-3">
                        Добавьте ответы на вопрос
                    </p>
                }
            </div>
        </div>
    )
}

const Base = () => {
        const [questions, setQuestions] = useState([]);
        const [answers, setAnswers] = useState([]);

        const addQuestion = () => {
            // if (Object.keys(questions[questions.length - 1]).length) {
            // }
            setQuestions([...questions, {id: ID(), type: "oneAnswer"}])
        }

        const deleteQuestion = (questionId) => {
            setQuestions(questions.filter(question => question.id !== questionId))
        }

        const addQuestionAnswer = (questionId) => {
            setAnswers([...answers, {id: ID(), correct: false, questionId}])
        }

        const deleteAnswer = (answerId) => {
            setAnswers(answers.filter(({id}) => id !== answerId))
        }

        const changeQuestionType = (questionId, type) => {
            setQuestions(questions.map(question => ({
                ...question,
                type: question.id === questionId ? type : question.type,
            })))

            // обнуляем правильность ответов после смены типа ответа
            setAnswers(answers.map((answer) => {
                return answer.questionId === questionId ? {...answer, correct: false} : false
            }))
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

        return (
            <div className='py-6 container'>
                <button className='button is-fullwidth is-info mb-4' onClick={addQuestion}>Добавить вопрос</button>
                {questions.map((question, questionIndex) => (
                    <Question key={question.id}
                              index={questionIndex}
                              deleteQuestion={deleteQuestion}
                              addQuestionAnswer={addQuestionAnswer}
                              changeQuestionType={changeQuestionType}
                              {...question}>
                        {answers
                            .filter(({questionId}) => questionId === question.id)
                            .map((answer) => (
                                <Answer key={answer.id}
                                        deleteAnswer={deleteAnswer}
                                        question={question}
                                        handleCorrectAnswerCheckboxChange={handleCorrectAnswerCheckboxChange}
                                        {...answer}/>
                            ))}
                    </Question>
                ))}
            </div>
        );
    }
;

ReactDOM.render(
    <Base/>
    , document.querySelector('#app'))

