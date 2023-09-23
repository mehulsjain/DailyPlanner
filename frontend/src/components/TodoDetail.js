import axios from "axios"
import { useState } from "react"

import { useEditTodoTitleMutation, useDeleteTodoMutation, useCreateTaskMutation, useDeleteTaskMutation, useEditTaskMutation } from "../services/todoApi";
import { useSelector, useDispatch } from "react-redux";
import { updateTodoInfo } from '../services/todoReducer';

export const TodoDetail = () => {

    const todo = useSelector((state) => state.todoInfo);
    const dispatch = useDispatch();

    const [editTodoTitle,errorEditTodoTitle] = useEditTodoTitleMutation();
    const [deleteTodo,errorDeleteTodo] = useDeleteTodoMutation();
    const [createTask,errorCreateTask] = useCreateTaskMutation();
    const [deleteTask,errorDeleteTask] = useDeleteTaskMutation();
    const [editTask,errorEditTask] = useEditTaskMutation();

    const [taskOld, setTaskOld] = useState("")
    const [taskVal, setTaskVal] = useState("")
    const [titleVal, setTitleVal] = useState("")
    const [val, setVal] = useState(0)
    

    const handleTaskChange = (event) => {
        setTaskVal(event.target.value);
    }
    const handleTitleChange = (event) => {
        setTitleVal(event.target.value)
    } 
    
    async function editTitle(){
        if(titleVal!="" && titleVal!=todo.title){
            await editTodoTitle({
                id:todo.id,
                payload: {title:titleVal}
            });
            dispatch(updateTodoInfo({...todo,title:titleVal}))
        }
    }
    //redux not done
    async function delTodo(){
        try {
            await deleteTodo(todo.id);
            dispatch(updateTodoInfo({id:"",title:"",tasks:[]}));
        } catch (error) {
            console.log(error)
        } 
    }
    
    async function createTaskFn() {
      let newTask = prompt("Please enter task details");
      if (newTask != null) {
        try {
            await createTask({
                id:todo.id,
                payload: {task_text:newTask}
            })
            const newTasks = [...todo.tasks,newTask]
            dispatch(updateTodoInfo({...todo,tasks:newTasks}))
        } catch (error) {
            console.log(error)
        }
      }
    }
    
    async function editTaskFn(task_text,index){
        if(taskVal=="" || taskVal==task_text){
            console.log("Task value not changed or empty")
        }else{
            try {
                await editTask({
                    id:todo.id,
                    payload: {task_text,task_new_text:taskVal}
                })
    
                let newTasks = [...todo.tasks];
                const index = todo.tasks.indexOf(task_text); 
                if (index !== -1) {
                newTasks[index] = taskVal;
                }

                dispatch(updateTodoInfo({...todo,tasks:newTasks}))
            } catch (error) {
                console.log(error)
            }
        }
    }
    
    async function deleteTaskFn(val, id){
        try { 
            await deleteTask({
                id:todo.id,
                payload: {task_text:val}
            })

        } catch (error) {
            console.log(error)
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
                    
                    <button key={`create-${todo.id}`} onClick={() => createTaskFn()} className='mr-5 mt-24 bg-gray-900 rounded text-white w-32 h-2/4 content-center'>Create Task</button>
                    <button key={`delete-${todo.id}`} onClick={() => delTodo()} className='mr-5 mt-24 bg-gray-900 rounded text-white w-24 h-2/4 content-center'>Delete</button>
            </div>
            <ul className="w-full">
                {todo.tasks.map((task,i) => {
                    return(
                        <li key={i} className="p-2 h-10 bg-slate-100 shadow-lg mb-4">
                            <div className="h-full flex items-center space-x-4">
                                <input 
                                    id={`input-${i}`}
                                    onChange={handleTaskChange} 
                                    onFocus={(e) => {setTaskOld(e.target.value)}}
                                    onBlur={() => {editTaskFn(taskOld,i)}} 
                                    type="text" 
                                    defaultValue={task} 
                                    className="h-full bg-slate-100 flex-1 min-w-0 text-sm font-medium text-black truncate" 
                                />
                                <button id={`button-${i}`} onClick={(e) => {deleteTaskFn(taskVal||task, i)}} className="pl-5 border-l-2 border-slate-500 h-full inline-flex items-center text-base font-semibold text-gray-900">
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