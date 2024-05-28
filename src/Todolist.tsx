import React from 'react';
import {TaskProps} from "./App";
import {Button} from "./Button";

type TodolistProps = {
    title: string
    tasks: TaskProps[]
    data?: string
}

export const Todolist = ({title, tasks, data}: TodolistProps) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : <ul>
                {tasks.map(task => {
                    return <li key={task.id}><input type="checkbox" checked={true}/>
                        <span>{task.title}</span>
                        <button>x</button>
                    </li>
                })
                }
            </ul>
            }

            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
            <div>{data}</div>
        </div>
    );
};

