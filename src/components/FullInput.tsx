import React, {ChangeEvent, KeyboardEvent, Dispatch, SetStateAction} from 'react';
import {Button} from "../Button";

type FullInputType = {
    title: string
    onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
    addTask: (title: string) => void
    setTaskTitle:Dispatch<SetStateAction<string>>
}

export const FullInput = ({title, addTask, setTaskTitle}: FullInputType) => {
const addTaskHandler = ( )=> {
    addTask(title)
    setTaskTitle("")
}

    const changeTaskTitleHandler = (event:  ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }


    return (
        <div>
            <input onChange={changeTaskTitleHandler} value={title} onKeyUp={addTaskOnKeyUpHandler}/>
            <Button title={'+'} onClick={addTaskHandler} disabled={!Boolean(title.trim())}/>
        </div>
    );
};

