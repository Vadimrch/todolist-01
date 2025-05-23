import {Button} from "./Button.tsx";
import {FilterValues} from "./App.tsx";
import {ChangeEvent, useState} from "react";

type Props = {
    todolistId: string
    title: string
    tasks: Task[]
    filter: FilterValues
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (FilterValue: FilterValues, todolistId: string) => void
    createTask: (title: string, todolistId: string) => void
    changeTasksStatus: (taskid: string, isDone: boolean, todolistId: string) => void
    deleteTodolist: (todolistId: string) => void
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}
export const TodolistItem = ({
       todolistId,
       title,
        tasks,
        filter,
        deleteTask,
        changeFilter,
        createTask,
        changeTasksStatus,
        deleteTodolist
 }: Props) => {

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)


    const createChangeFilterHandler = (filtervalue: FilterValues) => {
        return () => changeFilter(filtervalue, todolistId)
    }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createTask(taskTitle, todolistId)
        } else {
            setError(true)
        }
        createTask(taskTitle, todolistId)
        setTaskTitle("")
    }

    const deleteTodolistHandler = () => deleteTodolist(todolistId)

    const tasksList = tasks.length
        ? <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(task.id, todolistId)
                const changeTaskStatusHandler =
                    (e: ChangeEvent<HTMLInputElement>) => changeTasksStatus(task.id, e.currentTarget.checked, todolistId)

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
            <h3>
                {title}
                <Button title="x" onClickHandler={deleteTodolistHandler} />
            </h3>
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