import React from 'react';
import Lottie from 'react-lottie';
import './pagenotfound.css';


function NotFound({history}) {
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: require('../../lottieAnimations/PageNotFound.json'),
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <div className="page__not__found">
           <div className="lottie__conatiner"><Lottie options={defaultOptions}
              height={371}
              width={355}
             /></div>
             <button className="page__not__found__button" onClick={()=>{history.push("/")}}>Back To Home</button>
            </div>
    )
}

export default NotFound;
