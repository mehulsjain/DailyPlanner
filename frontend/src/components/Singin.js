import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";
import axios from "axios"
import Header from './Header';

export const Singin = () => {

  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const navigateToTodo = async () => {
    // 👇️ navigate to /todo
    const email = document.getElementById("email-id").value
    const password = document.getElementById("password").value
    if(email=="" && password==""){
      console.log("Email Id and password are required")
    }else{
      await axios.post(`${process.env.BACKEND_URI}/login/`,
      {
          email,
          password
      }).then((result) => {
        navigate('/todo')
        setCookie("token", result.data.token);
      }).catch((err) => {
        console.log(err)
      });
    }
  };

  const navigateToSingUp = () => {
    navigate('/signup')
  }

  return(
    <div>
      <Header user="Hey there .."/>
      <form class="w-full max-w-lg place-self-center mx-auto my-24">
        <div class="flex flex-wrap mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              Email Id
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email-id" type="text" placeholder="jane.doe@email.com" />
          </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
              Password
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="******************" />
          </div>
        </div>
        <button type="button"  onClick={navigateToTodo} class="bg-slate-800 rounded-md w-1/5 h-10 text-white">Sign In</button>
        <button type="button"  onClick={navigateToSingUp} class=" ml-72 bg-slate-800 rounded-md w-1/5 h-10 text-white">Sign Up?</button>
      </form>
    </div>
    
  )
}

export default Singin