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
import {EditableSpan} from "../components/editableSpan/EditableSpan";
import AppRedux from "../AppRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    decorators: [
        ReduxStoreProviderDecorator
    ],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        oldTitle: 'JS',
        changeItem: fn()
    }
} satisfies Meta<typeof EditableSpan>;

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EditableSpanStory: Story = {

};



