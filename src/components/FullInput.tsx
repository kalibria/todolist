import React, {ChangeEvent, KeyboardEvent, Dispatch, SetStateAction, useState} from 'react';
import {Button} from "../Button";

type FullInputType = {
    title: string
    onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
    addTask: (title: string) => void
    setTaskTitle: Dispatch<SetStateAction<string>>
    error: string | null
    setError: Dispatch<SetStateAction<string | null>>
}

export const FullInput = ({
                              title, addTask, setTaskTitle,
                              error,
    setError
                          }: FullInputType) => {


    const addTaskHandler = () => {
        addTask(title);
        setTaskTitle("")
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }


    return (
        <div>

            <input onChange={changeTaskTitleHandler} value={title} onKeyUp={addTaskOnKeyUpHandler}
                   className={error ? 'error' : ''}/>
            <Button title={'+'} onClick={addTaskHandler}
                disabled={error ? true : false}
            />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

