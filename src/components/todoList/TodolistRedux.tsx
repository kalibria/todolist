import React, {memo, useCallback, useMemo} from 'react';

import {TaskProps, TodoListProps} from "../../App";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {EditableSpan} from "../editableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
// import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx} from "../../styles/TodoList.styles";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {filterTodoListAC, removeTodoListAC, updateTodoListAC} from "../../state/todolist-reducer";
import {AddTaskAC} from "../../state/tasks-reducer";
import {Task} from "../task/task";
import {tasksSelector} from "../../state/selectors";


type TodolistProps = {
    todoList: TodoListProps
}


export const TodolistRedux = memo(({todoList}: TodolistProps) => {
    let {id, title, filter} = todoList
    let tasks = useSelector<AppRootStateType, Array<TaskProps>>(state => tasksSelector(state, id))

    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(removeTodoListAC(id))
    }

    tasks = useMemo(()=>{
        console.log("memo")
        if (filter === 'active') {
            tasks = tasks.filter((task) => !task.isDone)
        }

        if (filter === 'completed') {
            tasks = tasks.filter((task) => task.isDone)
        }
        return tasks
    },[tasks, filter])



    const addTaskHandler = useCallback((title: string) => {
        dispatch(AddTaskAC(id, title))
    },[dispatch, id])

    const changeTodoListTitleHandler = (newTitle: string) => {
        dispatch(updateTodoListAC(id, newTitle))
    }



    const onAllClickHandler = useCallback(() => dispatch(filterTodoListAC(id,'all')),[dispatch, id])
    const onActiveClickHandler = useCallback(() => dispatch(filterTodoListAC(id,'active')),[dispatch, id])
    const onCompletedClickHandler = useCallback(() => dispatch(filterTodoListAC(id,'completed')),[dispatch, id])

    return (
        <div>
            <h3><EditableSpan oldTitle={title} changeItem={changeTodoListTitleHandler}/>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTaskHandler}
            />

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : <List>
                {tasks.map(task => {

                    return <Task task={task} todolistId={id} key={task.id}/>
                })
                }
            </List>
            }

            <Box sx={filterButtonsContainerSx}>

                <Button variant={filter === "all" ? "outlined" : "contained"} onClick={onAllClickHandler}
                        color="secondary">All</Button>

                <Button variant={filter === "active" ? "outlined" : "contained"}
                        onClick={onActiveClickHandler}
                        color="info">Active</Button>

                <Button variant={filter === "completed" ? "outlined" : "contained"}
                        onClick={onCompletedClickHandler}
                        color="error">Completed</Button>
            </Box>
        </div>
    );
});

