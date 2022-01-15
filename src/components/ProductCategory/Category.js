import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//css
import "./category.css";

function Category() {
    const dispatch = useDispatch();
  const history = useHistory();
    const onClickHandler = (e)=>{
        console.log("clicked",e.target.innerText)
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: e.target.innerText },
          });
    
          history.push(`/search?${e.target.innerText}`);
    }
    return (
        <div className="product__category">
        <div className="category"> 
            <img className="category__img" src="https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100"
            alt="Grocery"/>
            <span onClick={onClickHandler}>Grocery</span>
        </div>
        <div className="category"> 
            <img className="category__img" src="https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100"
            alt="mobiles"/>
            <span onClick={onClickHandler}>Mobiles</span>
        </div>
        <div className="category"> 
            <img className="category__img" src="https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100"
            alt="electronics"/>
            <span onClick={onClickHandler}>Electronics</span>
        </div>
        <div className="category"> 
            <img className="category__img" src="https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100"
            alt="appliances"/>
            <span onClick={onClickHandler}>Appliances</span>
        </div>
        <div className="category"> 
            <img className="category__img" src="https://rukminim1.flixcart.com/image/312/312/kcp4osw0/computer/t/f/z/asus-na-original-imaftrgwna6snfn8.jpeg?q=70"
            alt="laptops"/>
            <span onClick={onClickHandler}>Laptops</span>
        </div>
        </div>
    )
}

export default Category
