import {getListItemSx} from "../../styles/TodoList.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import {RemoveTaskAC, UpdateTaskStatusAC, UpdateTaskTitleAC} from "../../state/tasks-reducer";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import React, {ChangeEvent, memo, useCallback} from "react";
import {TaskProps} from "../../AppRedux";
import {useDispatch} from "react-redux";

type TaskPropsType = {
    task: TaskProps,
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) =>{
    const dispatch = useDispatch();
    const changeTaskTitleHandler = useCallback((taskId: string, newTitle: string) => {
        dispatch(UpdateTaskTitleAC(todolistId,taskId, newTitle))
    },[dispatch,todolistId]);
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, taskId: string) => {
        dispatch(UpdateTaskStatusAC(todolistId, taskId,e.currentTarget.checked))
    }
    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <Checkbox checked={task.isDone} onChange={e => changeTaskStatusHandler(e, task.id)}/>

            <EditableSpan oldTitle={task.title}
                          changeItem={(title) => changeTaskTitleHandler(task.id, title)}/>
            <IconButton aria-label="delete" onClick={() => dispatch(RemoveTaskAC(todolistId, task.id))}
            >
                <DeleteIcon/>
            </IconButton>

        </ListItem>
    )
})