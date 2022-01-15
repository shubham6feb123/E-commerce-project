import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect,lazy,Suspense } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { currentUser } from "./functions/auth";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/nav/Header";
import Loading from "./components/Loading/Loading";
// import Shop from "./pages/Shop";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CompleteRegistrationForm = lazy(()=> import('./pages/auth/CompleteRegistrationForm'))
const ForgotPassword = lazy(()=>import("./pages/auth/ForgotPassword"));
const NotFound = lazy(()=>import("./pages/pageNotFound/NotFound"));
const History = lazy(()=>import("./pages/user/History"));
const WishList = lazy(()=>import("./pages/user/WishList"));
const UserRoutes = lazy(()=>import("./components/routes/UserRoutes"));
const Password  =  lazy(()=>import("./pages/user/Password"));
const AdminRoutes = lazy(()=>import("./components/routes/AdminRoutes"));
const Dashboard = lazy(()=>import("./pages/admin/Dashboard"));
const SingleProduct = lazy(()=>import("./pages/singleProductPage/SingleProduct"));
const Search = lazy(()=>import("./pages/search/Search"));
const SearchRoute = lazy(()=>import("./components/routes/SearchRoute"));
const Cart = lazy(()=>import("./components/Cart/Cart"));
const CheckOut = lazy(()=>import("./pages/checkOut/CheckOut"));
const Payment = lazy(()=>import("./pages/payment/Payment"));
const PaymentSuccessfull = lazy(()=>import("./pages/payment/PaymentSuccessfull"));
const PaymentFailed = lazy(()=>import("./pages/payment/PaymentFailed"));
const NotLogin = lazy(()=>import("./components/routes/NotLogin"));
const Support = lazy(()=>import("./pages/user/Support"));
const Footer = lazy(()=>import("./components/Footer/Footer"));

const App = () => {
  const dispatch = useDispatch();

  //To check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user, "idtokenresult", idTokenResult);
        const currenUser = await currentUser(user.email);
        // console.log("current user from app ", currenUser);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            name: currenUser.data.name,
            role: currenUser.data.role,
            _id: currenUser.data._id,
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
    <Suspense fallback={<Loading/>}>
    <div className="app">
      <Router>
        <Header />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/shop" component={Shop} /> */}
          <NotLogin exact path="/login">
            <Login />
          </NotLogin>
          <NotLogin exact path="/register">
            <Register />
          </NotLogin>
          <Route exact path="/product/:slug" component={SingleProduct} />
          {/* <Route exact path="/cart" component={Cart}/> */}
          <UserRoutes exact path="/cart">
            <Cart />
          </UserRoutes>
          <SearchRoute path="/search">
            <Search />
          </SearchRoute>
          <Route exact path="/support" component={Support}/>
          <AdminRoutes path="/admin">
            <Dashboard />
          </AdminRoutes>
          <NotLogin exact path="/register/registercomplete/">
            <CompleteRegistrationForm />
          </NotLogin>
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <UserRoutes exact path="/user/orders">
            <History />
          </UserRoutes>
          <UserRoutes exact path="/userpassword">
            <Password />
          </UserRoutes>
          <UserRoutes exact path="/checkout/">
            <CheckOut />
          </UserRoutes>
          <UserRoutes exact path="/user/wishlist">
            <WishList />
          </UserRoutes>
          <UserRoutes exact path="/payment/:user">
            <Payment />
          </UserRoutes>
          <UserRoutes exact path="/payment/successful/:user">
            <PaymentSuccessfull />
          </UserRoutes>
          <UserRoutes exact path="/payment/failed/:user">
            <PaymentFailed />
          </UserRoutes>
          <Route exact component={NotFound} />
        </Switch>
        <Footer/>
      </Router>
    </div>
    </Suspense>
  );
};

export default App;
