import Container from "./components/Container";
import Navbar from "./components/Navbar";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import AddContact from "./Pages/AddContact";
import Home from "./Pages/Home";
import UpdateContact from "./Pages/UpdateContact";
import { useEffect, useState } from "react";
import fire from "./services/firebase";

const App = () => {
  const [users, setUsers] = useState();

  const [theme, setTheme] = useState("#333");

  useEffect(() => {
    const fetchUser = async () => {
      document.title = "Simple Address Book Manager";
      const db = fire.firestore();
      const userList = await db.collection("users").get();
      const newList = [];
      userList.forEach((doc) => {
        newList.push({
          _id: doc.id,
          ...doc.data(),
        });
      });

      console.log(newList);
      setUsers(newList);
    };
    fetchUser();
  });

  if (!users) {
    return (
      <>
        <h1 className="not_found">Loading</h1>
      </>
    );
  }

  return (
    <div>
      <style type="text/css">{`
      :root {
        --color-primary: ${theme};
      }
      .Toastify__progress-bar {
        background-color: ${theme}
      }

      .Toastify__toast--dark {
        background-color: ${theme}
      } 

      .Toastify__toast-body {
        margin: auto 0;
        -ms-flex: 1 1 auto;
            flex: 1 1 auto;
        padding: 6px;
      }

      .Toastify__toast-container {
        margin-top : 4rem;
      }
  `}</style>
      <Navbar setTheme={setTheme} />
      <Container>
        <Switch>
          <Route exact path="/update-contact/:id">
            <UpdateContact users={users} />
          </Route>
          <Route exact path="/contact">
            <AddContact />
          </Route>
          <Route exact path="/">
            <Home users={users} />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
