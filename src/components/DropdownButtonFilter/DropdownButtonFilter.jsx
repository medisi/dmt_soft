import React, { useEffect, useRef, useState } from "react";
import './DropdownButtonFilter.css';

const DropdownButtonFilter = ({ label, children, onSelect, initialValue }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ selectedLabel, setSelectedLabel ] = useState(initialValue || label);
    const dropdownRef = useRef(null);

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
    };
    const handleItemClick = (value, text) => {
        setSelectedLabel(text);
        setIsOpen(false);
        if (onSelect) onSelect(value);
    };
    // закрытие при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, );

    return (
        <div className="dropdown_wrapper" ref={dropdownRef}>
            <button
                type="button"
                className={`dropdown_button ${isOpen ? 'active' : ''}`}
                onClick={toggleDropdown}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className="dropdown_icon">
                    <img
                        className="dropdown_icon_img"
                        src={require('../../assets/icons/filter.png')}
                        alt="🔍"
                    />
                </span>
                <span className="dropdown_label">
                    {selectedLabel}
                </span>
                <span className="dropdown_arrow">
                    <img
                        className={`dropdown_arrow_img ${isOpen ? 'open' : 'close'}`}
                        src={require('../../assets/icons/filter_arrow.png')}
                        alt={isOpen ? '▲' : '▼'}
                    />
                </span>
            </button>

            {isOpen && (
                <div className="dropdown_menu">
                    <div className="dropdown_menu_items">
                        {children({ onSelect: handleItemClick })}
                    </div>
                </div>
            )}
        </div>
    )
};
export default DropdownButtonFilter;