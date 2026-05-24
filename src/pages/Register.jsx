import "./../styles/register.css";
import logo from "../assets/logo.png";
import { A, useNavigate} from "@solidjs/router";
import { setUsers } from "./userStore";
import { createSignal } from "solid-js";


function Register() {
  /** Buat local state yang nantinya akan dimasukan ke global state(useStore.jsx) */
  const [username, setUsername] = createSignal("")
  const [email, setEmail] = createSignal("")
  const [password, setPassword] = createSignal("")
  const [confirmPassword, setConfirmPassword] = createSignal("")

  /** useNavigate() untuk redirect ke halaman yang lain*/
  const navigate = useNavigate();

  function handleUsers(){
    // Cek password dan re-type password
    if(password() !== confirmPassword()){
      alert("Password tidak cocok!");
      return;
    }

    // Pastikan field tidak kosong
    if(!username() || !password() || !email()){
      alert("Field tidak boleh kosong!")
      return;
    }

    // Buat JSON untuk menyimpan semua datanya 
    const newUser = {
      username : username(),
      email : email(),
      password : password()
    }
    // menggunakan deconstrutor operator kita dapat menambahkan user baru ke dalam array users
    setUsers(prev => [...prev, newUser])

    navigate("/login")
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
        <input 
          type="password"
          value={confirmPassword()}
          onInput={(e) => {setConfirmPassword(e.target.value)}} />

        <div class="button-group">
          <button onClick={handleUsers}>Create Account</button>
          
          <A href="/login">
            <button>Back to Login</button>
          </A>
        </div>
      </div>
    </div>
  );
}

export default Register;