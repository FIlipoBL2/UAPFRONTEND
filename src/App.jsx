import { Router, Route } from "@solidjs/router";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
function App() {
  return (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/home" component={Home} />
      <Route path="/home" component={Home} />
    </Router>
  );
}

export default App;