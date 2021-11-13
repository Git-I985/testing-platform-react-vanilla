import React from "react";
import {Control, nextInputOnPressEnterHandler} from "./Common";


export const Answer = ({id, deleteAnswer, question, handleCorrectAnswerCheckboxChange, changeAnswerText, correct}) => {
    return (
        <div className="field is-grouped is-align-items-center my-4">
            <Control is-expanded>
                <input className={`input has-background-light ${correct ? 'is-primary' : ''}`}
                       type="text"
                       onInput={({target: input}) => changeAnswerText(id, input.value)}
                       onKeyDown={nextInputOnPressEnterHandler}
                       autoFocus/>
            </Control>
            <Control is-unselectable>
                <input className={`is-checkradio is-primary ${correct && 'has-background-color'}`}
                       id={id}
                       type={question.type === 'multipleAnswers' ? 'checkbox' : "radio"}
                       name={question.type === 'multipleAnswers' ? id : question.id}
                       onChange={() => handleCorrectAnswerCheckboxChange(id)}
                       checked={correct}
                       tabIndex="-1"
                />
                <label htmlFor={id} className="py-0">Правильный ответ</label>
            </Control>
            <Control>
                <button className="button is-danger is-light"
                        tabIndex="-1"
                        onClick={() => deleteAnswer(id)}
                >
                    <i className="fas fa-times"/>
                </button>
            </Control>
        </div>
    )
}