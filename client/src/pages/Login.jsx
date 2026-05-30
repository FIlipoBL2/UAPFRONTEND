import { A, useNavigate } from "@solidjs/router";
import logo from "../assets/logo.png";
import { users, setCurrentUser } from "./userStore";
import { createSignal } from "solid-js"

function Login() {

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const navigate = useNavigate();
  const [error, setError] = createSignal("");
  console.log(users())
  async function handleLogin() {
    try{
      const response = await fetch("http://localhost:8080/api/login", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({
          email : email(),
          password: password()
        }),
      })

      if(response.ok){
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setCurrentUser(data.user)
        navigate("/", {replace : true})

      }else{
        setError("Invalid email or password")
      }
    }catch(err){
      console.log(err);
      setError("Gagal terhubung ke server")
    }
  }

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
        padding: "50px",
        "box-sizing": "border-box",
      }}>
        <h1 style={{
          "text-align": "center",
          "font-size": "64px",
          "margin-bottom": "10px",
          margin: "0 0 10px 0",
        }}>Welcome to Uap</h1>

        <img src={logo} alt="UAP Logo" style={{
          width: "180px",
          margin: "0 auto 10px auto",
          display: "block",
        }} />

        <label style={{ "margin-top": "20px", "margin-bottom": "8px", "font-weight": "bold" }}>Email</label>
        <input
          type="email"
          value={email()}
          onInput={(e) => setEmail(e.target.value)}
          style={{
            height: "40px",
            "border-radius": "8px",
            border: "1px solid #ccc",
            padding: "0 10px",
            "font-size": "16px",
            width: "100%",
            "box-sizing": "border-box",
            "flex-shrink": 0,
          }}
        />

        <label style={{ "margin-top": "20px", "margin-bottom": "8px", "font-weight": "bold" }}>Password</label>
        <input
          type="password"
          value={password()}
          onInput={(e) => setPassword(e.target.value)}
          style={{
            height: "40px",
            "border-radius": "8px",
            border: "1px solid #ccc",
            padding: "0 10px",
            "font-size": "16px",
            width: "100%",
            "box-sizing": "border-box",
            "flex-shrink": 0,
          }}
        />

        <p style={{
          color: "red",
          "font-size": "20px",
          "margin-top": "8px",
          height: "20px",
          margin: "8px 0 0 0",
        }}>
          {error()}
        </p>

        <div style={{
          "margin-top": "40px",
          display: "flex",
          gap: "20px",
        }}>
          <button onClick={handleLogin} style={{
            "background-color": "#2f384d",
            color: "white",
            border: "none",
            "border-radius": "8px",
            padding: "14px 24px",
            "font-size": "18px",
            cursor: "pointer",
          }}>Login</button>

          <A href="/register">
            <button style={{
              "background-color": "#2f384d",
              color: "white",
              border: "none",
              "border-radius": "8px",
              padding: "14px 24px",
              "font-size": "18px",
              cursor: "pointer",
            }}>Register</button>
          </A>

          <A href="/">
            <button style={{
              "background-color": "#2f384d",
              color: "white",
              border: "none",
              "border-radius": "8px",
              padding: "14px 24px",
              "font-size": "18px",
              cursor: "pointer",
            }}>Back Home</button>
          </A>
        </div>
      </div>
    </div>
  );
}

export default Login;