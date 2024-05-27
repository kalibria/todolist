import React from 'react';
import {TaskProps} from "./App";

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
                <button>+</button>
            </div>
            <ul>
                {tasks.map(task => {
                    debugger
                    return <li key={task.id}><input type="checkbox" checked={true}/><span>{task.title}</span></li>
                })
                }
                {/* <li><input type="checkbox" checked={true}/> <span>{tasks[0].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={true}/> <span>{tasks[1].title}</span></li>*/}
                {/*<li><input type="checkbox" checked={false}/> <span>{tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
            <div>{data}</div>
        </div>
    );
};

