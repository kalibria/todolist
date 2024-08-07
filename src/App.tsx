import React, {useReducer, useState} from 'react';
import './App.css';
import {v1, v4} from 'uuid';
import {Todolist} from "./components/todoList/Todolist";
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {MenuButton} from "./components/button/MenuButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import {
    addTodoListAC,
    filterTodoListAC,
    removeTodoListAC,
    todoListsReducer,
    updateTodoListAC
} from "./state/todolist-reducer";
import {
    AddTaskAC,
    AddTasksForNewTodoList,
    RemoveTaskAC,
    tasksReducer,
    UpdateTaskStatusAC,
    UpdateTaskTitleAC
} from "./state/tasks-reducer";


export type TaskProps = {
    id: string
    title: string
    isDone: boolean
}

export type TasksType = {
    [key: string]: TaskProps[]
}

export type TodoListProps = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'


type ThemeMode = 'light' | 'dark';

function App() {
    const todoListID1 = v1();
    const todoListID2 = v1();

    let [todoList, dispatchTodoList] = useReducer(todoListsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        dispatchTasks(RemoveTaskAC(todoListId, taskId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchTasks(AddTaskAC(todoListId, title))
    }

    const changeFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchTodoList(filterTodoListAC(todoListId, filter))
    }


    const changeTaskStatus = (taskId: string, status: boolean, todoListId: string) => {
        dispatchTasks(UpdateTaskStatusAC(todoListId, taskId, status))
    }

    const removeTodoList = (todoListId: string) => {
        dispatchTodoList(removeTodoListAC(todoListId))
    }

    const addTodoList = (title: string) => {
        const newId = v1();
        dispatchTodoList(addTodoListAC(newId, title))
        dispatchTasks(AddTasksForNewTodoList(newId))
    };

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        dispatchTasks(UpdateTaskTitleAC(todoListId, taskId, newTitle))
    }

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatchTodoList(updateTodoListAC(todoListId, newTitle))
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'dark' : 'light',
            primary: {
                main: '#FF5733',
                // light: will be calculated from palette.primary.main,
                // dark: will be calculated from palette.primary.main,
                // contrastText: will be calculated to contrast with palette.primary.main
            },
            // secondary: {
            //     main: '#E0C2FF',
            //     light: '#F5EBFF',
            //     // dark: will be calculated from palette.secondary.main,
            //     contrastText: '#47008F',
            // },
        },
    });


    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    }
    return (

        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                News
                            </Typography>
                            <Switch onChange={changeMode}/>
                            <MenuButton color="inherit" background={'yellow'}>Login</MenuButton>
                            <MenuButton color="inherit">Logout</MenuButton>
                            <MenuButton color="inherit">Faq</MenuButton>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Container fixed>
                    <Grid container sx={{mt: '20px'}}>
                        <AddItemForm addItem={addTodoList}
                        />
                    </Grid>
                    <Grid container sx={{mt: '20px'}}>
                        {todoList.map(t => {

                                return (
                                    <Grid item sx={{mr: '30px'}}>
                                        <Paper elevation={3} sx={{p: '10px'}}>
                                            <Todolist
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
                                        </Paper>
                                    </Grid>
                                )
                            }
                        )}
                    </Grid>

                </Container>

            </ThemeProvider>
        </div>

    );
}

export default App;
