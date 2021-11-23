import React, { useRef } from "react";

//css
import "./AdminProductCard.css";

//components
import { Card,Image,Button, Space } from 'antd';
import CurrencyFormat from 'react-currency-format';
import ButtonGroup from "antd/lib/button/button-group";

//icons
import {DeleteFilled,EditFilled} from "@ant-design/icons";



const { Meta } = Card;
function AdminProductCard({product,handleRemove,loading}) {
   const buttonRef = useRef();

    //deleting product function
    const handleDelete = (e)=>{
    // console.log("value",buttonRef.current.id)
      handleRemove(buttonRef.current.id);
    }

  return (
    <>
      <Card
      loading={loading}
    hoverable
    style={{ width: 263}}
    cover={<Image alt="product" src={product.images[1].secure_url} height={180} />}
  >
    <Meta title={product.title} description={<CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'₹'} />}/>
    
    <div style={{marginTop:15,textAlign:"center"}}>
    <Space direction="vertical">
    <ButtonGroup>
      <Space size="small">
        <Button size="middle" type="primary" disabled icon={<EditFilled/>}>Update</Button>
        <Button id={product.slug} ref={buttonRef} size="middle" type="primary" icon={<DeleteFilled/>} onClick={handleDelete}>Delete</Button>
      </Space>
    </ButtonGroup>
    </Space>
    </div>
  </Card>
    </>
  );
}

export default AdminProductCard;

