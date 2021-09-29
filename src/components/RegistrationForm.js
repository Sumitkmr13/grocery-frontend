import React,{useState} from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase';
import { useHistory } from "react-router-dom";

export default function RegistrationForm() {
    const [emailId,updateEmailId]=useState('');
    const [password,updatePassword]=useState('');
    const [confirmPassword,updateConfirmPassword]=useState('');
    const history = useHistory();
    async function createUserAccount(e){
        e.preventDefault();
        console.log('emailId',emailId);
        if(password===confirmPassword){
            try{
                const res= await createUserWithEmailAndPassword(auth,emailId,password);
                console.log('res',res);
                history.push("/");
            }catch(error){
                console.log('error occured',error);
            }
        }else{
            alert('Password should match');
        }
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
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
                            onChange={(e)=>updateEmailId(e.target.value)}
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
                            onChange={(e)=>updatePassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                           Re-enter Password
                        </label>
                        <input
                            id="renter-password"
                            name="renter-password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Re Enter Password"
                            value={confirmPassword}
                            onChange={(e)=>updateConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e)=>createUserAccount(e)}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}
