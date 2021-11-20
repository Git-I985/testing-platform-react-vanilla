import React, {useState} from "react";

/**
 * Unique IDs generation
 * @returns {string}
 */
export const ID = () => Math.random().toString(36).substr(2, 9);

/**
 * Arrow functions navigation
 */
export const nextInputOnPressEnterHandler = ({key, target}) => {
    if (!['ArrowUp', 'ArrowDown'].includes(key)) return;
    const container = target.closest('.questions-container')
    const inputs = container.querySelectorAll('input[type=text]');
    const pressedInputIndex = [...inputs].findIndex((el) => el === target)
    const nextInputIndex = {
        ArrowUp: pressedInputIndex > 0 ? pressedInputIndex - 1 : inputs.length - 1,
        ArrowDown: pressedInputIndex < inputs.length - 1 ? pressedInputIndex + 1 : 0,
    }[key];
    inputs[nextInputIndex].focus()
}

/** == Common components and wrappers == */

export const Control = ({children, ...props}) => <div
    className={["control", ...Object.keys(props)].join(' ')}>{children}</div>

export const Box = ({children, style, ...props}) => <div className={["box", ...Object.keys(props)].join(' ')} style={style}>{children}</div>

export const Field = ({children, ...props}) => <div
    className={["field", ...Object.keys(props)].join(' ')}>{children}</div>

export const EmptyDataMessage = ({message}) => <p
    className="has-text-centered has-text-grey-light my-3 is-unselectable">{message}</p>

export const CheckBox = ({text, checked, onChange, ...props}) => {
    const id = ID();
    return (
        <>
            <input className={['is-checkradio', checked ? 'has-background-color' : '', ...Object.keys(props)].join(' ')}
                   tabIndex="-1"
                   type='checkbox'
                   checked={checked}
                   onChange={onChange}
                   id={id}
            />
            <label htmlFor={id} className="py-0 is-unselectable">{text}</label>
        </>
    )
}