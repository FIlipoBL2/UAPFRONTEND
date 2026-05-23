import { createSignal } from "solid-js";
import { currentUser } from "./userStore";
import logo from "../assets/logo.png";

function Home() {
  const [searchQuery, setSearchQuery] = createSignal("");

  // Get current user from the global store
  const activeUser = () => currentUser()?.username || "USER";

  return (
    <main class="home-page" style={{ padding: "40px", "font-family": "Arial, sans-serif" }}>

      {/* 1. Navbar */}
      <nav style={{ display: "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "40px" }}>
        <img src={logo} alt="Logo" style={{ width: "150px" }} />
        <form class="search-bar">
          <input
            type="search"
            placeholder="Search for games..."
            value={searchQuery()}
            onInput={(e) => setSearchQuery(e.target.value)}
            style={{ width: "300px", padding: "10px 15px", "border-radius": "20px", border: "1px solid #bababaff", "font-size": "16px" }}
          />
        </form>
      </nav>

      {/* 2.1.1 Greeting Card */}
      <header class="greeting-card" style={{ "background-color": "#d9d9d9", padding: "30px", "border-radius": "30px", "margin-bottom": "50px", "max-width": "350px" }}>
        <h2 style={{ margin: "0 0 10px 0", "font-size": "24px" }}>HELLO! {activeUser()} 👋</h2>
        <p style={{ margin: 0, color: "#333", "font-size": "16px" }}>What Would You Like To Review Today ?</p>
      </header>

    </main>
  );
}

export default Home;
