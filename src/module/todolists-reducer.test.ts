import {v1} from "uuid";
import {TodoListProps} from "../App";
import {
    addTodoListAC,
    updateTodoListAC,
    filterTodoListAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolist-reducer";



test('correct todolist should be removed', ()=>{
    const todoListID1 = v1();
    const todoListID2 = v1();

    //1.Стартовый state
    const startState: TodoListProps[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, removeTodoListAC(todoListID1));

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

    // const action = {
    //     type: 'ADD-TODOLIST',
    //     payload: {
    //         title: 'New Todolist'
    //     }
    // } as const

    const endState = todoListsReducer(startState, addTodoListAC());

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(addTodoListAC().payload.title);
} )

test ('correct todoList should change its name', () => {
    const todoListID1 = v1();
    const todoListID2 = v1();

    //1.Стартовый state
    const startState: TodoListProps[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ];


    const endState = todoListsReducer(startState, updateTodoListAC(todoListID2, 'NEW TODOLIST'))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('NEW TODOLIST')
})

test('correct filter for todoList should be changed', ()=>{
    const todoListID1 = v1();
    const todoListID2 = v1();

    //1.Стартовый state
    const startState: TodoListProps[] = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todoListsReducer(startState, filterTodoListAC(todoListID2, 'completed'))

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed')
})