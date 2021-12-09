import React, { useState,useEffect } from 'react'

//components
import {CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
import {createPaymentIntent} from "../../functions/stripe"; 
import {useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { createOrder } from '../../functions/coupon';
import deleteUserCart from '../../functions/deleteUserCart';
import  getUserCart  from '../../functions/getUserCart';

const StripeCheckOut = ({token}) => {
    // const dispatch = useDispatch();
    const {user} = useSelector((state)=>({...state}))
    const [succeeded,setSucceeded] = useState(false);
    const [error,setError] = useState(null);
    const [processing,setProcessing] = useState('');
    const [disable,setDisable] = useState(true);
    const [clientSecret,setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();
    const [cartId,setCartId] = useState("")

    useEffect(()=>{
        if(user)
        payment();
        getCart();
        // eslint-disable-next-line
    },[user])

    const payment = async()=>{
     const res = await createPaymentIntent(user?.token)
     setClientSecret(res.data.clientSecret)
     console.log("payment res",res)
    }

    const handleSubmit = async(e)=>{
       e.preventDefault();
       setProcessing(true)
       let payload = await stripe.confirmCardPayment(clientSecret,{
           payment_method:{
               card:elements.getElement(CardElement),
               billing_details:{
                   name:e.target.name.value,
               },
           }
       })

       if(payload.error){
           setError(`Payment failed ${payload.error.message}`)
           setProcessing(false)
           history.push(`/payment/failed/${token}`)
       }else{
        //here we can get result of successfull payment
        makeOrer(payload,user?.token);
        console.log("buy seccessfull",payload)
        console.log(JSON.stringify(payload,null,4))
        setError(null)
        setProcessing(false)
        setSucceeded(true)
        history.push(`/payment/successful/${token}`)
       }
    }

    const handleChange = (e)=>{
        // console.log("payment sumbit",e);
        setDisable(e.empty);
        setError(e.error?e.error.message:'')
    }

    //stripe cart style
    const cartStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };

      //get cart
   const getCart = async()=>{
     const cart = await getUserCart(user?.email);
            console.log("cart from back",cart);
        setCartId(cart.data._id)
   }   

    //create order
    const makeOrer = async(stripeResponse,authtoken)=>{
      // console.log("make order k andr se")
     const order = await createOrder(stripeResponse,authtoken);
     console.log("order created",order)
     if(order.data.ok&&cartId){
       const cartdeleted = await deleteUserCart(cartId);
       console.log("cart deleted",cartdeleted)
       if(cartdeleted){
         window.localStorage.removeItem("cart")
       }
     }
    }  

    return (
        <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cartStyle} onChange={handleChange} />
      <button disabled={processing || disable || succeeded} id="submit" className="stripe-button" >
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {error && <div id="payment-message" className="card-error">{error}</div>}
    </form>
    )
}

export default StripeCheckOut
