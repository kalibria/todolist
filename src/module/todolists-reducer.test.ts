import {v1} from "uuid";
import {TodoListProps} from "../App";
import {todoListsReducer} from "./todolist-reducer";
import {string} from "prop-types";


test('correct todolist should be removed', ()=>{
    const todoListID1 = v1();
    const todoListID2 = v1();

    //1.Стартовый state
    const startState: TodoListProps[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ];

    //2.Действие
    const action = {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todoListID1,
        }
    } as const

    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID2);

})

test('correct todolist should be added', () => {
    const todoListID1 = v1();
    const todoListID2 = v1();

    //1.Стартовый state
    const startState: TodoListProps[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ];

    const action = {
        type: 'ADD-TODOLIST',
        payload: {
            title: 'New Todolist'
        }
    } as const

    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(action.payload.title);
} )

test ('correct todoList should change its name', () => {
    const todoListID1 = v1();
    const todoListID2 = v1();

    //1.Стартовый state
    const startState: TodoListProps[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ];

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todoListID2,
            title: 'NEW TODOLIST'
        }
    } as const

    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(action.payload.title)
})