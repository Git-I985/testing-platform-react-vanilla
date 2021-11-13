import React from "react";
import {Box, CheckBox, Control, Field} from "./Common";

export const Dasboard = () => {
    return (
        <Box>
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