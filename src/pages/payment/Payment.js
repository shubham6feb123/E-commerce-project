import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { verifyUser } from "../../functions/payment";
import { useHistory } from "react-router-dom";
//css
import "../../stripe.css";
import "./payment.css";

//components
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckOut from "../../components/form/StripeCheckOut";
import globe from "./globe.mp4";

const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Payment() {
  const { user } = useParams();
  const history = useHistory();
  console.log("params", user);
  useEffect(() => {
    verify();
    // eslint-disable-next-line
  }, [user]);
  const verify = async () => {
    try {
      await verifyUser(user);
    } catch (error) {
      console.log("error", error);
      history.push(`/checkout`);
    }
  };
  return (
    <>
      <div className="payment">
        <Elements stripe={promise}>
          <div className="payment__container">
            <div className="payment__heading">Confirm Purchase</div>
            <video src={globe} autoPlay={true} loop muted />
            <StripeCheckOut token={user} />
          </div>
        </Elements>
      </div>
    </>
  );
}

export default Payment;
