import {Redirect,Route} from 'react-router-dom';

function ProtectedRoute({component:Component, ...restOfProps}){
    return( <Route render={(props)=>
            restOfProps.isLoggedIn? <Component {...props} />:<Redirect to='/'/>
        }/>
    );
}
export default ProtectedRoute;