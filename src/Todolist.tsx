import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskProps} from "./App";
import {Button} from "./Button";
import styles from "./Todolist.module.css";
import {FullInput} from "./components/FullInput";

type TodolistProps = {
    title: string
    tasks: TaskProps[]
    data?: string
    removeTask: (id: string) => void
    changeFilter: (filterValues: FilterValuesType) => void
    addTask: (title: string) => void
    enteredTask: string
    onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
    changeTaskStatus: (id: string, status: boolean) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             data,
                             removeTask,
                             changeFilter,
                             addTask,
                             onChangeInputHandler,
                             changeTaskStatus
                         }: TodolistProps) => {
    const [taskTitle, setTaskTitle] = useState('')



    return (
        <div className={styles.card}>
            <h3>{title}</h3>
            <FullInput title={taskTitle} onChangeInputHandler={onChangeInputHandler} addTask={addTask}
                       setTaskTitle={setTaskTitle}/>

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : <ul>
                {tasks.map(task => {
                    const changeTaskStatusHandler =(e: ChangeEvent<HTMLInputElement>, id: string) =>{
                        changeTaskStatus(id, e.currentTarget.checked)
                    }
                    return <li key={task.id}><input type="checkbox" checked={task.isDone} onChange={e => changeTaskStatusHandler(e, task.id)}/>
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

