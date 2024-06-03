import React from 'react';
import {FilterValuesType, TaskProps} from "./App";
import {Button} from "./Button";
import styles from "./Todolist.module.css";
import {TaskAddition} from "./taskAddition/TaskAddition";

type TodolistProps = {
    title: string
    tasks: TaskProps[]
    data?: string
    removeTask:(id: string) => void
    changeFilter: (filterValues: FilterValuesType) => void
    addTask: () => void
}

export const Todolist = ({title, tasks, data, removeTask, changeFilter, addTask}: TodolistProps) => {
    return (
        <div className={styles.card}>
            <h3>{title}</h3>
            <TaskAddition addTask={addTask}/>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : <ul>
                {tasks.map(task => {
                    return <li key={task.id}><input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button title={"x"} onClick={() => removeTask(task.id)}/>
                    </li>
                })
                }
            </ul>
            }

            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
            <div>{data}</div>
        </div>
    );
};

