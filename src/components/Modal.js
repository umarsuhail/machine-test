import React, { useState } from "react";
import "./Modal.css";
export default function Modal({ isOpen, handleClose, task, handleSubmit }) {
  const [userInput, setinput] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const handleCloseModal = (e) => {
    e.preventDefault();
    handleClose();
  };
  const handleChange = ({ target: { name, value } }) => {
    setinput({ ...userInput, [name]: value });
  };
  return (
    <div
      id="myModal"
      className="modal"
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <div className="modal-content">
        <span className="close" onClick={(e) => handleCloseModal(e)}>
          &times;
        </span>

        <p>{task} profile</p>
        <form className="form form-group">
          <label>
            first name:
            <input className="form-control" type="text" name="first_name" onChange={(e) => handleChange(e)} />
          </label>
          <label>
            last name:
            <input className="form-control" type="text" name="last_name" onChange={(e) => handleChange(e)} />
          </label>
          <label>
            email:
            <input className="form-control" type="text" name="email" onChange={(e) => handleChange(e)} />
          </label>
          <input
            type="submit"
            value="Submit"
            onClick={(e) => handleSubmit(e, task, userInput)}
          />
        </form>
      </div>
    </div>
  );
}
