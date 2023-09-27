import React from 'react'
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import Icon from './dp';

const Header = () => {

	const userName = useSelector((state) => state.todoInfo.userName);
	const dispatch = useDispatch();
	const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(["token"]);
	const navigate = useNavigate();	

	const signOutClick = () => {
		removeTokenCookie('token');
		removeTokenCookie('userId');
		document.getElementById('userName').innerText = "";
		navigate('/');
	}

    return(
		<header className="p-4 bg-gray-800 text-gray-100 container flex justify-between h-24 mx-auto">
			
				<a rel="noopener noreferrer" href="/#" aria-label="Back to homepage" className="flex items-center p-2">
				<Icon className='w-40' />
				</a>
				<ul className="items-stretch hidden space-x-3 md:flex">
					<li className="flex">
						<div id='userName' rel="noopener noreferrer" className="flex items-center px-4 -mb-1  dark:border-transparent"><CgProfile className='mr-1' /> {userName}</div>
					</li>
					<li className="flex">
						<button type="button" onClick={signOutClick} id="signOut" className="flex br-4 rounded h-7/8 items-center px-4 -mb-1 hover:bg-slate-300 hover:text-black hover:ring-sky-500  dark:border-transparent">Sing Out</button>
					</li>
				</ul>
				<button className="flex justify-end p-4 md:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</button>
			
		</header>
	)
}

export default Header