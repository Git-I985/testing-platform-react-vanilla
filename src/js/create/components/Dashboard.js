import React, {useEffect, useMemo, useState} from "react";
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

const getSettingsObject = () => {
    return settingsDashboardFields.reduce((acc, {name}) => ({...acc, [name]: false}), {})
}

export const SettingsDashboard = ({onSettingsChange, header, footer}) => {
    const otherSettings = {test: {name: '', description: ''}};
    const settingsObject = useMemo(getSettingsObject, []);
    const [settings, setSettings] = useState({...otherSettings, ...settingsObject})

    const [opened, setOpened] = useState(false)

    useEffect(() => {
        onSettingsChange(settings)
    }, [settings]);

    const handleChange = (fieldName) => {
        setSettings({...settings, [fieldName]: !settings[fieldName]})
    }

    return (
        <Box style={{...opened && {left: 0}}} dashboard is-flex>
            <div className="dashboard-content">
                {header}
                <div className="p-5">
                    {/* Test title field */}
                    <Field>
                        <label className="label has-text-info">Название</label>
                        <Control>
                            <input className="input is-info"
                                   type="text"
                                   value={settings.test.name}
                                   onChange={({target: {value: name}}) => {
                                       setSettings({...settings, test: {...settings.test, name}})
                                   }}
                            />
                        </Control>
                    </Field>
                    {/* Test description field */}
                    <Field>
                        <label className="label is-small has-text-info">Описание</label>
                        <Control>
                            <textarea className="textarea has-fixed-size is-small is-info"
                                      value={settings.test.description}
                                      onChange={({target: {value: description}}) => {
                                          setSettings({...settings, test: {...settings.test, description}})
                                      }}
                            />
                        </Control>
                    </Field>
                    {/* Test settings checkboxes */}
                    {settingsDashboardFields.map(field => (
                        <Field key={field.name}>
                            {field.label && <label className="label is-small has-text-info">{field.label}</label>}
                            <Control>
                                <CheckBox text={field.text} checked={settings[field.name]}
                                          onChange={() => handleChange(field.name)} is-info is-small/>
                            </Control>
                        </Field>
                    ))}
                    {footer}
                </div>
            </div>
            {/* Toggle button */}
            <div className="dashboard-toggler-container is-align-items-center is-justify-content-center is-clickable"
                 onClick={() => setOpened(!opened)}>
                <span className="icon has-text-grey-light">
                    <i className="fas fa-chevron-right" style={{transform: opened ? 'rotate(180deg)' : 'none'}}/>
                </span>
            </div>
        </Box>
    )
}