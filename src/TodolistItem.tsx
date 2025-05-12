import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {useRef} from "react";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (FilterValue: FilterValues) => void
    createTask: (title: string) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export const TodolistItem = ({title, tasks, deleteTask, changeFilter, createTask}: Props) => {
    // const title = props.title
    // const tasks = props.tasks
    // const {title:title, tasks:tasks} = props
    // const {title, tasks} = props

    const taskTitleInput = useRef<HTMLInputElement>(null)

    const createChangeFilterHandker = (filtervalue: FilterValues) => {
        return () => changeFilter(filtervalue)
    }

    const createTaskHandler = () => {
        if(taskTitleInput.current){
            createTask(taskTitleInput.current.value)
            taskTitleInput.current.value = ""
        }
    }

    const tasksList = tasks.length
    ? <ul>
            {tasks.map (task =>{

                return (
                    <li>
                        <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        <Button title= "x" onClickHandler={() => deleteTask(task.id)}/>
                    </li>
                )
            })}

        </ul>
        : <span>Your taskslist is empty</span>
    return (

        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title = "+" onClickHandler={createTaskHandler}/>
            </div>
            {tasksList}
            <div>
                <Button title = "All" onClickHandler={createChangeFilterHandker("all")}/>
                <Button title = "Active" onClickHandler={createChangeFilterHandker("active")}/>
                <Button title = "Completed" onClickHandler={createChangeFilterHandker("completed")}/>

            </div>
        </div>
    )
}