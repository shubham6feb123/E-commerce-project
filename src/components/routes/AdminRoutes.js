import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../routes/LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

function AdminRoutes({ children, ...rest }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [OK, setOK] = useState(false);
  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.email)
        .then((res) => {
        //   console.log("response", res);
          setOK(true);
        })
        .catch((e) => {
          setOK(false);
        //   console.log("error", e);
        });
    }
  }, [user]);

  return OK ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
}

export default AdminRoutes;
