import React, { useState } from "react";
import { User, Phone, Home, MapPin } from "react-feather";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import fire from "../../services/firebase";
import "./index.css";
import { toast, ToastContainer } from "react-toastify";

const UpdateContact = (props) => {
  const { id } = useParams();

  let history = useHistory();

  const [users, setUsers] = useState(props.users);

  const newUser = users.find((user) => user._id === id);

  const [contactName, setContactName] = useState(newUser.name);
  const [contactNumber, setContactNumber] = useState(newUser.number);
  const [contactAddress, setContactAddress] = useState(newUser.address);

  const handleUpdate = (uid) => {
    const db = fire.firestore();
    db.collection("users")
      .doc(uid)
      .update({
        name: contactName,
        number: contactNumber,
        address: contactAddress,
      })
      .then((res) => {
        toast.dark("Sucessfully Updated");
        setTimeout(() => {
          history.push("/");
        }, 3000);
      })
      .catch((err) => {
        toast.dark("Failed Updation");
      });
  };

  if (!newUser) {
    return <h1>No user found</h1>;
  }
  return (
    <div className="form">
      <h1 className="form__header">Update Contact</h1>
      <div className="form__group">
        <User />
        <input
          type="text"
          autoComplete="off"
          placeholder="Contact Name"
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
          placeholder="Contact Number"
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
          placeholder="Contact Address"
          className="form__textarea"
          onChange={(e) => setContactAddress(e.target.value)}
          value={contactAddress}
        ></textarea>
      </div>

      <button className="form__submit" onClick={() => handleUpdate(id)}>
        Update
      </button>
      <ToastContainer />
    </div>
  );
};

export default UpdateContact;
