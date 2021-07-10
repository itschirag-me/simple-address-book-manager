import React, { useState } from "react";
import { User, Phone, MapPin } from "react-feather";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import fire from "../../services/firebase";
import "./index.css";

const AddContact = () => {
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactAddress, setContactAddress] = useState("");

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = {
      name: contactName,
      number: contactNumber,
      address: contactAddress,
    };

    if (user.name === "" || user.number === "" || user.address === "") {
      toast.dark("Please fill all fields");
    } else {
      const db = await fire.firestore();
      const data = await db.collection("users").add(user);
      if (data) {
        setContactName("");
        setContactNumber("");
        setContactAddress("");
        toast.dark("Successfully added");
        setTimeout(() => {
          history.push("/");
        }, 3000);
      }
    }
  };

  return (
    <div className="form">
      <ToastContainer />
      <h1 className="form__header">Add Contact</h1>
      <div className="form__group">
        <User />
        <input
          type="text"
          autoComplete="off"
          placeholder="Name"
          className="form__input"
          onChange={(e) => setContactName(e.target.value)}
          value={contactName}
        />
      </div>

      <div className="form__group">
        <Phone />
        <input
          type="text"
          autoComplete="off"
          placeholder="Phone number"
          className="form__input"
          onChange={(e) => setContactNumber(e.target.value)}
          value={contactNumber}
        />
      </div>

      <div className="form__group_textarea">
        <MapPin />
        <textarea
          autoComplete="off"
          rows="3"
          placeholder="Address"
          className="form__textarea"
          onChange={(e) => setContactAddress(e.target.value)}
          value={contactAddress}
        ></textarea>
      </div>

      <button className="form__submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddContact;
