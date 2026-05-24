import { Router, Route } from "@solidjs/router";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register} />
      <Route path="/profile" component={Profile}/>
    </Router>
  );
}

export default App;