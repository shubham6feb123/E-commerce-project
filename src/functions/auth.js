const axios = require("axios");

exports.currentUser = async (email) => {
  return await axios.post(
    `http://localhost:8080/api/current-user`,
    {},
    {
      headers: {
        email: `${email}`,
      }
    }
  );
};

exports.currentAdmin = async (email) => {
  return await axios.post(
    `http://localhost:8080/api/current-admin`,
    {},
    {
      headers: {
        email: `${email}`,
      }
    }
  );
};
