import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {OnOffIndicator} from "../src/onOffIndicator/OnOffIndicator";
import {v1, v4} from 'uuid';


export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListProps = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let tasks1 = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ]

    let [todoList, setTodoList] = useState<TodoListProps[]>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskProps[]>(tasks1)

    let [enteredTask, setEnteredTask] = useState('');

    const [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredTask(event.currentTarget.value)
    }


    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
         // setEnteredTask("");

        if(title.trim() !== ''){
            const newTask = {
                id: v4(),
                title: title.trim(),
                isDone: false,
            }
            const newTasks = [newTask, ...tasks];
            setTasks(newTasks)
        }else {
            setError('Title is required')
        }
    }

    // const [filter, setFilter] = useState<FilterValuesType>('completed');

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoList(todoList.map(tl => {
            return tl.id === todoListId ? {...tl, filter} : tl
        }))
    }

    const [onIsClick, setOnIsClick] = useState<boolean>(false);

    const changeIndicator = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.currentTarget.name === 'on') {
            setOnIsClick(true)
        } else {
            setOnIsClick(false)
        }
    }

    const changeTaskStatus = (id: string, status: boolean) =>{
        const newState  = tasks.map(task => task.id === id ? {...task, isDone: status} : task)
        setTasks(newState)

    }


    return (
        <div className="App">
            {todoList.map(t => {
                    let tasksForToDoList = tasks;

                    if (t.filter === 'active') {
                        tasksForToDoList = tasksForToDoList.filter((task) => !task.isDone)
                    }

                    if (t.filter === 'completed') {

                        tasksForToDoList = tasksForToDoList.filter((task) => task.isDone)
                    }
                    return <Todolist
                    key = {t.id}
                    title = {t.title}
                    tasks = {tasksForToDoList}
                    data = {'27.05.2024'}
                    removeTask = {removeTask}
                    changeFilter = {changeFilter}
                    addTask = {addTask}
                    enteredTask = {enteredTask}
                    onChangeInputHandler = {onChangeInputHandler}
                    changeTaskStatus = {changeTaskStatus}
                    error = {error}
                    setError = {setError}
                    filter = {t.filter}
                    todoListId = {t.id}
                    />
                }
            )}


            <OnOffIndicator onIsClick={onIsClick} handleClick={changeIndicator}/>
        </div>
    );
}

export default App;
