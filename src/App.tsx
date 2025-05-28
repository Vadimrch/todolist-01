import './App.css'
import {Task, TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterValues = "all" | "active" | "completed"
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
type TasksState = {
    [todolistId: string]: Task[]
}

function App() {
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistId_1, title: "What to learn", filter: "all"},
        {id: todolistId_2, title: "What to buy", filter: "all"},

    ])

    const [tasks, setTasks] = useState<TasksState>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'BEER', isDone: true},
            {id: v1(), title: 'CHEEPS', isDone: true},
            {id: v1(), title: 'DRIED FISH', isDone: false},
        ]
    })


    const deleteTask = (taskid: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskid)})
    }

    const createTask = (title: string, todolistId: string) => {
        const newTask: Task = {
            id: v1(),
            title: title,
            isDone: false
        }
        // const nextState: Task[] = [...tasks, newTask]
        // setTasks(nextState)
        setTasks({...tasks,
            [todolistId]: [...tasks[todolistId], newTask]})
    }
    const changeTasksStatus = (taskid: string, newIsDoneValue: boolean, todolistId: string) => {
        setTasks({...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskid ? {...t, isDone: newIsDoneValue} : t)})
    }

    const changeFilter = (filterValue: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    // create todolist


    // update todolist



    const getFilteredTasks = (tasks: Task[], filterValue: FilterValues) => {

        let filteredTasks: Task[] = tasks
        if (filterValue === "active") {
            filteredTasks = filteredTasks.filter(t => t.isDone === false)
        }
        if (filterValue === "completed") {
            filteredTasks = filteredTasks.filter(t => t.isDone === true)
        }
        return filteredTasks
    }

    const todolistComponents = todolists.map(tl => {
    return (
        <TodolistItem
            key={tl.id}
            todolistId={tl.id}
            filter={tl.filter}
            title={tl.title}
            tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            createTask={createTask}
            changeTasksStatus={changeTasksStatus}
            deleteTodolist={deleteTodolist}

        />
    )
    })

    return (
        <div className="app">

            {todolistComponents}
        </div>
    )
}

export default App
