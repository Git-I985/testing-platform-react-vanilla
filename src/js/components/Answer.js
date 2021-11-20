import React from "react";
import {Control, nextInputOnPressEnterHandler} from "./Common";
import {MULTIPLE_ANSWERS_TYPE} from "../entities/common";


export const Answer = ({id, deleteAnswer, question, text, handleCorrectAnswerCheckboxChange, changeAnswerText, correct}) => {
    return (
        <div className="field is-grouped is-align-items-center my-4">
            <Control is-expanded>
                <input className={`input has-background-light ${correct ? 'is-info' : ''}`}
                       type="text"
                       onInput={({target: input}) => changeAnswerText(id, input.value)}
                       value={text}
                       onKeyDown={nextInputOnPressEnterHandler}
                       autoFocus/>
            </Control>
            <Control is-unselectable>
                <input className={`is-checkradio is-info ${correct && 'has-background-color'}`}
                       id={id}
                       type={question.type === MULTIPLE_ANSWERS_TYPE ? 'checkbox' : "radio"}
                       name={question.type === MULTIPLE_ANSWERS_TYPE ? id : question.id}
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