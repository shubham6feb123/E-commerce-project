import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import "./register.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router";


function CompleteRegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    // console.log(window.localStorage.getItem("EmailForRegistration"));
    setEmail(window.localStorage.getItem("EmailForRegistration"));
  }, []);



  const submit = async (e) => {

    //validation for password
    if (!password) {
      toast.error(`Password is required`, { position: "bottom-right" });
      return;
    } else if (password.length < 6) {
      toast.error(`Password sholud be atleast 6 characters long`, {
        position: "bottom-right",
      });
      return;
    } else
      try {
        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );
        if (result.user.emailVerified) {
          //deleting email from localstorage
          window.localStorage.removeItem("EmailForRegistration");
          const user = await auth.currentUser;
         await user.updatePassword(password);
        await user.getIdTokenResult();
          // console.log("idTokenResult", idTokenResult);
          // console.log("newPassword", newPassword);

          //Redirect user
          history.push("/");
        } else {
          console.log(
            "user is not verified",
            window.localStorage.getItem("EmailForRegistration")
          );
        }
      } catch (error) {
        console.log(error);
        toast.error(
          `Verification link sent to email has been expired or not working. Try to register again `,
          {
            position: "bottom-right",
          }
        );
      }
  };
  return (
    <>
      <div className="register">
        <div className="register__container">
          <div className="register__logo" title="TSS">
            <img src="./images/flipkartLogo-removebg-preview.png" alt="TSS" />
          </div>
          <div className="register__form">
            <div className="register__form__field">
              <h2>
                <img src="./images/avatar.png" alt="Register to TSS" />
              </h2>
              <div className="register__form__field__label">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  autoFocus
                  value={email}
                  placeholder="abcxyz@gmail.com"
                  disabled
                />
                <label htmlFor="email">Password</label>
                <input
                  type="password"
                  name="password"
                  autoFocus
                  value={password}
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="register__form__field__button">
                <button type="submit" onClick={submit}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteRegistrationForm;
