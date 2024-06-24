import {StoryObj, Meta} from '@storybook/react';
import {FullInput} from "./FullInput";


const meta: Meta<typeof FullInput> = {
    title: 'My Input',
    component: FullInput,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

};
export default meta;

type Story = StoryObj<typeof FullInput>;

export const Example: Story = {
    args: {
        title: 'enter value',
        onChangeInputHandler: (x) => x,
        addTask: (title: string, todoListId: string) => {},
        setTaskTitle: (x)=>x,
        error: 'error',
        setError: (x)=>x,
        todoListId: '1'
    },
};

