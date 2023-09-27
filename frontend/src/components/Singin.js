import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios"
import Header from './Header';
import { updateTodoInfo } from '../services/todoReducer';
import { useDispatch } from 'react-redux';

export const Singin = () => {

  const [cookies, setCookie] = useCookies(["token"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToTodo = async () => {
    // 👇️ navigate to /todo
    const email = document.getElementById("email-id").value
    const password = document.getElementById("password").value
    if(email=="" && password==""){
      alert("Email Id and password are required")
    }else{
      await axios.post(`${process.env.REACT_APP_BACKEND_URI}/login/`,
      {
          email,
          password
      }).then((result) => {
        //storing data in cookie
        setCookie("token", result.data.token);
        setCookie("userId", result.data.user._id);
        let userName = `${result.data.user.firstname} ${result.data.user.lastname}`;
        dispatch(updateTodoInfo({userName}));
        navigate('/todo')

      }).catch((err) => {
        alert(`${err}. Please try again`);
      });
    }
  };

  const navigateToSingUp = () => {
    navigate('/signup')
  }

  return(
    <form className="w-full max-w-lg place-self-center mx-auto my-24">
      <div className="flex flex-wrap mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
            Email Id
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email-id" type="text" placeholder="jane.doe@email.com" />
        </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
            Password
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="******************" />
        </div>
      </div>
      <button type="button"  onClick={navigateToTodo} className="bg-slate-800 rounded-md w-1/5 h-10 text-white">Sign In</button>
      <button type="button"  onClick={navigateToSingUp} className=" ml-72 bg-slate-800 rounded-md w-1/5 h-10 text-white">Sign Up?</button>
    </form>
  )
}

export default Singin