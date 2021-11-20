import React from "react";
import {Control, Field} from "./Common";

export const SearchBar = () => {
    return (<Field has-addons>
        <Control is-expanded>
            <input className="input" type="text" placeholder="Найти вопрос... любое слово или фраза"/>
        </Control>
        <Control>
            <button className="button is-info">
                <span>Найти</span>
                <span className="icon"><i className="fas fa-search" aria-hidden="true"/></span>
            </button>
        </Control>
    </Field>)
}
