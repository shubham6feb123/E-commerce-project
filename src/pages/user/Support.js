import React, { useEffect, useState } from "react";
//css
import "./support.css";
//components
import { useSelector } from "react-redux";
import { sendMail } from "../../functions/supportMail";
import { message } from "antd";
const Support = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [supportDetails, setSupportDetails] = useState({
    email: user?.email,
    requestSubject: "",
    message: "",
  });
  useEffect(()=>{
      setSupportDetails({...supportDetails,email:user?.email})
  },[user])
  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      if (
        supportDetails.requestSubject !== "" &&
        supportDetails.message !== ""
      ) {
        const sent = await sendMail(user?.token, supportDetails);
        console.log("mail sent",sent);
        message.success({content:"Mail successfully sent!",style:{position:"fixed",bottom:"0px",right:"35%"}})
      }else{
          message.error({content:"Fields are empty",style:{position:"fixed",bottom:"0px",right:"35%"}})
      }
    } catch (error) {
        message.error({content:"Please try again later!",style:{position:"fixed",bottom:"0px",right:"35%"}})
    }
  };

  const onChangeHandler = (e) => {
    // console.log(e.target.name);
    setSupportDetails({ ...supportDetails, [e.target.name]: e.target.value });
  };
  return (
    <div className="support">
      <h3 className="text-center">Support Page</h3>
      <form onSubmit={submitRequest}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            value={user?.email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            readOnly
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="requestType" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="requestType"
            name="requestSubject"
            value={supportDetails.requestSubject}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            type="text"
            name="message"
            value={supportDetails.message}
            className="form-control"
            id="message"
            onChange={onChangeHandler}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            style={{
              background: "#f46326",
              color: "#ffffff",
              padding: "8px 28px",
            }}
            className="btn btn-block bolt px-3"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Support;
