import { useTodoQuery } from '../services/todoApi';
import Header from './Header';
import Sidebar from './Siebar';
import TodoDetail from './TodoDetail'

const Todo = () => {
  
  const val = useTodoQuery();

  if(val.status=="fulfilled"){
    let todoList = val.data.todos;
    return (
      <div className='flex flex-row w-full'>
        <Sidebar todoList={todoList} />
        <TodoDetail />
      </div>
    )
  }else{
    return(null);
  }
}

export default Todo;