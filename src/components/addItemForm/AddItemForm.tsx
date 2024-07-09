import React, {ChangeEvent, KeyboardEvent, Dispatch, useState} from 'react';

import TextField from '@mui/material/TextField';
import  IconButton  from '@mui/material/IconButton';
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from '@mui/material/Box';
import {filterButtonsContainerSx} from "../../styles/TodoList.styles";



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
        <Box sx={filterButtonsContainerSx}>
            <TextField
                id="outlined-multiline-static"
                label="Enter a title"
                multiline
                onChange={changeTaskTitleHandler}
                value={title}
                onKeyUp={addTaskOnKeyUpHandler}
                size="small"
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addTaskHandler} color={'primary'}>
                <AddBoxIcon/>
            </IconButton>
        </Box>
    );
};

