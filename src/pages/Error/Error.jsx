import React from "react";
import "./style.css";

const Error = ({ error }) => {
  console.log(error);

  return (
    <div className="error-page">
      <h2>Error!!</h2>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default Error;
