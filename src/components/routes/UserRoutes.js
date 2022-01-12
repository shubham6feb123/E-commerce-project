import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';



function UserRoutes({children,...rest}) {
    const {user} =  useSelector((state)=>({...state}));

return user && user.token?(
    <Route {...rest} render={()=>children} />
):(
    <Redirect to="/login"/>
)

}

export default UserRoutes;
