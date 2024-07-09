import {v1, v4} from "uuid";
import {todoListID1, todoListID2} from "./todolist-reducer";
import {FilterValuesType} from "../App";


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
        todoListId: string
        title: string
    }
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        todoListId: string,
        taskId: string
    }
}

export type UpdateTaskTitleActionType = {
    type: 'UPDATE-TASK-TITLE',
    payload: {
        todoListId: string,
        taskId: string,
        newTitle: string
    }
}

export type UpdateTaskStatusActionType = {
    type: 'UPDATE-TASK-STATUS',
    payload: {
        todoListId: string,
        taskId: string,
        status: boolean
    }
}

export type ChangeFilterActionType = {
    type: 'CHANGE-FILTER',
    payload: {
        todoListId: string,
        filterValue: FilterValuesType
    }
}

export type AddEmptyTasksForNewTodoList = {
    type: 'ADD-TASKS-FOR-NEW-TODOLIST',
    payload: {
        todoListId: string,
    }
}

type ActionType =
    | AddTaskActionType
    | RemoveTaskActionType
    | UpdateTaskStatusActionType
    | UpdateTaskTitleActionType
    | ChangeFilterActionType
    | AddEmptyTasksForNewTodoList


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
                return {
                    ...state,
                    [action.payload.todoListId]: [newTask, ...state[action.payload.todoListId]]
                }
            }
            return state
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'UPDATE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.status
                } : t)
            }
        }

        case 'UPDATE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }
        case 'ADD-TASKS-FOR-NEW-TODOLIST': {
            return {...state, [action.payload.todoListId] : []}
        }

        default:
            return state
    }
}

export const AddTaskAC = (todoListId: string, newTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: newTitle,
            todoListId: todoListId
        }
    } as const
}

export const RemoveTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todoListId: todoListId,
            taskId: taskId
        }
    } as const
}

export const UpdateTaskStatusAC = (todoListId: string, taskId: string, status: boolean) => {
    return {
        type: 'UPDATE-TASK-STATUS',
        payload: {
            todoListId: todoListId,
            taskId: taskId,
            status: status
        }
    } as const
}

export const UpdateTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASK-TITLE',
        payload: {
            todoListId: todoListId,
            taskId: taskId,
            newTitle: newTitle
        }
    } as const
}

export const AddTasksForNewTodoList = (todoListId: string) => {
    return {
        type: 'ADD-TASKS-FOR-NEW-TODOLIST',
        payload: {
            todoListId
        }
    } as const
}