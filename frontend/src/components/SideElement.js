import React, { useContext } from 'react'
import { TodoContext } from './Todo';

import { useDeleteTodoMutation, useTodoQuery } from '../services/todoApi';
import { useDispatch } from 'react-redux';
import { updateTodoInfo } from '../services/todoReducer';

const SideElement = ({id, title, tasks}) => {

    const [deleteTodo] = useDeleteTodoMutation();
    const {data} = useTodoQuery();
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        deleteTodo(id);
        const todos = data.todos;
        if(data!=undefined && todos[0]==undefined){
            dispatch(updateTodoInfo({id:"",title:"",tasks:[]}));
        }else{
            const todoOne = todos[0];
            dispatch(updateTodoInfo({ id:todoOne._id, title:todoOne.title, tasks:todoOne.tasks }));
        }
        // console.log(data);
    }

    const handleState = () => {
        dispatch(updateTodoInfo({id, title, tasks}));
    }

    return (
        <div className="w-full flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl dark:bg-gray-900 dark:text-gray-100 divide-gray-700">
            <button
            onClick={handleState}
            className="w-3/4 flex flex-1 flex-col p-4 border-l-8 dark:border-violet-400 text-left">
                <span className="text-2xl truncate block">{title}</span>
                <span className="leading-loose truncate text-xs dark:text-gray-400">{tasks[0]}</span>
            </button>
            <button 
            onClick={() => handleDelete()}
            className="px-4 flex items-center text-xs uppercase tracking-wide dark:text-gray-400 dark:border-gray-700">Delete</button>
        </div>
    )
}

export default SideElement