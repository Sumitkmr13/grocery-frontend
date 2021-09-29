import './App.css';
import Header from './components/Header';
import GrocerySection from './components/GrocerySection';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ProtectedRoute from './components/ProtectedRoute';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {useEffect,useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase';
import Skeleton from 'react-loading-skeleton';

function App() {
  const [isLoggedIn,updateIsLoggedIn]= useState(false);
  const [isLoading,updateIsLoading]= useState(true);
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
             if (user) {
                updateIsLoggedIn(true);
                updateIsLoading(false);
            } else {
                updateIsLoggedIn(false);
                updateIsLoading(false);
            }
        })
    },[]);
    if(isLoading){
      return <div ><Skeleton className='w-screen h-screen'/></div>
    }
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <LoginForm isLoggedIn={isLoggedIn}/>
          </Route>
          <ProtectedRoute path="/app" component={GrocerySection} isLoggedIn={isLoggedIn}/>
          <Route path="/register">
            <RegistrationForm />
          </Route> 
        </Switch>
      </div>
    </Router>
  );
}

export default App;
