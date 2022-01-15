import React,{useState,useEffect} from 'react';
import {getOrders,changeStatus} from "../../../functions/admin";
import {useSelector,useDispatch} from "react-redux"
import {message} from "antd";
import CurrencyFormatter from "react-currency-format"

function DashboardAdmin() {
    const [orders,setOrders] = useState([]);
    const {user} = useSelector((state)=>({...state}));
    useEffect(()=>{
       if(user)
      loadAllOrders();
    },[user])

    const loadAllOrders = async()=>{
          try{
              const allOrders = await getOrders(user?.token,user?.email);
              // console.log("allorders---->",allOrders);
              setOrders(allOrders.data.order)
          }catch(error){
            message.error({content: "Failed to load orders",
              style: { position: "fixed", bottom: "10px", left: "25px",right:"20px" },})
          }
    };

    const messageAlert = (status,type="success")=>{
      if(type==="success"){
   message.success({content: status,
    style: { position: "fixed", bottom: "10px", left: "25px",right:"20px" },})
    }else{
      message.error({content: status,
          style: { position: "fixed", bottom: "10px", left: "25px",right:"20px" },})
    }
  }

    const handleStatusChange = async(orderId,orderStatus)=>{
       try {
        //  console.log("orderid",orderId,"orderstatus",orderStatus)
           await changeStatus(user?.token,user?.email,orderId,orderStatus);
           messageAlert("Order status updated"); 
       } catch (error) {
        messageAlert("Failed to update order status","error"); 
       } 
    }

    return (
       <>
       <div className='table-responsive'>
       {
         orders.map((order,index)=>(
          <table className="table table-bordered" key={order._id+index} style={{backgroundColor:"#80808047",border:"2px solid black"}}>
          <tbody>
            <tr>
              <th scope="row">Order Id</th>
              <td>{order.paymentIntent.id}</td>
            </tr>
            <tr>
              <th scope="row">Amount</th>
              <td>
              <CurrencyFormatter
                      value={order.paymentIntent.amount/100}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
              </td>
            </tr>
            <tr>
              <th scope="row">Currency</th>
              <td colSpan="2">INR</td>
            </tr>
            <tr>
              <th scope="row">Payment Method</th>
              <td colSpan="2">Card</td>
            </tr>
            <tr>
              <th scope="row">Payment</th>
              <td colSpan="2">{order.paymentIntent.status}</td>
            </tr>
            <tr>
              <th scope="row">Order On</th>
              <td colSpan="2">{
                new Date(order.createdAt).toDateString()
              }</td>
            </tr>
            <tr>
              <th>
                Order Status
              </th>
              <th>
              <select className="form-select" aria-label="Default select example" onChange={(e)=>{handleStatusChange(order._id,e.target.value)}}>
          <option defaultValue={order.orderStatus}>{order.orderStatus}</option>
          <option value="Not Processed">Not Processed</option>
          <option value="Processing">Processing</option>
          <option value="Dispatched">Dispatched</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
              </th>
            </tr>
            <tr>
           <td colSpan={2}>
           <table className="table table-striped align-middle table-bordered" style={{backgroundColor:"#2774f0"}}>
              <thead>
                <tr>
                  <th>
                    Product
                  </th>
                  <th>
                    Price
                  </th>
                  <th>
                    Brand
                  </th>
                  <th>
                    Color
                  </th>
                  <th>
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
          {
            order.products.map((p,index)=>(
              <>
              <tr key={p._id}>
                <td>
                  {p.product.title.substring(0,30)}
                </td>
                <td>
                  {<CurrencyFormatter
                      value={p.product.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />}
                </td>
                <td>
                  {p.product.brand}
                </td>
                <td>
                  {p.color}
                </td>
                <td>
                  {p.count}
                </td>
              </tr>
              </>
            ))
          }
          </tbody>
          </table>
           </td>
            </tr>
          </tbody>
        </table>
         )
         )
       }
       </div>
       </>
    )
}

export default DashboardAdmin
