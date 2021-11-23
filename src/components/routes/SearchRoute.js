import React from 'react'
import { useSelector } from 'react-redux'
import { Route,useLocation,Redirect } from 'react-router-dom'

function SearchRoute({children,...rest}) {
    const {search}  = useSelector((state)=>({...state}))
    const location = useLocation();

    return search.text!==""?(
       <Route {...rest} render={()=>children}/>
    ):<Redirect
      to={{
        pathname: "/",
        state: { from: location }
      }}
    />
}

export default SearchRoute
