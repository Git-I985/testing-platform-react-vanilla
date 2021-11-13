import React, {useState} from "react";

export const DropdownItem = ({value, text, onClick, active}) => {
    return (
        <a href="#"
           className={`dropdown-item ${active ? 'is-active' : ''}`}
           onClick={() => onClick(value)}>
            {text}
        </a>
    );
}

export const Dropdown = ({text, items = [], onChange}) => {
    const [active, setActive] = useState(false)
    const [selected, setSelected] = useState('')

    const onSelectedChange = (newValue) => {
        setSelected(newValue)
        onChange(newValue)
    }

    return (
        <div className={`dropdown ${active ? 'is-active' : ''}`}
             onClick={() => setActive(!active)}
             onBlur={
                 // Закрывать дропдаун при потере фокуса
                 ({currentTarget, relatedTarget}) =>
                     !currentTarget.contains(relatedTarget) && setActive(false)
             }
        >

            <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>{text}</span>
                    <span className="icon is-small"> <i className="fas fa-angle-down" aria-hidden="true"/></span>
                </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {
                        items.map((item, index) =>
                            <DropdownItem
                                value={item.value}
                                text={item.text}
                                active={item.value === selected}
                                onClick={onSelectedChange}
                                key={index}
                            />)
                    }
                </div>
            </div>
        </div>
    )
}