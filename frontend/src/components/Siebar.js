import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import SideElement from './SideElement'
import { TodoContext } from './Todo';
import { useCookies } from 'react-cookie';


export const Sidebar = () => {

    const [cookies, setCookie] = useCookies();

    const [todoList, setTodoList] = useState(null)
    const {setTodoValue} = useContext(TodoContext);

    let bool = true

    const fetchTodoData = async () => {

        const resp = await axios
        .get(`${process.env.BACKEND_URI}/getTodos`,{ withCredentials: true })
        
        if(resp.data.todos.length > 0){
            setTodoList(resp.data.todos)
        }
        const t = resp.data.todos[0]
        setTodoValue({id: t._id, 
            title: t.title, 
            tasks: t.tasks})
    }

    async function createTodo() {
        let newTodoTitle = prompt("Please enter new Todo's Title");
        let newTodoTask = prompt("Please add task for the new Todo")
        if (newTodoTitle != null && newTodoTask!=null) {
          try {
              await axios.post(`${process.env.BACKEND_URI}/createTodo`,
              {
                "title": newTodoTitle,
                "tasks": newTodoTask,
                "userId": cookies.id
              })
              .then(() => alert('Task Created successfull'))
              .catch((err) => console.log(err))
          } catch (error) {
              console.log(error)
          }
        }
      }

    //run every time todoList changes
    useEffect(() => {
      fetchTodoData();
    }, [])

    return(
        <aside className="w-1/3 p-6 bg-gray-900 text-gray-100">
            <nav className="space-y-8 text-sm ">
                <div className="space-y-2 h-screen overflow-hidden">
                    <div className='flex justify-between'>
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-gray-400">TO-DO List</h2>
                    <button onClick={()=>{createTodo()}} className='bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-grey-500 hover:border-transparent rounded'>Create To Do</button>
                    </div>
                    {
                        todoList && todoList.map((user) => {
                        // console.log(user._id)
                            return(
                                <SideElement id={user._id} title={user.title} tasks={user.tasks} />
                            ) 
                        })
                    }
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar