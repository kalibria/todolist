import React, {ChangeEvent, KeyboardEvent, Dispatch, SetStateAction} from 'react';
import {Button} from "../button/Button";



type FullInputType = {
    title: string
    onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
    addTask: (title: string, todoListId: string) => void
    setTaskTitle: Dispatch<SetStateAction<string>>
    error: string | null
    setError: Dispatch<SetStateAction<string | null>>
    todoListId: string
}

export const FullInput = ({
                              title, addTask, setTaskTitle,
                              error,
                              setError,
                              todoListId
                          }: FullInputType) => {


    const addTaskHandler = () => {
        addTask(title, todoListId);
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
                    disabled={!!error}
            />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

