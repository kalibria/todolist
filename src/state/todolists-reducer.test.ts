import {v1} from "uuid";
import {TodoListProps} from "../App";
import {
    addTodoListAC,
    updateTodoListAC,
    filterTodoListAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolist-reducer";

let todoListID1: string
let todoListID2: string

let startState:TodoListProps[]



beforeEach(()=>{
    todoListID1 = v1();
    todoListID2 = v1();

//1.Стартовый state
    startState = [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ];

})


test('correct todolist should be removed', ()=>{
    const endState = todoListsReducer(startState, removeTodoListAC(todoListID1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListID2);

})

test('correct todolist should be added', () => {
    const endState = todoListsReducer(startState, addTodoListAC('123','New title'));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('New title');
    expect(endState[2].id).toBe('123');
} )

test ('correct todoList should change its name', () => {
    const endState = todoListsReducer(startState, updateTodoListAC(todoListID2, 'NEW TODOLIST'))

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('NEW TODOLIST')
})

test('correct filter for todoList should be changed', ()=>{
    const endState = todoListsReducer(startState, filterTodoListAC(todoListID2, 'completed'))

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('completed')
})