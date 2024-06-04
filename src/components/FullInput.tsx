import React, {ChangeEvent, ChangeEventHandler, Dispatch, SetStateAction} from 'react';
import {Button} from "../Button";

type FullInputType = {
    title: string
    onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
    addTask: (title: string) => void
    setTaskTitle:Dispatch<SetStateAction<string>>
}

export const FullInput = ({title, onChangeInputHandler, addTask, setTaskTitle}: FullInputType) => {
const addTaskHandler = ( )=> {
    addTask(title)
    setTaskTitle("")
}

    const changeTaskTitleHandler = (event:  ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: any) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    console.log("title", title)
    console.log("BoleanTitle", Boolean(title))

    return (
        <div>
            <input onChange={changeTaskTitleHandler} value={title} onKeyUp={addTaskOnKeyUpHandler}/>
            <Button title={'+'} onClick={addTaskHandler} disabled={!Boolean(title.trim())}/>
        </div>
    );
};

