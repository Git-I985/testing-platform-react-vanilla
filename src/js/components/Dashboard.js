import React from "react";
import {Box, CheckBox, Control, Field} from "./Common";

{/*
                        Можно просматривать предыдущие вопросы во время прохождения теста
                        Можно поменять ответ на предыдущие вопросы
                        Можно пропускать вопросы
                        Показывать результаты ответов по окончанию теста (правильный ответ или не правильный)
                            - Так же показывать какие ответы были правильными
                        Установить время на прохождение теста
                    */}
export const Dasboard = () => {
    return (
        <Box style={{'border-radius': "6px 6px 0 0"}} mb-0>
            <Field>
                <label className="label">Название</label>
                <Control>

                    <input className="input" type="text"/>
                </Control>
            </Field>
            <Field>
                <label className="label is-small">Описание</label>
                <Control>
                    <textarea className="textarea has-fixed-size is-small"/>
                </Control>
            </Field>
            <Field>
                <label className="label is-small">Настройки</label>
                <Control>
                    <CheckBox
                        text={'Можно просматривать предыдущие вопросы во время прохождения теста'}
                        is-info
                        is-small
                    />
                </Control>
            </Field>
            <Field>
                <Control>
                    <CheckBox
                        text={'Можно поменять ответ на предыдущие вопросы'}
                        is-info
                        is-small
                    />
                </Control>
            </Field>
            <Field>
                <Control>
                    <CheckBox
                        text={'Можно пропускать вопросы'}
                        is-info
                        is-small
                    />
                </Control>
            </Field>
            <Field>
                <Control>
                    <CheckBox
                        text={'Показывать результаты ответов по окончанию теста (правильный ответ или не правильный)'}
                        is-info
                        is-small
                    />
                </Control>
            </Field>
            <Field>
                <Control>
                    <CheckBox
                        text={'Так же показывать какие ответы были правильными'}
                        is-info
                        is-small
                    />
                </Control>
            </Field>
        </Box>
    )
}