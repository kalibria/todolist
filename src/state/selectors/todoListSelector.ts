import {AppRootStateType} from "../store";
import {TodoListProps} from "../../AppRedux";

export const todolistSelector = (state:AppRootStateType):Array<TodoListProps> => state.todoLists