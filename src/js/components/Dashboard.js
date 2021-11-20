import React, {useEffect, useState} from "react";
import {Box, CheckBox, Control, Field} from "./Common";

export const settingsDashboardFields = [
    {text: 'Можно просматривать предыдущие вопросы во время прохождения теста', label: 'Настройки', name: 'settings1'},
    {text: 'Можно поменять ответ на предыдущие вопросы', name: 'settings2'},
    {text: 'Можно пропускать вопросы', name: 'settings3'},
    {text: 'Показывать результаты ответов по окончанию теста (правильный ответ или не правильный)', name: 'settings4'},
    {text: 'Так же показывать какие ответы были правильными', name: 'settings5'},
    {text: 'Перемешивать вопросы и ответы', name: 'settings6'},
    {text: 'Сразу после ответа на вопрос показывать правильный ли был ответ', name: 'settings7'},
    {text: 'Показывать подсказки', name: 'settings8'},
]

export const SettingsDashboard = ({onSettingsChange}) => {
    /** object with n keys named by settingsDashboardFields entries name field */
    const [settings, setSettings] = useState(settingsDashboardFields.reduce((acc, {name}) => ({
        ...acc,
        [name]: false
    }), {}))

    useEffect(() => {
        onSettingsChange(settings)
    }, [settings]);


    const handleChange = (fieldName) => {
        setSettings({...settings, [fieldName]: !settings[fieldName]})
    }

    return (
        <Box style={{borderRadius: "6px 6px 0 0", border: '1px solid #dbdbdb', borderBottom: 'none'}} mb-0>
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
            {settingsDashboardFields.map(field => (
                <Field key={field.name}>
                    {field.label && <label className="label is-small">{field.label}</label>}
                    <Control>
                        <CheckBox text={field.text} checked={settings[field.name]}
                                  onChange={() => handleChange(field.name)} is-info is-small/>
                    </Control>
                </Field>
            ))}
        </Box>
    )
}