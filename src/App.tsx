import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = "all" | "active" | "completed"

function App() {
    const todolistTitle = "What to buy"
    // const todolistTitle_2 = "What to learn"
    console.log(v1())


    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
    ])

    // const tasks = array[0]
    // const setTasks = array[1]

    const deleteTask = (taskid: string) => {
        const newtState: Task[] = tasks.filter(t => t.id !== taskid)
        setTasks(newtState)

    }

    const createTask = (title: string) => {
        // const newTask: Task = {
        //     id: v1(),
        //     title: title,
        //     isDone: false
        // }
        // const nextState: Task[] = [...tasks, newTask]
        // setTasks(nextState)
        setTasks([...tasks, {id: v1(), title, isDone: false}])
    }
    const changeTasksStatus = (taskid: string, isDone: boolean) => {
        const nextState: Task[] = tasks.map(t => t.id === taskid ? {...t, isDone: isDone}: t)
        setTasks(nextState)
    }

    const [filter, setFilter] = useState<FilterValues>("all")
    let filterTasks: Task[] = tasks
    if(filter === "active"){
        filterTasks = filterTasks.filter(t => t.isDone === false)
    }
    if(filter === "completed"){
        filterTasks = filterTasks.filter(t => t.isDone === true)
    }

    const changeFilter = (FilterValue: FilterValues) => {
        setFilter(FilterValue)
    }
    // const tasks2: Task[] = [
    //   { id: 1, title: 'Hello world', isDone: true },
    //   { id: 2, title: 'I am Happy', isDone: false },
    //   { id: 3, title: 'Yo', isDone: false },
    // ]
    return (
        <div className="app">
            <TodolistItem
                filter={filter}
                title={todolistTitle}
                tasks={filterTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                createTask={createTask}
                changeTasksStatus={changeTasksStatus}

            />
            {/*<TodolistItem title = {todolistTitle_2} tasks = {tasks2} />*/}
        </div>
    )
}

export default App
