import { createSignal } from "solid-js";
import logo from "../assets/logo.png";
import { currentUser } from "../pages/userStore";

function Navbar() {
  const [searchQuery, setSearchQuery] = createSignal("");
  const activeUser = () => currentUser()?.username || "Guest";

  return (
    <nav style={{
      display: "flex",
      "justify-content": "space-between",
      "align-items": "center",
      "background-color": "#a4a4a4ff",
      padding: "15px 40px",
      "box-shadow": "0 4px 6px -1px #66666623",
      position: "sticky",
      top: 0,
      "z-index": 1000
    }}>
      {/* Left side: Logo */}
      <div style={{ flex: 1, display: "flex", "justify-content": "flex-start" }}>
        <img src={logo} alt="Logo" style={{ width: "150px" }} />
      </div>

      {/* Center: Search Bar */}
      <form class="search-bar" style={{ flex: 1, display: "flex", "justify-content": "center" }}>
        <input
          type="search"
          placeholder="Search for games..."
          value={searchQuery()}
          onInput={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", "max-width": "400px", padding: "10px 15px", "border-radius": "20px", border: "1px solid #bababaff", "font-size": "16px" }}
        />
      </form>

      {/* Right side: User Profile */}
      <div style={{ flex: 1, display: "flex", "justify-content": "flex-end", "align-items": "center", gap: "10px" }}>
        <span style={{ "font-weight": "bold", color: "#333", "font-size": "16px" }}>
          {activeUser()}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
