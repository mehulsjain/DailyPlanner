import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import Header from './Header';

export const Singup = () => {

  const navigate = useNavigate();

  const createAccount = async () => {
    const fn = document.getElementById("first-name").value
    const ln = document.getElementById("last-name").value
    const email = document.getElementById("email-id").value
    const pass = document.getElementById("password").value
    const retypePass = document.getElementById("retype-password").value

    if(fn=="" || ln=="" || email=="" || pass=="" || retypePass==""){
      alert("Enter all the fields")
    }else if(pass!=retypePass){
      alert("Password and retype password not matching")
    }else{
      await axios.post(`${process.env.REACT_APP_BACKEND_URI}/register`,{
        "firstname":  fn,
        "lastname":  ln,
        "email":  email,
        "password":  pass
    }).then((msg) => {
      console.log(msg);
      navigate('/');
      alert("User created sucessfully")
    }).catch(msg => alert(msg.response.data));
      
    }
  };
  const navigateToSignIn = () => {
    navigate('/');
  }

  return(
    <form className="w-full max-w-lg place-self-center mx-auto my-24">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
            First Name
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="first-name" type="text" placeholder="Jane" />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last-name">
            Last Name
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="last-name" type="text" placeholder="Doe" />
        </div>
      </div>
      <div className="flex flex-wrap mb-6">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first-name">
            Email Id
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email-id" type="text" placeholder="jane.doe@email.com" />
        </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="******************" />
          <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="retype-password">
            Re-Enter Password
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="retype-password" placeholder="******************" />
        </div>
      </div>
      <button type="button" onClick={createAccount} className="mr-16 bg-slate-800 rounded-md w-1/3 h-12 text-white">Create Account</button>
      OR
      <button type="button" onClick={navigateToSignIn} className="ml-20 bg-slate-800 rounded-md w-1/3 h-12 text-white">Sign In</button>
    </form>
  )
}

export default Singup