import React from 'react';

type ButtonPropsType = {
    title: string
    onClick?: () => void
    disabled?: boolean
}

export const Button = ({ title, onClick, disabled }: ButtonPropsType) => {
    console.log("disabled", disabled);
    return <button onClick={onClick} disabled={disabled}>{title}</button>
};

