import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TaskProps = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let tasks1 = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: false },
        { id: 5, title: 'Typescript', isDone: false },
        { id: 6, title: 'RTK query', isDone: false },
    ]

    const [tasks, setTasks] = useState<TaskProps[]>(tasks1)


    const removeTask = (id: number) => {
        const filteredTasks =  tasks.filter((task) => task.id !== id);
        console.log(filteredTasks);
        setTasks(filteredTasks)
    }

    const [filter, setFilter] = useState<FilterValuesType>('completed');

    let tasksForToDoList = tasks1;

    if (filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter((task) => !task.isDone)
    }

    if (filter === 'completed'){

        tasksForToDoList = tasksForToDoList.filter((task) => task.isDone)
        console.log(tasksForToDoList)
    }

    const changeFilter = (filter:FilterValuesType) => {setFilter(filter)}


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksForToDoList} data={'27.05.2024'} removeTask={removeTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
