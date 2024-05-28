import React, {ChangeEvent, useState} from 'react';
import {FullInput} from "../components/FullInput";

export const TaskAddition = () => {
    let [message, setMessage] = useState([
        {message: 'message1'},
        {message: 'message1'},
        {message: 'message1'}
    ]);

    let[title, setTitle] = useState('');
    const onChangeInputHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        setMessage([{message: title},...message ])
        setTitle('')
    }

    return (
        <div>
            <FullInput title={title} onChangeInputHandler={onChangeInputHandler} onClickButtonHandler={onClickButtonHandler}/>
            {message.map((m, index) => {
                return (<div key={index}>{m.message}</div>)
            })
            }

        </div>
    );
};

