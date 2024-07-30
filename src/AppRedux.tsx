import React, {useCallback, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {AddItemForm} from "./components/addItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
} from "./state/todolist-reducer";
import {
    AddTasksForNewTodoList,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistRedux} from "./components/todoList/TodolistRedux";


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

function AppRedux() {
    let todoList = useSelector<AppRootStateType, Array<TodoListProps>>(state => state.todoLists)

    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        const newId = v1();
        dispatch(addTodoListAC(newId, title))
        dispatch(AddTasksForNewTodoList(newId))
    },[dispatch]);


    const [themeMode, setThemeMode] = useState<ThemeMode>('light');

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'dark' : 'light',
            primary: {
                main: '#FF5733',
            },
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
                                    <Grid item sx={{mr: '30px'}} key={t.id}>
                                        <Paper elevation={3} sx={{p: '10px'}}>
                                            <TodolistRedux
                                                todoList={t}
                                                 // data={'27.05.2024'}
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

export default AppRedux;
