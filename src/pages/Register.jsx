import "./../styles/register.css";
import logo from "../assets/logo.png";
import { A, useNavigate} from "@solidjs/router";
import { users, setUsers } from "./userStore";
import { createSignal } from "solid-js";


function Register() {
  /** Buat local state yang nantinya akan dimasukan ke global state(useStore.jsx) */
  const [username, setUsername] = createSignal("")
  const [email, setEmail] = createSignal("")
  const [password, setPassword] = createSignal("")
  /** useNavigate() untuk redirect ke halaman yang lain*/
  const navigate = useNavigate();

  function handleUsers(){
    // Buat JSON untuk menyimpan semua datanya 
    const newUser = {
      username : username(),
      email : email(),
      password : password()
    }
    // menggunakan deconstrutor operator kita dapat menambahkan user baru ke dalam array users
    setUsers(prev => [...prev, newUser])

    navigate("/")
  }
  return (
    <div class="page">
      <div class="register-card">
        <h1>Register</h1>

        <img src={logo} alt="UAP Logo" class="logo" />

        <label>Username</label>
        <input 
          type="text"
          value={username()}
          onInput={(e) => {setUsername(e.target.value)}}/>

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

        <label>Confirm Password</label>
        <input type="password" />

        <div class="button-group">
          <button onClick={handleUsers}>Create Account</button>
          
          <A href="/">
            <button>Back to Login</button>
          </A>
        </div>
      </div>
    </div>
  );
}

export default Register;