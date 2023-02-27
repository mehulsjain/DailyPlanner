import React, { useContext } from 'react'
import { TodoContext } from './Todo';

const SideElement = ({id, title, tasks}) => {

    const {setTodoValue} = useContext(TodoContext);

    return (
        <div className="w-full flex shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl dark:bg-gray-900 dark:text-gray-100 divide-gray-700">
            <div onClick={()=> setTodoValue({id, title, tasks})} className="w-3/4 flex flex-1 flex-col p-4 border-l-8 dark:border-violet-400">
                <span className="text-2xl truncate block">{title}</span>
                <span className="leading-loose truncate text-xs dark:text-gray-400">{tasks[0]}</span>
            </div>
            <button className="px-4 flex items-center text-xs uppercase tracking-wide dark:text-gray-400 dark:border-gray-700">Delete</button>
        </div>
    )
}

export default SideElement