import React from "react";

import {Dropdown} from "./Dropdown";
import {Box, Control, EmptyDataMessage, Field, nextInputOnPressEnterHandler} from "./Common";

export const Question = (props) => {
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
        <Box>
            <Field is-grouped>

                {/* Question index (number) */}
                <Control>
                    <button className="button has-text-weight-bold is-info">{index + 1}</button>
                </Control>

                {/* Question text */}
                <Control is-expanded>
                    <input className="input"
                           type="text"
                           placeholder="Введите вопрос"
                           value={text}
                           onInput={({target: input}) => changeQuestionText(id, input.value)}
                           onKeyDown={nextInputOnPressEnterHandler}
                           autoFocus/>
                </Control>

                {/* Question type (dropdown version) */}
                <Control>
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
                </Control>

                {/* Question add answer button */}
                <Control>
                    <button className="button is-info"
                            onClick={() => addQuestionAnswer(id)}
                            tabIndex="-1">
                        Добавить ответ
                    </button>
                </Control>

                {/* Delete question button */}
                <Control>
                    <button className="button is-danger"
                            tabIndex="-1"
                            title="Удалить вопрос"
                            onClick={() => deleteQuestion(id)}>
                        <span>Удалить вопрос</span>
                        <span className="icon is-small">
                          <i className="fas fa-times"/>
                        </span>
                    </button>
                </Control>
            </Field>

            {/* Question answers list */}
            <div>
                {!children.length && <EmptyDataMessage message={'Добавьте ответы на вопрос'}/>}
                {children}
            </div>
        </Box>
    )
}