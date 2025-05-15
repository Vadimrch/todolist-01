import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {useState} from "react";

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
export const TodolistItem = ({
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask
                             }: Props) => {
    // const title = props.title
    // const tasks = props.tasks
    // const {title:title, tasks:tasks} = props
    // const {title, tasks} = props

    const [taskTitle, setTaskTitle] = useState("")

    const createChangeFilterHandler = (filtervalue: FilterValues) => {
        return () => changeFilter(filtervalue)
    }

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle("")
    }

    const tasksList = tasks.length
        ? <ul>
            {tasks.map(task => {

                return (
                    <li>
                        <input type="checkbox" checked={task.isDone}/> <span>{task.title}</span>
                        <Button title="x" onClickHandler={() => deleteTask(task.id)}/>
                    </li>
                )
            })}

        </ul>
        : <span>Your taskslist is empty</span>
    return (

        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={(e) => {
                        setTaskTitle(e.currentTarget.value)
                    }}
                    onKeyDown={(e)=>{
                    if (e.key === "Enter" && taskTitle && taskTitle.length <=10) {
                        createTaskHandler()
                    }
                    }}
                />
                <Button title="+"
                        onClickHandler={createTaskHandler}
                disabled={!Boolean(taskTitle) || taskTitle.length > 10}
                />
                {!taskTitle && <div>Task title is required</div>}
                {taskTitle && taskTitle.length < 10 && <div>Title shoud be max 10 charters</div>}
                {taskTitle.length > 10 && <div style={{color: "red"}}>Title is too long</div>}
            </div>


                {tasksList}
                <div>
                    <Button title="All" onClickHandler={createChangeFilterHandler("all")}/>
                    <Button title="Active" onClickHandler={createChangeFilterHandler("active")}/>
                    <Button title="Completed" onClickHandler={createChangeFilterHandler("completed")}/>

                </div>
            </div>
            )
            }