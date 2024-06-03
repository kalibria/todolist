import React, {ChangeEvent, ChangeEventHandler, useRef, useState} from 'react';
import {Button} from "../Button";

type FullInputType = {
    title: string
    onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
    addTask: (title:string) => void
}

export const FullInput = ({title, onChangeInputHandler, addTask}: FullInputType) => {
    const inputRef = useRef<HTMLInputElement>(null)

    return (
        <div>
            <input onChange={onChangeInputHandler} value={title} ref={inputRef}/>
            <Button title={'+'} onClick={() => {
                if (inputRef.current) {
                    addTask(inputRef.current.value);
                }
            }}/>
        </div>
    );
};

