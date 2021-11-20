import React from "react";
import {Control, Field} from "./Common";

export const ControlsBar = ({addQuestion, generateTest, questions}) => {
    return (
        <div className="has-background-info p-5">
        <Field has-addons>
                <Control is-expanded>
                    <input className="input is-info" type="text" placeholder="Найти вопрос... любое слово или фраза"/>
                </Control>
                <Control>
                    <button className="button is-info has-background-info-dark">
                        <span>Найти</span>
                        <span className="icon"><i className="fas fa-search" aria-hidden="true"/></span>
                    </button>
                </Control>
            </Field>
            <Field>
                <Control>
                    <button className='button is-info has-background-info-dark is-fullwidth' onClick={addQuestion}>Добавить вопрос</button>
                </Control>
            </Field>
            <Field style={{gap: '1rem'}} is-grouped is-flex-wrap-wrap>
                <Control is-expanded>
                    <button className='button is-info has-background-info-dark is-fullwidth' onClick={generateTest} disabled={!questions.length}>
                        <span>Сохранить тест</span>
                        <span className="icon"><i className="fas fa-download" aria-hidden="true"/></span>
                    </button>
                </Control>
                <Control>
                    <button className='button is-inverted is-info' onClick={() => window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    })}>
                        <span>Наверх</span>
                        <span className="icon"><i className="fas fa-arrow-up" aria-hidden="true"/></span>
                    </button>
                </Control>
                <Control>
                    <button className='button is-inverted is-info' onClick={() => window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: "smooth"
                    })}>
                        <span>Вниз</span>
                        <span className="icon"><i className="fas fa-arrow-down" aria-hidden="true"/></span>
                    </button>
                </Control>
            </Field>
        </div>
    )
}