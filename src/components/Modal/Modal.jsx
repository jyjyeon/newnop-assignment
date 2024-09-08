import React from "react";
import "./style.css";

const Modal = ({ open, userData, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="modal-overlay" />
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <div className="modal-container">
          <div className="modal-img">
            <img
              alt="pic"
              src={userData.picture.large}
              style={{ width: "160px", height: "160px" }}
            />
            <div className="vertical-line" />
            <div className="modal-profile">
              <div className="user-name">
                {userData.name.title} {userData.name.first} {userData.name.last}
              </div>
              <div className="user-phone">Age: {userData.dob.age}</div>
              <div className="user-email">
                Country: {userData.location.country} {userData.location.state}
              </div>
              <div className="user-contact">Contact me!</div>
              <div className="user-email">Email: {userData.email}</div>
              <div className="user-phone">Phone: {userData.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
