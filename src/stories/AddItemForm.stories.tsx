import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {AddItemForm, AddItemType} from "../components/addItemForm/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "../styles/TodoList.styles";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {action} from '@storybook/addon-actions'


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
        }
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        addItem: fn()
    }
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {};

const AddItemFormError = React.memo(({addItem}: AddItemType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>('Title is required');

    const addTaskHandler = () => {
        addItem(title);
        setTitle("")
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null);
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
});

export const AddItemFormErrorStory = {
    render: () => <AddItemFormError addItem={action('Button clicked inside form')}/>
}

