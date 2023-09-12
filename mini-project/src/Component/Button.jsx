import React from 'react'

const Button = (props) => {
    const {children, classname, onClick, value, disabled} = props
    return (
    <button disabled={disabled} value={value} onClick={onClick} className={`h-10 w-full px-6 font-semibold rounded-md  ${classname} `} type='submit'>
        {children}
    </button>
    )
}

export default Button
