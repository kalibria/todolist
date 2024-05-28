import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TaskProps = {
    id: number
    title: string
    isDone: boolean
}

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
        const filteredTasks =  tasks1.filter((task) => task.id !== id);
        console.log(filteredTasks);
        setTasks(filteredTasks)
    }

    // const tasks2 = [
    //     { id: 1, title: 'Hello world', isDone: true },
    //     { id: 2, title: 'I am Happy', isDone: false },
    //     { id: 3, title: 'Yo', isDone: false },
    // ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks} data={'27.05.2024'} removeTask={removeTask}/>
            {/*<Todolist title={'Songs'} tasks={tasks2}/>*/}

        </div>
    );
}

export default App;
