import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {OnOffIndicator} from "../src/onOffIndicator/OnOffIndicator";
import {v1, v4} from 'uuid';
import {Todolist} from "./components/todoList/Todolist";
import {AddItemForm} from "./components/addItemForm/AddItemForm";


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

export type TasksType = {
    [key: string]: TaskProps[]
}

function App() {
    const todoListID1 = v1();
    const todoListID2 = v1();

    let [todoList, setTodoList] = useState<TodoListProps[]>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
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

    const removeTodoList = (todoListId: string) => {
        setTodoList(todoList.filter(t => t.id !== todoListId));
        delete tasks[todoListId];

    }

    const addTodoList = (title: string) => {
        const newId = v1();
        setTodoList([{
            id: newId,
            title: title,
            filter: 'all',
        }, ...todoList])
        setTasks({[newId]: [], ...tasks})
    };

const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
    setTasks({...tasks,
        [todoListId]: tasks[todoListId].map(el => el.id === taskId ? {...el, title: newTitle} : el)
    })
}

const changeTodoListTitle =(todoListId: string, newTitle: string) => {
   setTodoList(todoList.map(todoList => todoList.id === todoListId ? {...todoList, title: newTitle} : todoList))
}
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}
            />
            {todoList.map(t => {
                    return <Todolist
                        key={t.id}
                        title={t.title}
                        tasks={tasks}
                        todoList={t}
                        data={'27.05.2024'}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        enteredTask={enteredTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={t.filter}
                        todoListId={t.id}
                        deleteTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                }
            )}


            {/*<OnOffIndicator onIsClick={onIsClick} handleClick={changeIndicator}/>*/}
        </div>
    );
}

export default App;
