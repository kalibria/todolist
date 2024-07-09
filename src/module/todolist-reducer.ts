import {FilterValuesType, TodoListProps} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todoListID1 = v1();
export const todoListID2 = v1();

const initialState: TodoListProps[] = [
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'},
];

export const todoListsReducer = (state: TodoListProps[] = initialState, action: ActionsType): TodoListProps[] => {
    switch (action.type) {
        case'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newId = v1();
            const newTodoList: TodoListProps = {
                id: newId,
                title: action.payload.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(s => {
                return s.id === action.payload.id ? {...s, title: action.payload.title} : s
            })
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(s => s.id === action.payload.id ? {...s, filter: action.payload.filter} : s)
        }

        default:
            return state
    }
}

export const removeTodoListAC = (todoListID1:string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todoListID1,
        }
    } as const

}

export const addTodoListAC = () => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todolist'
        }
    } as const
}

export const updateTodoListAC = (todoListID:string, newTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todoListID,
            title: newTitle
        }
    } as const
}

export const filterTodoListAC = (todoListID:string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todoListID,
            filter: filter,
        }
    } as const

}