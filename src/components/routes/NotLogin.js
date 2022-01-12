import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
// import LoadingToRedirect from '../routes/LoadingToRedirect';
import Loading from '../Loading/Loading';

function NotLogin({children,...rest}) {
    const {user} =  useSelector((state)=>({...state}));

return user && user?.token?(
    <Redirect to="/"/>
   
):(
    <Route {...rest} render={()=>children} /> 
)

}

export default NotLogin;