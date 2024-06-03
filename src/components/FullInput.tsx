import React, {ChangeEvent, Dispatch, SetStateAction} from 'react';
import {Button} from "../Button";

type FullInputType = {
    title: string
    onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
    addTask: (title: string) => void
    setTaskTitle:Dispatch<SetStateAction<string>>
}

export const FullInput = ({title, onChangeInputHandler, addTask, setTaskTitle}: FullInputType) => {
const addTTaskHandler = ( )=> {
    addTask(title)
    setTaskTitle("")
}

    return (
        <div>
            <input onChange={(event) => {setTaskTitle(event.currentTarget.value)}} value={title} onKeyUp={(event) => {
                if(event.key === 'Enter'){
                    addTTaskHandler()
            }}
            }/>
            <Button title={'+'} onClick={addTTaskHandler}/>
        </div>
    );
};

