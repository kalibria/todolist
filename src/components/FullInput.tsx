import React, {ChangeEvent, ChangeEventHandler, useState} from 'react';
import {Button} from "../Button";

type FullInputType = {
    title: string
    onChangeInputHandler: (event:ChangeEvent<HTMLInputElement>) => void
    onClickButtonHandler: () => void
}

export const FullInput = ({title, onChangeInputHandler, onClickButtonHandler}: FullInputType) => {

    return (
        <div>
            <input onChange={onChangeInputHandler} value={title}/>
            <Button title={'+'} onClick={onClickButtonHandler}/>
        </div>
    );
};

