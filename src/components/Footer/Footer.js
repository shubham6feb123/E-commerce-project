import React from "react";
//css
import "./footer.css";
//components
import { GithubFilled,LinkedinFilled,MailFilled,PhoneOutlined  } from "@ant-design/icons";
function Footer() {
  return (
    <div className="footer__container">
      <div className="app__details">
        FlipShop || All Right Reserved || no © Copyright || 💖 From Shubham
        Sharma
      </div>
      <div className="developer__details">
        Contact Info{" "}
        <a href="https://github.com/shubham6feb123" target="_blank">
          <span>
            <GithubFilled />
          </span>
        </a>
        <a href="https://www.linkedin.com/in/shubham-sharma-400a29203/" target="_blank">
          <span>
          <LinkedinFilled />
          </span>
        </a>
        <a href = "mailto: maarahuls555@gmail.com" target="_blank">
          <span>
          <MailFilled />
          </span>
        </a>
        <a href = "tel:+917723916804" target="_blank">
          <span>
          <PhoneOutlined />
          </span>
        </a>
      </div>
    </div>
  );
}

export default Footer;
