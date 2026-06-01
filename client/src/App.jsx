import { Router, Route } from "@solidjs/router";
import { createEffect } from "solid-js";
import { currentUser, setCurrentUser } from "./pages/userStore";

// Import pages simpen sini
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Game from "./pages/Game"

// Import components simpen sini
import Navbar from "./components/Navbar";

// Bikin component yang hanya di render kalau masuk main pages ( bukan login dan register / udah masuk si aplikasinya )
const mainPages = (props) => {
  return (
    <>
      <Navbar />
      <div>
        {props.children}
      </div>
    </>
  );
};

function App() {
  
  createEffect(async () => {
    if (!currentUser()) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`http://localhost:8080/api/users/${token}`);
          if (response.ok) {
            const data = await response.json();
            setCurrentUser(data.user);
          } else {
            localStorage.removeItem("token");
          }
        } catch (err) {
          console.error("Failed to restore session");
        }
      }
    }
  });
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={mainPages}>
        <Route path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/profile" component={Profile} />
        <Route path="/details/:id" component={Game} />
        {/*Kalau mau nambah page simpen disini biar dia ke load navbar*/}
      </Route>

    </Router>
  );
}

export default App;