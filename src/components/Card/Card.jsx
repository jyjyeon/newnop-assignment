import React, { useState } from "react";
import "./style.css";
import Modal from "../Modal/modal";

const Card = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);

  //check if userData exists
  if (!userData || Object.keys(userData).length === 0) {
    return <div>No user data available</div>;
  }

  return (
    <>
      <div className="user-card" onClick={() => setIsOpen(true)}>
        <img
          alt="pic"
          src={userData.picture.large}
          style={{ width: "140px", height: "140px" }}
        />
        <div className="user-profile">
          <div className="user-name">
            {userData.name.title} {userData.name.first} {userData.name.last}
          </div>
          <div className="user-email">Email: {userData.email}</div>
          <div className="user-phone">Phone: {userData.phone}</div>
        </div>
      </div>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        userData={userData}
      />
    </>
  );
};

export default Card;
