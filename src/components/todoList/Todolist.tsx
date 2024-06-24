import React, {ChangeEvent, Dispatch, useState} from 'react';
import styles from "./Todolist.module.css";
import {FilterValuesType, TasksType, TodoListProps} from "../../App";
import {Button} from "../button/Button";
import {AddItemForm} from "../addItemForm/AddItemForm";





type TodolistProps = {
    title: string
    tasks: TasksType
    data?: string
    removeTask: (taskId: string, todoList: string) => void
    changeFilter: (filterValues: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    enteredTask: string
    changeTaskStatus: (taskId: string, status: boolean, todoListId: string) => void
    filter: FilterValuesType
    todoListId: string
    deleteTodoList: (todoListId: string) => void
    todoList: TodoListProps
}


export const Todolist = ({
                             title,
                             tasks,
                             data,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             filter,
                             todoListId,
                             deleteTodoList,
                             todoList
                         }: TodolistProps) => {


    const onClickHandler = () => {
        deleteTodoList(todoListId)
    }

    let tasksForToDoList = tasks[todoListId];

    if (todoList.filter === 'active') {
        tasksForToDoList = tasks[todoListId].filter((task) => !task.isDone)
    }

    if (todoList.filter === 'completed') {
        tasksForToDoList = tasks[todoListId].filter((task) => task.isDone)
    }

    const addTaskHandler = (title: string) => {
        addTask(title, todoListId)
    }

    return (
        <div className={styles.card}>
            <h3>{title}
                <Button title={'X'} onClick={onClickHandler}/>
            </h3>
            <AddItemForm
                addItem={addTaskHandler}
            />

            {tasks[todoListId].length === 0 ? (
                <p>Тасок нет</p>
            ) : <ul>
                {tasksForToDoList.map(task => {
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
                        changeTaskStatus(id, e.currentTarget.checked, todoListId)
                    }
                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}><input type="checkbox"
                                                                                             checked={task.isDone}
                                                                                             onChange={e => changeTaskStatusHandler(e, task.id)}/>
                        <span>{task.title}</span>
                        <Button title={"x"} onClick={() => removeTask(task.id, todoListId)}/>
                    </li>
                })
                }
            </ul>
            }

            <div>
                <Button title={'All'} onClick={() => changeFilter('all', todoListId)}
                        className={filter === "all" ? 'active-filter' : ''}/>
                <Button title={'Active'} onClick={() => changeFilter('active', todoListId)}
                        className={filter === "active" ? 'active-filter' : ''}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed', todoListId)}
                        className={filter === "completed" ? 'active-filter' : ''}/>
            </div>
            <div>{data}</div>
        </div>
    );
};

