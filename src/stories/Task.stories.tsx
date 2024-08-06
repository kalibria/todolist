import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../components/task/task";
import {Provider} from "react-redux";
import {store} from "../state/store";
import React, {useState} from "react";
import AppRedux from "../AppRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
// @ts-ignore
const meta = {
    title: 'Todolists/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    args: {
        task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
        todolistId: 'fgdosrg8rgjuh'
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    decorators: [
        ReduxStoreProviderDecorator
    ],

} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', isDone: true},
    },
};

export const TaskToggleStory: Story = {
    render: () => {

        const [task, setTask] = useState({id: '12wsdewfijdei', title: 'JS', isDone: false})
        return <Task task={task} todolistId={'12wsdewfijdei2343' }/>
    }
}



