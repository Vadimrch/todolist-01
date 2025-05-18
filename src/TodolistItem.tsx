import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    filter: FilterValues
    deleteTask: (taskId: string) => void
    changeFilter: (FilterValue: FilterValues) => void
    createTask: (title: string) => void
    changeTasksStatus: (taskid: string, isDone: boolean) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export const TodolistItem = ({
                                 title,
                                 tasks,
                                 filter,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTasksStatus
                             }: Props) => {
    // const title = props.title
    // const tasks = props.tasks
    // const {title:title, tasks:tasks} = props
    // const {title, tasks} = props

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)


    const createChangeFilterHandler = (filtervalue: FilterValues) => {
        return () => changeFilter(filtervalue)
    }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(taskTitle)
        } else {
            setError(true)
        }
        createTask(taskTitle)
        setTaskTitle("")
    }

    const tasksList = tasks.length
        ? <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(task.id)
                const changeTaskStatusHandler =
                    (e: ChangeEvent<HTMLInputElement>) => changeTasksStatus(task.id, e.currentTarget.checked)

                return (
                    <li
                        key={task.id}
                        className={task.isDone ? "task-done" : "task"}>

                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeTaskStatusHandler}
                        />
                        <span>{task.title}</span>
                        <Button title="x" onClickHandler={deleteTaskHandler}/>
                    </li>
                )
            })}

        </ul>
        :
        <span>Your taskslist is empty</span>
    return (

        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    className={!!error ? "error" : undefined}
                    onChange={(e) => {
                        error && setError(false)
                        if (taskTitle.length < 10) {
                        setTaskTitle(e.currentTarget.value)
                            }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && taskTitle && taskTitle.length <= 10) {
                            createTaskHandler()
                        }
                    }}
                />
                <Button
                    title="+"
                    onClickHandler={createTaskHandler}
                    disabled={!Boolean(taskTitle) || taskTitle.length > 10}
                />
                {!taskTitle && <div style={{color: "red"}}>Task title is required</div>}
                {taskTitle && taskTitle.length < 10 && <div>Title shoud be max 10 charters</div>}
                {taskTitle.length > 10 && <div style={{color: "red"}}>Title is too long</div>}
            </div>


            {tasksList}
            <div>
                <Button
                    className={filter === "all" ? "filter-btn-active" : undefined}
                    title="All"
                    onClickHandler={createChangeFilterHandler("all")}
                />
                <Button
                    className={filter === "active" ? "filter-btn-active" : undefined}
                    title="Active"
                    onClickHandler={createChangeFilterHandler("active")}
                />
                <Button
                    className={filter === "completed" ? "filter-btn-active" : undefined}
                    title="Completed"
                    onClickHandler={createChangeFilterHandler("completed")}
                />

            </div>
        </div>
    )
}