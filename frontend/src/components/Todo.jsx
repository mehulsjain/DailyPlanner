import React, { useState} from 'react'
import Header from './Header';
import Sidebar from './Siebar';
import TodoDetail from './TodoDetail';

export const TodoContext = React.createContext({
  id: "",
  title: "",
  tasks: [""]
}) 

const Todo = () => {

  const [todoValue, setTodoValue] = useState({
    id:"",
    title:"",
    tasks:[""]
  });
  const value = { todoValue, setTodoValue };

  return (
    <TodoContext.Provider value={value}>
      <Header user="Hey there ..!!" signUpOption="Log Out"/>
      <div className='flex flex-row w-full'>
        
          <Sidebar />
          <TodoDetail />
        
      </div>
    </TodoContext.Provider>
  );
};

export default Todo;