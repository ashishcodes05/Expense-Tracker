import React from 'react'

const Select = ({ id, name, label, value, onChange, error, options }) => {
    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <select id={id} name={name} value={value} onChange={onChange}>
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <p className='error'>{error}</p>
        </div>
    )
}

export default Select
