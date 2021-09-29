import React, { useState ,useEffect} from 'react'
import { useHistory } from "react-router-dom";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';

export default function LoginForm(props) {
    const [emailId, updateEmailId] = useState('');
    const [password, updatePassword] = useState('');
    let history = useHistory();
    useEffect(()=>{
        if(props.isLoggedIn) {
            history.push("/app");
        }
    },[])
    function redirectToRegistration(e) {
        e.preventDefault();
        history.push("/register");
    }
    async function loginUser(e){
        e.preventDefault();
        try{
            const response = await signInWithEmailAndPassword(auth,emailId,password);
            console.log('response',response);
            history.push("/app");
        }catch(error){
            console.log('error in login',error);
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
            </div>
            <form className="mt-8 space-y-6">
                <div className="rounded-md shadow-sm -space-y-px">
                    <div><label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={emailId}
                            onChange={(e) => updateEmailId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => updatePassword(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button
                        className="group relative cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e)=> loginUser(e)}
                    >
                        Sign in
                    </button>
                </div>
                <div>
                    Not registered yet?
                    <button
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e)=>redirectToRegistration(e)}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
