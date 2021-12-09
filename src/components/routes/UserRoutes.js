import React from 'react';
import {Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
// import LoadingToRedirect from '../routes/LoadingToRedirect';
import Loading from '../Loading/Loading';

function UserRoutes({children,...rest}) {
    const {user} =  useSelector((state)=>({...state}));

return user && user.token?(
    <Route {...rest} render={()=>children} />
):(
    <Loading/>
)

}

export default UserRoutes;
