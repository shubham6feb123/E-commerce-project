import React from 'react';
import './dashboard.css';
import AdminNav from '../admin/AdminNav';
import {Switch,Route,useRouteMatch} from 'react-router-dom';
import Category from './category/Category';
import SubCategory from './subCategory/SubCategory'
import DashboardAdmin from './Dashboard/DashboardAdmin';
import Product from './product/Product';
import ProductList from './product list/ProductList';
import Coupon from './coupon/Coupon'
// import ProductUpdate from './product/ProductUpdate';
import UpdateSubcategory from './subCategory/UpdateSubcategory';
import UpdateCategory from './category/UpdateCategory';


//we are using here nesting routes

function Dashboard() {
    const {path} = useRouteMatch();
    // const path  = "/admin";
    // console.log("path",path);
    // console.log("useRouteMatch",useRouteMatch());
    return (
        <>
        <div className="dashboard">
           <AdminNav path={path}/>
           <Switch>
           <Route exact path={`${path}`}>
                 <DashboardAdmin/>
               </Route>

               <Route exact path={`${path}/product`}>
                 <Product/>
               </Route>
    
               <Route exact path={`${path}/productlist`}>
                 <ProductList/>
               </Route>

               <Route exact path={`${path}/category`}>
                 <Category/>
               </Route>
     
               <Route exact path={`${path}/subcategory`}>
                 <SubCategory/>
               </Route>
               <Route exact path={`${path}/coupon`}>
                <Coupon/>
               </Route>
               {/* <Route exact path={`${path}/product/:slug`}>
                <ProductUpdate/>
               </Route> */}
               <Route exact path={`${path}/subcategory/update/:slug`}>
                <UpdateSubcategory/>
               </Route>
               <Route exact path={`${path}/category/update/:slug`}>
                <UpdateCategory/>
               </Route>
           </Switch>
        </div>
        </>
    )
}

export default Dashboard
