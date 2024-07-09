import {v1} from "uuid";
import {AddTaskAC, RemoveTaskAC, tasksReducer, TasksType} from "./tasks-reducer";

describe('task reducer', () => {
    let todoListID1: string;
    let todoListID2: string;
    let initTasks: TasksType;
    let taskId1: string;
    let taskId2: string;

    beforeEach(()=>{
        todoListID1 = v1();
        todoListID2 = v1();

        taskId1 = v1();
        taskId2 = v1();

        //1.Стартовый state
        initTasks = {
            [todoListID1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'ReactJS', isDone: false},
                {id: v1(), title: 'Redux', isDone: false},
                {id: v1(), title: 'Typescript', isDone: false},
                {id: v1(), title: 'RTK query', isDone: false},
            ],
            [todoListID2]: [
                {id: taskId1, title: 'Rest API', isDone: true},
                {id: taskId2, title: 'GraphQL', isDone: false},
            ]
        }
    })

    test('correct task should be added', () => {
        const endState = tasksReducer(initTasks, AddTaskAC(todoListID1, 'New task' ) )

        expect(endState[todoListID1].length).toBe(7);
        expect(endState[todoListID1][0].title).toBe('New task')
    })

    test('correct task should be remove', () => {
        const endState = tasksReducer(initTasks, RemoveTaskAC(todoListID2, taskId1))

        expect(endState[todoListID2].length).toBe(1)
    })
})

