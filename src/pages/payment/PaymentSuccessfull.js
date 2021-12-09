import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router';

function PaymentSuccessfull() {
    const history = useHistory();
    return (
        <Result
        status="success"
        title="Successfully Purchased!"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console" onClick={()=>{history.push("/")}} >
            Go Home
          </Button>,
          <Button key="buy" onClick={()=>{history.push("/cart")}}>Buy Again</Button>,
        ]}
      />
    )
}

export default PaymentSuccessfull
