import React, {ChangeEvent, KeyboardEvent, Dispatch, SetStateAction, useState} from 'react';
// import {Button} from "../button/Button";
import Button from '@mui/material/Button';



type AddItemType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem
                          }: AddItemType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
        addItem(title);
        setTitle("")
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
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
            <Button variant="contained" size="small">+</Button>
            {/*<Button title={'+'} onClick={addTaskHandler}*/}
            {/*        disabled={!!error}*/}
            {/*/>*/}
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

