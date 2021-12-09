import React from 'react'
import { Result, Button } from 'antd';
import {useHistory} from "react-router-dom"


function PaymentFailed() {
    const history = useHistory();
    return (
        <Result
        status="error"
        title="Purchase Failed"
        subTitle="Please check your card credentials or something went wrong."
        extra={[
          <Button type="primary" key="console" onClick={()=>{history.push("/")}}>
            Go Home
          </Button>,
          <Button key="buy" onClick={()=>{history.push("/cart")}}>Go to Cart</Button>,
        ]}
      ></Result>
    )
}

export default PaymentFailed
