import logo from "../assets/logo.png";
import { A, useNavigate } from "@solidjs/router";
import { setUsers } from "./userStore";
import { createSignal } from "solid-js";

function Register() {
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [confirmPassword, setConfirmPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const navigate = useNavigate();

  function handleUsers() {
    if (!username() || !password() || !email()) {
      setError("Field tidak boleh kosong!");
      return;
    }
    if (password() !== confirmPassword()) {
      setError("Password tidak cocok!");
      return;
    }

    
    setUsers(prev => {
      const maxId = prev.length > 0 ? Math.max(...prev.map(u => u.id)) : 100;

      const newId = maxId + 1;

      const newUser = {
        id: newId,
        username: username(),
        email: email(),
        password: password()
      };
      
      return [...prev, newUser];
    });
    navigate("/login");
  }

  const inputStyle = {
    height: "40px",
    "border-radius": "8px",
    border: "1px solid #ccc",
    padding: "0 10px",
    "font-size": "16px",
    width: "100%",
    "box-sizing": "border-box",
    "flex-shrink": 0,
  };

  const labelStyle = {
    "margin-top": "16px",
    "margin-bottom": "8px",
    "font-weight": "bold",
  };

  const buttonStyle = {
    "background-color": "#2f384d",
    color: "white",
    border: "none",
    "border-radius": "8px",
    padding: "14px 24px",
    "font-size": "18px",
    cursor: "pointer",
  };

  return (
    <div style={{
      margin: 0,
      "font-family": "Arial, sans-serif",
      "background-color": "#efefef",
      height: "100vh",
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
    }}>
      <div style={{
        width: "500px",
        height: "700px",
        "background-color": "#d9d9d9",
        "border-radius": "60px",
        display: "flex",
        "flex-direction": "column",
        padding: "35px",
        "box-sizing": "border-box",
      }}>
        <h1 style={{
          "text-align": "center",
          "font-size": "48px",
          margin: "0 0 10px 0",
        }}>Register</h1>

        <img src={logo} alt="UAP Logo" style={{
          width: "160px",
          margin: "0 auto 10px auto",
          display: "block",
        }} />

        <label style={labelStyle}>Username</label>
        <input
          type="text"
          value={username()}
          onInput={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Password</label>
        <input
          type="password"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword()}
          onInput={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />

        <p style={{
          color: "red",
          "font-size": "20px",
          height: "20px",
          margin: "8px 0 0 0",
        }}>
          {error()}
        </p>

        <div style={{
          "margin-top": "20px",
          display: "flex",
          gap: "20px",
        }}>
          <button onClick={handleUsers} style={buttonStyle}>Create Account</button>
          <A href="/login">
            <button style={buttonStyle}>Back to Login</button>
          </A>
        </div>
      </div>
    </div>
  );
}

export default Register;