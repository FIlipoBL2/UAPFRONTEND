import "./../styles/login.css";
import { A } from "@solidjs/router";
import logo from "../assets/logo.png";
import { users, setUsers } from "./userStore";

function Login() {

  console.log(users())
  return (
    <div class="page">
      <div class="login-card">
        <h1>Welcome to Uap</h1>
        <img src={logo} alt="UAP Logo" class="logo" />

        <label>Email</label>
        <input type="email" />

        <label>Password</label>
        <input type="password" />

        <div class="button-group">
          <button>Login</button>

          <A href="/register">
            <button>Register</button>
          </A>
        </div>
      </div>
    </div>
  );
}

export default Login;