import { useNavigate } from "@solidjs/router";
import { loggedIn } from "./userStore";

// ─── Temporary: swap this with your real auth store/context ───────────────
// e.g. import { useAuth } from "./AuthContext";
// For now, just toggle this manually to test both states:
const IS_LOGGED_IN = false;
// ─────────────────────────────────────────────────────────────────────────

export default function Home() {
    const navigate = useNavigate();
  // Replace with your real auth check, e.g.:
  // const { isLoggedIn } = useAuth();
    const isLoggedIn = loggedIn();

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #d4d4d4;
          font-family: 'Segoe UI', sans-serif;
          min-height: 100vh;
        }

        /* ── Navbar (matches Profile/Login pages) ── */
        .navbar {
          background: #d4d4d4;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 120px;
          border-bottom: 1px solid #bbb;
        }

        .navbar-logo {
          font-family: monospace;
          font-size: 32px;
          color: #222;
        }

        .search-bar {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 8px 14px;
          width: 380px;
          gap: 8px;
        }

        .search-bar input {
          border: none;
          outline: none;
          font-size: 15px;
          color: #555;
          width: 100%;
          background: transparent;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        /* ── Hero ── */
        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 120px);
          gap: 20px;
          text-align: center;
          padding: 40px 20px;
        }

        .hero h1 {
          font-size: 42px;
          font-weight: 800;
          color: #111;
          letter-spacing: -1px;
        }

        .hero p {
          font-size: 17px;
          color: #555;
          max-width: 420px;
          line-height: 1.6;
        }

        .btn-dark {
          padding: 14px 32px;
          background: #2d3142;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-dark:hover { background: #1a1f30; }

        .btn-outline {
          padding: 14px 32px;
          background: transparent;
          color: #2d3142;
          border: 2px solid #2d3142;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .btn-outline:hover {
          background: #2d3142;
          color: #fff;
        }

        .btn-group {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Navbar avatar (when logged in) */
        .navbar-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #2d3142;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .navbar-avatar:hover { opacity: 0.85; }
      `}</style>

      {/* ── Navbar ── */}
      <nav class="navbar">
        <div class="navbar-logo">⚙</div>

        <div class="search-bar">
          <input type="text" placeholder="Search for games..." />
          <span>🔍</span>
        </div>

        <div class="nav-right">
          {isLoggedIn ? (
            // Avatar navigates to profile when logged in
            <div
              class="navbar-avatar"
              onClick={() => navigate("/profile")}
              title="Go to Profile"
            >
              VH
            </div>
          ) : (
            // Login button in navbar when logged out
            <button class="btn-dark" onClick={() => navigate("/login")}>
              Log In
            </button>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <main class="hero">
        <h1>Welcome to the Game Store</h1>

        {isLoggedIn ? (
          <>
            <p>You're logged in. Head to your profile to manage your account and reviews.</p>
            <button class="btn-dark" onClick={() => navigate("/profile")}>
              Go to Profile
            </button>
          </>
        ) : (
          <>
            <p>Discover, review, and track your favourite games. Log in or create an account to get started.</p>
            <div class="btn-group">
              <button class="btn-dark" onClick={() => navigate("/login")}>
                Log In
              </button>
              <button class="btn-outline" onClick={() => navigate("/register")}>
                Register
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}