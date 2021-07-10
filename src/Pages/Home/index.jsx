import React, { useEffect } from "react";
import { useState } from "react";
import { Search, Trash2, Edit } from "react-feather";
import { Link } from "react-router-dom";
import fire from "../../services/firebase";
import "./index.css";
import "./table.css";

import { ToastContainer, toast } from "react-toastify";

const Home = (props) => {
  const [users, setUsers] = useState(props.users);
  const [query, setQuery] = useState("");

  const handleRemove = async (id) => {
    const filteredUsers = users.filter((user) => user._id !== id);
    setUsers(filteredUsers);

    const db = fire.firestore();
    const res = await db.collection("users").doc(id).delete();
    console.log(res);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  const newUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.number.toString().includes(query.toString())
    );
  });

  if (users.length < 1) {
    return (
      <>
        <h1 className="not_found">No user found</h1>
      </>
    );
  }

  return (
    <div className="home">
      <div className="home__search">
        <Search />
        <input
          onChange={handleSearch}
          type="text"
          className="home__input"
          placeholder="Search"
          autoComplete={`off`}
        />
      </div>
      <div className="home__container">
        <table className="table">
          <thead>
            <tr className="table__row">
              <th className="table__head">No.</th>
              <th className="table__head">Contact Name</th>
              <th className="table__head">Contact Number</th>
              <th className="table__head">Contact Address</th>
              <th className="table__head">Delete</th>
              <th className="table__head">Edit</th>
            </tr>
          </thead>
          <tbody>
            {newUsers.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td className="table__data">{index + 1}</td>
                  <td className="table__data">{user.name}</td>
                  <td className="table__data">{user.number}</td>
                  <td className="table__data">{user.address}</td>
                  <td className="table__data">
                    <Trash2
                      onClick={() => handleRemove(user._id)}
                      className="table__icon"
                    />
                  </td>
                  <td className="table__data">
                    <Link to={`/update-contact/${user._id}`}>
                      <Edit className="table__icon" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
