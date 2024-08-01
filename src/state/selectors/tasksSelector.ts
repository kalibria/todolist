import {AppRootStateType} from "../store";
import {TasksType} from "../../AppRedux";
import {TaskProps} from "../../App";

export const tasksSelector = (state:AppRootStateType, id: string):Array<TaskProps> => state.tasks[id]