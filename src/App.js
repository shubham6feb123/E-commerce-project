import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
// import Shop from "./pages/Shop";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CompleteRegistrationForm from "./pages/auth/CompleteRegistrationForm";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NotFound from "./pages/pageNotFound/NotFound";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {currentUser} from "./functions/auth";
import History from './pages/user/History';
import UserRoutes from './components/routes/UserRoutes';
import Password from "./pages/user/Password";
import AdminRoutes from "./components/routes/AdminRoutes";
import Dashboard from "./pages/admin/Dashboard";
import SingleProduct from "./pages/singleProductPage/SingleProduct";
import Search from "./pages/search/Search";
import SearchRoute from "./components/routes/SearchRoute";
import Cart from "./components/Cart/Cart";
import CheckOut from "./pages/checkOut/CheckOut";
import Payment from "./pages/payment/Payment";
import PaymentSuccessfull from "./pages/payment/PaymentSuccessfull";
import PaymentFailed from "./pages/payment/PaymentFailed";

const App = () => {
  const dispatch = useDispatch();

  //To check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user, "idtokenresult", idTokenResult);
        const currenUser = await currentUser(user.email);
        console.log("current user from app ", currenUser);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            name:currenUser.data.name,
            role:currenUser.data.role,
            _id:currenUser.data._id,
            token: idTokenResult.token,
          },
        });
      }
    });

    
    //cleanup
    return () => {
      unsubscribe();
    };
  });

  return (
    <div className="app">
      <Router>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/shop" component={Shop} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/product/:slug" component={SingleProduct} />
          <Route exact path="/cart" component={Cart}/>
          <SearchRoute path="/search">
            <Search/>
          </SearchRoute>
          <AdminRoutes  path="/admin">
            <Dashboard/>
          </AdminRoutes>
          <Route
            exact
            path="/register/registercomplete/"
            component={CompleteRegistrationForm}
          />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <UserRoutes exact path="/user/orders">
            <History/>
          </UserRoutes>
          <UserRoutes  exact path="/userpassword">
            <Password/>
          </UserRoutes>
          <UserRoutes exact path="/checkout/" >
            <CheckOut/>
          </UserRoutes>
           <UserRoutes exact path="/payment/:user" >
             <Payment/>
           </UserRoutes>
           <UserRoutes exact path="/payment/successful/:user">
             <PaymentSuccessfull/>
           </UserRoutes>
           <UserRoutes exact path="/payment/failed/:user">
             <PaymentFailed/>
           </UserRoutes>
          <Route exact component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
