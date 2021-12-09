import React from "react";
import deliveryDetails from "../../functions/deliveryDetails";
import {message} from "antd";


function CheckOutForm({details,setDetails,authtoken}) {
  const indianState = [
    {
      abbreviation: "AN",
      name: "Andaman and Nicobar Islands",
    },
    {
      abbreviation: "AP",
      name: "Andhra Pradesh",
    },
    {
      abbreviation: "AR",
      name: "Arunachal Pradesh",
    },
    {
      abbreviation: "AS",
      name: "Assam",
    },
    {
      abbreviation: "BR",
      name: "Bihar",
    },
    {
      abbreviation: "CG",
      name: "Chandigarh",
    },
    {
      abbreviation: "CH",
      name: "Chhattisgarh",
    },
    {
      abbreviation: "DH",
      name: "Dadra and Nagar Haveli",
    },
    {
      abbreviation: "DD",
      name: "Daman and Diu",
    },
    {
      abbreviation: "DL",
      name: "Delhi",
    },
    {
      abbreviation: "GA",
      name: "Goa",
    },
    {
      abbreviation: "GJ",
      name: "Gujarat",
    },
    {
      abbreviation: "HR",
      name: "Haryana",
    },
    {
      abbreviation: "HP",
      name: "Himachal Pradesh",
    },
    {
      abbreviation: "JK",
      name: "Jammu and Kashmir",
    },
    {
      abbreviation: "JH",
      name: "Jharkhand",
    },
    {
      abbreviation: "KA",
      name: "Karnataka",
    },
    {
      abbreviation: "KL",
      name: "Kerala",
    },
    {
      abbreviation: "LD",
      name: "Lakshadweep",
    },
    {
      abbreviation: "MP",
      name: "Madhya Pradesh",
    },
    {
      abbreviation: "MH",
      name: "Maharashtra",
    },
    {
      abbreviation: "MN",
      name: "Manipur",
    },
    {
      abbreviation: "ML",
      name: "Meghalaya",
    },
    {
      abbreviation: "MZ",
      name: "Mizoram",
    },
    {
      abbreviation: "NL",
      name: "Nagaland",
    },
    {
      abbreviation: "OR",
      name: "Odisha",
    },
    {
      abbreviation: "PY",
      name: "Puducherry",
    },
    {
      abbreviation: "PB",
      name: "Punjab",
    },
    {
      abbreviation: "RJ",
      name: "Rajasthan",
    },
    {
      abbreviation: "SK",
      name: "Sikkim",
    },
    {
      abbreviation: "TN",
      name: "Tamil Nadu",
    },
    {
      abbreviation: "TS",
      name: "Telangana",
    },
    {
      abbreviation: "TR",
      name: "Tripura",
    },
    {
      abbreviation: "UP",
      name: "Uttar Pradesh",
    },
    {
      abbreviation: "UK",
      name: "Uttarakhand",
    },
    {
      abbreviation: "WB",
      name: "West Bengal",
    },
  ];


  const handleDetails = (e)=>{
      // console.log("handleDetails",e.target.value,"<-------",e.target.name)
      setDetails({...details,[e.target.name]:e.target.value})
  }

  const submitDetails = async(e)=>{
    try{e.preventDefault();
  //  console.log("details------------->",details)
   const detail = await deliveryDetails(details,authtoken)
   console.log("save details",detail);
   message.success({
    content: "Delivery address saved!",
    style: {
      position: "fixed",
      bottom: "10px",
      left: "25px",
      right: "20px",
    },
  })
  }catch(e){
     console.log("failed to save details",e)
   }
  }
  return (
    <form style={{background:"#ffffff",paddingBottom:"12px",width:"100%"}} className="px-2" onSubmit={submitDetails} >
      <div className="form-row">
        <div className="form-group col-md-6 py-2">
          <label htmlFor="inputName">Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Name"
            value={details?.name}
            onChange={handleDetails}
          />
        </div>
        <div className="form-group col-md-6 py-2">
          <label htmlFor="inputMobile">Mobile Number</label>
          <input
          name="mobileNumber"
            type="number"
            className="form-control"
            id="inputMobile"
            placeholder="10-digit mobile number"
            value={details?.mobileNumber}
            onChange={handleDetails}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-6 py-2">
          <label htmlFor="inputPincode">Pincode</label>
          <input
          name="pincode"
            type="number"
            className="form-control"
            id="inputPincode"
            placeholder="Pincode"
            value={details?.pincode}
            onChange={handleDetails}
          />
        </div>
        <div className="form-group col-md-6 py-2">
          <label htmlFor="inputCity">City</label>
          <input
          name="city"
            type="text"
            className="form-control"
            id="inputCity"
            placeholder="City"
            value={details?.city}
            onChange={handleDetails}
          />
        </div>
      </div>
      <div className="form-group py-2">
        <label htmlFor="inputAddress">Address</label>
        <input
        name="address"
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
          value={details?.address}
          onChange={handleDetails}
        />
      </div>

      <div className="form-row">

        <div className="form-group col-md-6 py-2">
          <label htmlFor="inputState">State</label>
          <select id="inputState" className="form-control" value={details?.state} name="state" onChange={handleDetails}>
            {indianState.map((state,index)=>(
              <option key={index} defaultValue={state.abbreviation}>{state.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group col-md-6 py-2">
          <label htmlFor="inputZip">Zip</label>
          <input type="text" className="form-control" id="inputZip" value={details?.zip} name="zip" onChange={handleDetails}/>
        </div>
      </div>
      <button style={{background:"#f46326",color:"#ffffff",padding:"8px 28px"}} type="submit" className="btn bolt">
        Delivery here
      </button>
    </form>
  );
}

export default CheckOutForm;
