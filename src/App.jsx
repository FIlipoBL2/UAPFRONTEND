import { Router, Route } from "@solidjs/router";

// Import pages simpen sini
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home" 
import Search from "./pages/Search";

// Import components simpen sini
import Navbar from "./components/Navbar";

// Bikin component yang hanya di render kalau masuk main pages ( bukan login dan register / udah masuk si aplikasinya )
const mainPages = (props) => {
  return(
    <>
      <Navbar />
      <div>
        {props.children}
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/register" component={Register} />

      <Route component={mainPages}>
        <Route path="/home" component={Home} />
        <Route path="/search" component={Search} />
        {/*Kalau mau nambah page simpen disini biar dia ke load navbar*/}
      </Route>

    </Router>
  );
}

export default App;