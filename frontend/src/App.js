import './App.css';
import React, { useState } from 'react'
import Header from './components/Header';
import Sidebar from './components/Siebar';
import TodoDetail from './components/TodoDetail';
import { CookiesProvider } from 'react-cookie';

export const TodoContext = React.createContext({
  id: "",
  title: "",
  tasks: [""]
}) 


const App = () => {

  const [todoValue, setTodoValue] = useState({
    id:"",
    title:"",
    tasks:[""]
  });
  const value = { todoValue, setTodoValue };

  return (
    // <CookiesProvider>
    <TodoContext.Provider value={value}>
      <Header />
      <div className='flex flex-row w-full'>
        
          <Sidebar />
          <TodoDetail />
        
      </div>
    </TodoContext.Provider>
    // </CookiesProvider>
  );
}

export default App;
