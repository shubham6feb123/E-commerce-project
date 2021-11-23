//css
import { useHistory } from "react-router";
import "./cart.css";

//images
import cart from "./cart.png";

//components


const CartEmpty = () => {
    const history = useHistory();
  return (
    <>
      <div className="cart__empty__container">
        <div className="cart__empty__heading">
          <span className="empty__heading">My Cart</span>
        </div>
       <section className="cart__empty__section">
           <img className="cart__empty__img" src={cart} alt="empty cart"/>
           <div className="cart__empty__text">Your cart is empty!</div>
           <div className="cart__empty__add__text">Add items to it now.</div>
           <div className="cart__empty__shop__button">
               <button onClick={()=>{history.push("/")}}>Shop now</button>
           </div>
       </section>
      </div>
    </>
  );
};

export default CartEmpty;
