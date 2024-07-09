import {v1, v4} from "uuid";
import {todoListID1, todoListID2} from "./todolist-reducer";


export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskProps[]
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    payload: {
        title: string
        todoListId: string
    }
}

type ActionType =
| AddTaskActionType


const initTasks: TasksType = {
    [todoListID1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ],
    [todoListID2]: [
        {id: v1(), title: 'Rest API', isDone: true},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]
}

export const tasksReducer = (state: TasksType = initTasks, action: ActionType): TasksType => {
    switch (action.type) {
        case 'ADD-TASK': {
            if (action.payload.title.trim() !== '') {
                const newTask = {
                    id: v4(),
                    title: action.payload.title.trim(),
                    isDone: false,
                }
                return {...state,
                    [action.payload.todoListId] : [newTask, ...state[action.payload.todoListId]]}
            }
            return state
        }
        default:
            return state
    }
}

export const AddTaskAC = (todoListId: string, newTitle: string ) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: newTitle,
            todoListId: todoListId
        }
    }as const
}