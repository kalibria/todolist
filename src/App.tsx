import React, {ChangeEvent, useState} from 'react';
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
    const todoListID1 = v1();
    const todoListID2 = v1();


    let [todoList, setTodoList] = useState<TodoListProps[]>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState({
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
    })

    let [enteredTask, setEnteredTask] = useState('');

    const [error, setError] = useState<string | null>(null);

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEnteredTask(event.currentTarget.value)
    }


    const removeTask = (taskId: string, todoListId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
        }
        setTasks(newTodolistTasks)
    }

    const addTask = (title: string, todoListId: string) => {
        if (title.trim() !== '') {
            const newTask = {
                id: v4(),
                title: title.trim(),
                isDone: false,
            }
            setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        } else {
            setError('Title is required')
        }
    }

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoList(todoList.map(tl => {
            return tl.id === todoListId ? {...tl, filter} : tl
        }))
    }

    // const [onIsClick, setOnIsClick] = useState<boolean>(false);
    //
    // const changeIndicator = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     if (event.currentTarget.name === 'on') {
    //         setOnIsClick(true)
    //     } else {
    //         setOnIsClick(false)
    //     }
    // }

    const changeTaskStatus = (taskId: string, status: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: status} : t)
        })
    }

    const deleteTodoList = (todoListId: string) => {
        setTodoList(todoList.filter(t => t.id !== todoListId))
    }


    return (
        <div className="App">
            {todoList.map(t => {
                    let tasksForToDoList = tasks[t.id];

                    if (t.filter === 'active') {
                        tasksForToDoList = tasks[t.id].filter((task) => !task.isDone)
                    }

                    if (t.filter === 'completed') {
                        tasksForToDoList = tasks[t.id].filter((task) => task.isDone)
                    }

                    return <Todolist
                        key={t.id}
                        title={t.title}
                        tasks={tasksForToDoList}
                        data={'27.05.2024'}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        enteredTask={enteredTask}
                        onChangeInputHandler={onChangeInputHandler}
                        changeTaskStatus={changeTaskStatus}
                        error={error}
                        setError={setError}
                        filter={t.filter}
                        todoListId={t.id}
                        deleteTodoList={deleteTodoList}
                    />
                }
            )}


            {/*<OnOffIndicator onIsClick={onIsClick} handleClick={changeIndicator}/>*/}
        </div>
    );
}

export default App;
