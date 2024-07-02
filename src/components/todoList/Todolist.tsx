import React, {ChangeEvent, Dispatch, useState} from 'react';

import {FilterValuesType, TasksType, TodoListProps} from "../../App";
// import {Button} from "../button/Button";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {EditableSpan} from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx, getListItemSx} from "../../styles/TodoList.styles";

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
    changeTaskTitle:(todoListId: string, taskId: string, newTitle: string) =>void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
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
                             todoList,
                             changeTaskTitle,
                             changeTodoListTitle
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

    const changeTodoListTitleHandler = (newTitle: string) => {
        changeTodoListTitle(todoListId, newTitle)
    }

    const changeTaskTitleHandler = (taskId: string, newTitle:string) => {
        changeTaskTitle(todoListId, taskId, newTitle)
    }

    return (
        <div>
            <h3> <EditableSpan oldTitle={title} changeItem={changeTodoListTitleHandler}/>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                    <DeleteIcon />
                </IconButton>
                {/*<Button title={'X'} onClick={onClickHandler}/>*/}
            </h3>
            <AddItemForm
                addItem={addTaskHandler}
            />

            {tasks[todoListId].length === 0 ? (
                <p>Тасок нет</p>
            ) : <List>
                {tasksForToDoList.map(task => {

                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
                        changeTaskStatus(id, e.currentTarget.checked, todoListId)
                    }
                    return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                        <Checkbox checked={task.isDone} onChange={e => changeTaskStatusHandler(e, task.id)}/>

                        <EditableSpan oldTitle={task.title} changeItem={(title) => changeTaskTitleHandler(task.id, title)}/>
                        <IconButton aria-label="delete" onClick={() => removeTask(task.id, todoListId)}>
                            <DeleteIcon />
                        </IconButton>

                    </ListItem>
                })
                }
            </List>
            }

            <Box sx={filterButtonsContainerSx}>

                <Button variant={filter === "all" ? "outlined" : "contained"}  onClick={() => changeFilter('all', todoListId)} color="secondary">All</Button>

                <Button variant={filter === "active" ? "outlined" : "contained"} onClick={() => changeFilter('active', todoListId)} color="info">Active</Button>

                <Button variant={filter === "completed" ? "outlined" : "contained"} onClick={() => changeFilter('completed', todoListId)} color="error">Completed</Button>

            </Box>
            <div>{data}</div>
        </div>
    );
};

