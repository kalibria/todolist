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


const todoListID1 = v1();
const todoListID2 = v1();

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

        default:
            return state
    }
}