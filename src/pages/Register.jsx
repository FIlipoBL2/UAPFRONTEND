import "./../styles/register.css";
import logo from "../assets/logo.png";
import { A } from "@solidjs/router";

function Register() {
  return (
    <div class="page">
      <div class="register-card">
        <h1>Register</h1>

        <img src={logo} alt="UAP Logo" class="logo" />

        <label>Username</label>
        <input type="text" />

        <label>Email</label>
        <input type="email" />

        <label>Password</label>
        <input type="password" />

        <label>Confirm Password</label>
        <input type="password" />

        <div class="button-group">
          <button>Create Account</button>

          <A href="/">
            <button>Back to Login</button>
          </A>
        </div>
      </div>
    </div>
  );
}

export default Register;