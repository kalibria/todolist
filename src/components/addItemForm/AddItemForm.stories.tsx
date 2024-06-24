import {StoryObj, Meta} from '@storybook/react';
import {AddItemForm} from "./AddItemForm";


const meta: Meta<typeof AddItemForm> = {
    title: 'My Input',
    component: AddItemForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

};
export default meta;

type Story = StoryObj<typeof AddItemForm>;

export const Example: Story = {
    args: {
        addItem: (title: string) => {},
    },
};

