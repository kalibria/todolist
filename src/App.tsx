import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {OnOffIndicator} from "../src/onOffIndicator/OnOffIndicator";
import {v1, v4} from 'uuid';


export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let tasks1 = [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'Typescript', isDone: false },
        { id: v1(), title: 'RTK query', isDone: false },
    ]

    const [tasks, setTasks] = useState<TaskProps[]>(tasks1)


    const removeTask = (id: string) => {
        const filteredTasks =  tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks)
    }

    const addTask = () => {
        console.log("hello")
        const newTask = {
            id: v4(),
            title: 'new task',
            isDone: false,
        }
        console.log("newTask", newTask)
        const newTasks = [newTask, ...tasks1];
        console.log("newTasks", newTasks)
        setTasks(newTasks)
    }

    const [filter, setFilter] = useState<FilterValuesType>('completed');

    let tasksForToDoList = tasks1;

    if (filter === 'active') {
        tasksForToDoList = tasksForToDoList.filter((task) => !task.isDone)
    }

    if (filter === 'completed'){

        tasksForToDoList = tasksForToDoList.filter((task) => task.isDone)
    }

    const changeFilter = (filter:FilterValuesType) => {setFilter(filter)}

    const [onIsClick, setOnIsClick] = useState<boolean>(false);

    const changeIndicator = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(event.currentTarget.name === 'on'){
            setOnIsClick(true)
        }else {
            setOnIsClick(false)
        }
    }



    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks} data={'27.05.2024'} removeTask={removeTask} changeFilter={changeFilter} addTask ={addTask}/>

            <OnOffIndicator onIsClick={onIsClick} handleClick={changeIndicator}/>
        </div>
    );
}

export default App;
