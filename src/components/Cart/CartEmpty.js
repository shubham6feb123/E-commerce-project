//css
import { useHistory } from "react-router";
import "./cart.css";

//images
import cart from "./cart.png";

//components


const CartEmpty = ({heading,text1,text2,button}) => {
    const history = useHistory();
  return (
    <>
      <div className="cart__empty__container">
        <div className="cart__empty__heading">
          <span className="empty__heading">{heading}</span>
        </div>
       <section className="cart__empty__section">
           <img className="cart__empty__img" src={cart} alt="empty cart"/>
           <div className="cart__empty__text">{text1}</div>
           <div className="cart__empty__add__text">{text2}</div>
           <div className="cart__empty__shop__button">
               <button onClick={()=>{history.push("/")}}>{button}</button>
           </div>
       </section>
      </div>
    </>
  );
};

export default CartEmpty;
