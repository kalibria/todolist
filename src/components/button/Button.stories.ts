import {StoryObj, Meta} from '@storybook/react';
import {Button} from './Button'

const meta: Meta<typeof Button> = {
    title: 'My Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

};
export default meta;

type Story = StoryObj<typeof Button>;

export const Example: Story = {
    args: {
        title: "Click",
         onClick: () => {
            console.log("clicking")
         },
        disabled: false,
        className: 'active-filter'
    },
};


