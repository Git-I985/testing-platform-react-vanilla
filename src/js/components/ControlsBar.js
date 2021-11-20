import React from "react";
import {Control, Field} from "./Common";

export const ControlsBar = ({addQuestion, generateTest, questions}) => {
    return (
        <Field is-grouped>
            <Control is-expanded>
                <button className='button is-info is-fullwidth' onClick={addQuestion}>Добавить вопрос</button>
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
            <Control>
                <button className='button is-primary' onClick={generateTest} disabled={!questions.length}>
                    <span>Сохранить тест</span>
                    <span className="icon"><i className="fas fa-download" aria-hidden="true"/></span>
                </button>
            </Control>
        </Field>
    )
}