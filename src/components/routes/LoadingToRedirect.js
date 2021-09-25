import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoadingToRedirect.css";

//components
import { Spin} from 'antd'


function LoadingToRedirect() {
  const [count, setCount] = useState(5);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      //
      setCount(count - 1);
    }, 1000);

    //redirect once count is = to 0
    count === 0 && history.push("/");

    //cleanup
    return () => clearInterval(interval);
  }, [count,history]);



  return (
    <>
      <div className="loading__to__redirect">
        <Spin size="large"/>
      </div>
    </>
  );
}
export default LoadingToRedirect;
