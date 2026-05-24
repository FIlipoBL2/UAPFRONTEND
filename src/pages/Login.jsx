import "./../styles/login.css";
import { A, useNavigate } from "@solidjs/router";
import logo from "../assets/logo.png";
import { users, setLoggedIn } from "./userStore";
import { createSignal } from "solid-js";

  function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = createSignal("")
    const [password, setPassword] = createSignal("")
    
    function handleLogin(){
    let isLoginSuccess = false;

    for(let i=0; i<users().length; i++){
      if(users()[i].email == email() && users()[i].password == password()){
        isLoginSuccess = true;
        break;
      }
    }

    if(isLoginSuccess){
      setLoggedIn(true);
      navigate("/");        // add this
    } else {
      alert("Email atau password salah!");  // add this
    }
  }

  return (
    <div class="page">
      <div class="login-card">
        <h1>Welcome to Uap</h1>
        <img src={logo} alt="UAP Logo" class="logo" />

        <label>Email</label>
        <input 
          type="email" 
          value={email()}
          onInput={(e) => {setEmail(e.target.value)}}
          />

        <label>Password</label>
        <input 
          type="password"
          value={password()}
          onInput={(e) => {setPassword(e.target.value)}}
          />

        <div class="button-group">
          <button onClick={handleLogin}>Login</button>

          <A href="/register">
            <button>Register</button>
          </A>
        </div>
      </div>
    </div>
  );
}

export default Login;