import { Router, Route } from "@solidjs/router";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/register" component={Register} />
    </Router>
  );
}

export default App;