import SideElement from './SideElement'

import { useCreateTodoMutation } from '../services/todoApi';
import { useDispatch } from 'react-redux';
import { updateTodoInfo } from '../services/todoReducer';
import { useEffect } from 'react';

export const Sidebar = ({todoList}) => {

    const dispatch = useDispatch();

    let todoOne;
    const [createTodo,{error}] = useCreateTodoMutation();
    
    if(todoList!=undefined){
        todoOne = todoList[0];
    }
    useEffect(()=> {
        if(todoOne!=undefined) {
            dispatch(updateTodoInfo({ id:todoOne._id, title:todoOne.title, tasks:todoOne.tasks })); 
        }else{
            dispatch(updateTodoInfo({id:"",title:"",tasks:[]}));
        }
    },[])


    async function generateTodo() {
        //Generating prompts to add Todo
        let newTodoTitle = prompt("Please enter new Todo's Title");
        let newTodoTask = prompt("Please add task for the new Todo");

        if(newTodoTitle == null && newTodoTask ==null){
            console.log("Title or tasks are missing");
        }else{
          try{
            const todo = { "title": newTodoTitle, "tasks": newTodoTask };
            await createTodo(todo)
            .unwrap()
            .then((payload) => console.log('fulfilled', payload))
            .catch((error) => alert(error.data.error));
          }catch (error) {
            console.log(error);
          }
        }
      }

    return(
        <aside className="w-1/3 p-6 bg-gray-900 text-gray-100">
            <nav className="space-y-8 text-sm ">
                <div className="space-y-2 h-screen overflow-hidden">
                    <div className='flex justify-between'>
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-400">TO-DO List</h2>
                    <button onClick={generateTodo} className='bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-grey-500 hover:border-transparent rounded'>Create To Do</button>
                    </div>
                    {
                        todoList && todoList.map((todo) => {
                            return(
                                <SideElement 
                                    key={todo._id} 
                                    id={todo._id} 
                                    title={todo.title} 
                                    tasks={todo.tasks} 
                                />
                            ) 
                        })
                    }
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar