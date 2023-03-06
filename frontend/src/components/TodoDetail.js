import axios from "axios"
import { useContext, useState, useEffect} from "react"
import { TodoContext } from "./Todo"


export const TodoDetail = () => {
    const todo = useContext(TodoContext).todoValue
    const [taskOld, setTaskOld] = useState("")
    const [taskVal, setTaskVal] = useState("")
    const [titleVal, setTitleVal] = useState("")
    const [val, setVal] = useState(0)

    useEffect(() => {
        setVal(val+1)
    }, [todo])
    

    const handleTaskChange = (event) => {
        setTaskVal(event.target.value);
    }

    const handleTitleChange = (event) => {
        setTitleVal(event.target.value)
    } 
    //done
    async function editTask(task_text,index){
        if(taskVal=="" || taskVal==task_text){
            console.log("Empty new task value")
        }else{
            await axios.put(`${process.env.BACKEND_URI}/editTask?id=${todo.id}`,
            {
                task_text:task_text, 
                task_new_text: taskVal
            })
            console.log(`newVal: ${taskVal}`)
            console.log(`oldVal: ${task_text}`)
        }
    }
    //done
    async function editTitle(){
        if(titleVal!="" && titleVal!=todo.title){
            await axios.put(`${process.env.BACKEND_URI}/editTodoTitle?id=${todo.id}`,
            {
                "title": titleVal
            })
            console.log(`title: ${titleVal}`)
        }
    }
    //on deleting ui is not updating
    async function deleteTasks(val, id){
        try {
            console.log(todo.id)
            console.log(val)
            document.getElementById(`input-${id}`).classList.add("line-through")
            document.getElementById(`button-${id}`).classList.add("cursor-not-allowed")
            document.getElementById(`input-${id}`).classList.add("text-gray-600")
            document.getElementById(`button-${id}`).classList.add("text-gray-600")
            await axios.put(`${process.env.BACKEND_URI}/deleteTasks?id=${todo.id}`,
            {
                "task_text":val
            })
            .then(() => console.log('Delete successfull'))
            .catch((err) => console.log(err))
            console.log(val)
        } catch (error) {
            console.log(error)
        }
        
    }

    async function delTodo(){
        try {
            await axios.delete(`${process.env.BACKEND_URI}/deleteTodo?id=${todo.id}`)
            .then(() => console.log('Delete successfull'))
            .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        } 
    }

    async function createTask() {
      let newTask = prompt("Please enter task details");
      if (newTask != null) {
        try {
            await axios.put(`${process.env.BACKEND_URI}/createTasks?id=${todo.id}`,{"task":newTask})
            .then(() => console.log('Task Created successfull'))
            .catch((err) => console.log(err))
        } catch (error) {
            console.log(error)
        }
      }
    }

    return(
        <div className="flex flex-col w-2/3 mx-auto container py-2 px-5">
            <div className="w-full flex shadow-lg bg-slate-300 h-20 mb-24">    
                <input 
                    onChange={handleTitleChange}
                    onBlur={editTitle} 
                    type="text"  
                    defaultValue={todo.title} 
                    className='grid bg-slate-300 content-center mx-3 w-11/12 truncate text-4xl font-semibold ' />
                    
                    <button onClick={() => createTask()} className='mr-5 mt-24 bg-gray-900 rounded text-white w-32 h-2/4 content-center'>Create Task</button>
                    <button onClick={() => delTodo()} className='mr-5 mt-24 bg-gray-900 rounded text-white w-24 h-2/4 content-center'>Delete</button>
            </div>
            <ul className="w-full">
                {todo.tasks.map((user,i) => {
                    return(
                        <li className="p-2 h-10 bg-slate-100 shadow-lg mb-4">
                            <div className="h-full flex items-center space-x-4">
                                <input 
                                    id={`input-${i}`}
                                    onChange={handleTaskChange} 
                                    onFocus={(e) => {setTaskOld(e.target.value)}}
                                    onBlur={() => {editTask(taskOld,i)}} 
                                    type="text" 
                                    defaultValue={user} 
                                    className="h-full bg-slate-100 flex-1 min-w-0 text-sm font-medium text-black truncate" 
                                />
                                <button id={`button-${i}`} onClick={(e) => {deleteTasks(taskVal||user, i)}} className="pl-5 border-l-2 border-slate-500 h-full inline-flex items-center text-base font-semibold text-gray-900">
                                    DONE
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
 }

export default TodoDetail