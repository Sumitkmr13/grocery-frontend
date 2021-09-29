import React, { useState, useEffect } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useHistory } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';

export default function Header() {
    const [isLoggedin, updateIsLoggedIn] = useState(false);
    const history = useHistory();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                updateIsLoggedIn(true);
            } else {
                updateIsLoggedIn(false);
            }
        });
    }, []);
    function logOut() {
        signOut(auth).then(() => {
            //signOut successfull
            history.push('/');
        }).catch((error) => {
            //an error occurred
            console.log('error in logout', error);
        });
    }
    function showLogoutButton() {
        if (isLoggedin) {
            return (
                <div className='ml-auto'>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => logOut(e)}
                    >
                        Logout
                    </button>
                </div>
            )
        }
    }
    return (
        <div className='w-full h-12 bg-indigo-700 text-white flex justify-center items-center px-3 text-xl font-bold'>
            <span>Grocery Listing</span>
            {showLogoutButton()}
        </div>
    )
}
