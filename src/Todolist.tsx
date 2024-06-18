import React, {ChangeEvent, Dispatch, useState} from 'react';
import {FilterValuesType, TaskProps} from "./App";
import {Button} from "./Button";
import styles from "./Todolist.module.css";
import {FullInput} from "./components/FullInput";

type TodolistProps = {
    title: string
    tasks: TaskProps[]
    data?: string
    removeTask: (taskId: string, todoList: string) => void
    changeFilter: (filterValues: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    enteredTask: string
    onChangeInputHandler: (event: ChangeEvent<HTMLInputElement>) => void
    changeTaskStatus: (taskId: string, status: boolean, todoListId: string) => void
    error: string | null
    setError: Dispatch<React.SetStateAction<string | null>>
    filter: FilterValuesType
    todoListId: string
    deleteTodoList: (todoListId:string) => void
}


export const Todolist = ({
                             title,
                             tasks,
                             data,
                             removeTask,
                             changeFilter,
                             addTask,
                             onChangeInputHandler,
                             changeTaskStatus,
                             error,
                             setError,
                             filter,
                             todoListId,
                             deleteTodoList


                         }: TodolistProps) => {
    const [taskTitle, setTaskTitle] = useState('');

    const onClickHandler = () => {
        deleteTodoList(todoListId)
    }


    // TODO
    // const allTodoListTasks = tasks[t.id];
    // console.log("allTodoListTasks", tasks)
    // console.log("t/id", tasks[t.id])
    // let tasksForToDoList = allTodoListTasks;
    //
    // if (t.filter === 'active') {
    //     tasksForToDoList = tasksForToDoList.filter((task) => !task.isDone)
    // }
    //
    // if (t.filter === 'completed') {
    //
    //     tasksForToDoList = tasksForToDoList.filter((task) => task.isDone)
    // }

    return (
        <div className={styles.card}>
            <h3>{title}
            <Button title={'X'} onClick={onClickHandler}/>
            </h3>
            <FullInput
                title={taskTitle}
                onChangeInputHandler={onChangeInputHandler}
                addTask={addTask}
                setTaskTitle={setTaskTitle}
                error={error}
                setError={setError}
                todoListId={todoListId}
            />

            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : <ul>
                {tasks.map(task => {
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
                        changeTaskStatus(id, e.currentTarget.checked, todoListId)
                    }
                    return <li key={task.id} className={task.isDone ? 'is-done' : ''}><input type="checkbox"
                                                                                             checked={task.isDone}
                                                                                             onChange={e => changeTaskStatusHandler(e, task.id)}/>
                        <span>{task.title}</span>
                        <Button title={"x"} onClick={() => removeTask(task.id, todoListId)}/>
                    </li>
                })
                }
            </ul>
            }

            <div>
                <Button title={'All'} onClick={() => changeFilter('all', todoListId)}
                        className={filter === "all" ? 'active-filter' : ''}/>
                <Button title={'Active'} onClick={() => changeFilter('active', todoListId)}
                        className={filter === "active" ? 'active-filter' : ''}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed', todoListId)}
                        className={filter === "completed" ? 'active-filter' : ''}/>
            </div>
            <div>{data}</div>
        </div>
    );
};

