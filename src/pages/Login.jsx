import "./../styles/login.css";
import { A, useNavigate } from "@solidjs/router";
import logo from "../assets/logo.png";
import { users } from "./userStore";
import {createSignal } from "solid-js"

function Login() {

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();
  function handleLogin(){
    //cek apakah email ada di users
    let isLoginSuccess = false;

    //looping untuk semua isi array users cari username dan password yang sesuai
    for(let i=0; i<users().length; i++){
      if(users()[i].email == email() && users()[i].password == password()){
        isLoginSuccess = true;
        break;
      }
    }
    
    // kalau username dan pasword match maka kita redirect ke halaman home dimana kita replaceUrl 
    // supaya user tidak dapat balik ke halaman login
    if(isLoginSuccess){
      navigate("/home", {replace : true});
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