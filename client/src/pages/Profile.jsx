import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { currentUser, setCurrentUser, setUsers, updateUser } from "./userStore";
import { games } from "../data/mockData";

// ─── Sub-pages ─────────────────────────────────────────────────────────────

function AccountDetails() {
  const user = () => currentUser() ?? { username: "", email: "", password: "" };
  const [showPasswordFields, setShowPasswordFields] = createSignal(false);
  const [oldPassword, setOldPassword] = createSignal("");
  const [newPassword, setNewPassword] = createSignal("");
  const [retypePassword, setRetypePassword] = createSignal("");
  const [message, setMessage] = createSignal("");

  function handleChangePassword() {
    setShowPasswordFields(true);
    setMessage("");
  }

  async function handleSubmitNewPassword() {
    if (!oldPassword() || !newPassword() || !retypePassword()) {
      setMessage("Please fill in all password fields.");
      return;
    }

    // Remove Old password check, cause now its checked at server.js

    if (newPassword() !== retypePassword()) {
      setMessage("New passwords do not match.");
      return;
    }

    try{
      const response = await fetch(`http://localhost:8080/api/users/${currentUser().id}/password`,{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          oldPassword: oldPassword(),
          newPassword: newPassword(),
        }),
      });

      const data = await response.json();
      if (response.ok){
        updateUser({...currentUser(), password: newPassword()});
        setMessage("Password updated successfully!");
        setShowPasswordFields(false);
        setOldPassword("");
        setNewPassword("");
        setRetypePassword("");
      }
    } catch (err){
      setMessage("Failed to connect to server")
    }
  }

  return (
    <div class="content-panel">
      <h2 class="panel-title">Account Details</h2>

      <label class="field-label">Username</label>
      <input class="field-input" type="text" value={user().username} readOnly />

      <label class="field-label">Email</label>
      <input class="field-input" type="email" value={user().email} readOnly />

      {!showPasswordFields() && (
        <button class="btn-dark" onClick={handleChangePassword}>
          Change Password
        </button>
      )}

      {showPasswordFields() && (
        <>
          <label class="field-label">Old Password</label>
          <input
            class="field-input"
            type="password"
            value={oldPassword()}
            onInput={(e) => setOldPassword(e.currentTarget.value)}
          />

          <label class="field-label">New Password</label>
          <input
            class="field-input"
            type="password"
            value={newPassword()}
            onInput={(e) => setNewPassword(e.currentTarget.value)}
          />

          <label class="field-label">Re-type Password</label>
          <div class="submit-row">
            <input
              class="field-input"
              type="password"
              value={retypePassword()}
              onInput={(e) => setRetypePassword(e.currentTarget.value)}
            />
            <button class="btn-dark submit-btn" onClick={handleSubmitNewPassword}>
              Submit New Password
            </button>
          </div>
        </>
      )}

      {message() && <p class="feedback-msg">{message()}</p>}
    </div>
  );
}

function MyReview() {
  const [userReviews, setUserReviews] = createSignal([]);

  onMount(async () => {
    const response = await fetch(`http://localhost:8080/api/reviews/${currentUser()?.id}`);
    if (response.ok) {
      const data = await response.json();
      setUserReviews(data.reviews.map(r => ({
        ...r,
        gameTitle: games.find(g => g.id === r.gameId)?.title || "Unknown Game",
        gameImage: games.find(g => g.id === r.gameId)?.image || null,
      })));
    }
  });

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:8080/api/reviews/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setUserReviews(prev => prev.filter(r => r.id !== id));
    }
  }

  return (
    <div class="content-panel">
      <h2 class="panel-title">My Review</h2>
      {userReviews().length === 0 && (
        <p>You haven't written any reviews yet.</p>
      )}
      {userReviews().map((review) => (
        <div class="review-card">
          <div class="review-thumb">
            {review.gameImage
              ? <img src={review.gameImage} style={{ width: "100%", height: "100%", "object-fit": "cover", "border-radius": "6px" }} />
              : <span>{review.gameTitle}</span>
            }
          </div>
          <div class="review-info">
            <h3 class="review-title">{review.gameTitle}</h3>
            <p class="review-desc">{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Profile Component ────────────────────────────────────────────────

export default function Profile() {
  const navigate = useNavigate();
  // "account" | "reviews"
  const [activePage, setActivePage] = createSignal("account");
  const [showDeleteConfirm, setShowDeleteConfirm] = createSignal(false);

  function handleLogout() {
    // TODO: clear session/token
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/");
  }

  async function handleDeleteAccount() {
    try{
      const response = await fetch(`http://localhost:8080/api/users/${currentUser().id}`,{
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
      })

      if (response.ok){
        setUsers(prev => prev.filter(u => u.id !== currentUser().id));
        setCurrentUser(null);
        localStorage.removeItem("token");
        navigate("/");
      } else{
        const data = await response.json();
        console.error(data.message);
      }
    }catch (err){
      console.log("Failed to connect to server")
    }

  }

  return (
    <>
      <style>{`
        /* Reset / Base */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #d4d4d4;
          min-height: 100vh;
        }

        /* Layout */
        .profile-layout {
          display: flex;
          min-height: calc(100vh - 120px);
        }

        /* Sidebar */
        .sidebar {
          width: 310px;
          flex-shrink: 0;
          background: transparent;
          padding-top: 0;
        }

        .sidebar-item {
          display: block;
          width: 100%;
          padding: 22px 28px;
          text-align: left;
          font-size: 17px;
          font-weight: 400;
          border: none;
          cursor: pointer;
          background: #d4d4d4;
          color: #222;
          border-bottom: 1px solid #bbb;
          transition: background 0.15s;
        }

        .sidebar-item:hover { background: #c8c8c8; }

        .sidebar-item.active {
          background: #a0a0a0;
          font-weight: 600;
        }

        .sidebar-item.logout { background: #d4d4d4; }
        .sidebar-item.logout:hover { background: #c8c8c8; }

        .sidebar-item.delete {
          background: #f8c8c8;
          font-weight: 700;
          color: #222;
        }
        .sidebar-item.delete:hover { background: #f5b0b0; }

        /* Content Panel */
        .content-panel {
          flex: 1;
          background: #d4d4d4;
          padding: 36px 40px;
          min-height: 100%;
        }

        .panel-title {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 28px;
          color: #111;
        }

        /* Form Fields */
        .field-label {
          display: block;
          font-size: 14px;
          color: #333;
          margin-bottom: 6px;
          margin-top: 18px;
        }

        .field-label:first-of-type { margin-top: 0; }

        .field-input {
          display: block;
          width: 320px;
          padding: 10px 14px;
          border: 1.5px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          background: #fff;
          color: #222;
          outline: none;
          transition: border-color 0.2s;
        }

        .field-input:focus { border-color: #555; }

        .field-input[readonly] { background: #f4f4f4; color: #555; }

        /* Buttons */
        .btn-dark {
          margin-top: 24px;
          padding: 13px 24px;
          background: #2d3142;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-dark:hover { background: #1a1f30; }

        .submit-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .submit-row .field-input { margin: 0; }

        .submit-btn { margin-top: 0; }

        .feedback-msg {
          margin-top: 16px;
          font-size: 14px;
          color: #555;
        }

        /* Review Cards */
        .review-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          position: relative;
        }

        .review-thumb {
          width: 120px;
          height: 120px;
          background: #c8c8c8;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          color: #666;
          text-align: center;
          flex-shrink: 0;
        }

        .review-info { flex: 1; }

        .review-title {
          font-size: 18px;
          font-weight: 700;
          color: #111;
          margin-bottom: 6px;
        }

        .review-desc { font-size: 14px; color: #444; }

        .delete-btn {
          position: absolute;
          top: 14px;
          right: 14px;
          background: #555;
          color: #fff;
          border: none;
          border-radius: 6px;
          width: 36px;
          height: 36px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .delete-btn:hover { background: #333; }

        /* Delete Confirm Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal {
          background: #fff;
          border-radius: 10px;
          padding: 36px 40px;
          width: 380px;
          text-align: center;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }

        .modal h3 {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 14px;
          color: #111;
        }

        .modal p { font-size: 15px; color: #555; margin-bottom: 28px; }

        .modal-actions { display: flex; gap: 14px; justify-content: center; }

        .btn-cancel {
          padding: 11px 24px;
          background: #e0e0e0;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-cancel:hover { background: #ccc; }

        .btn-danger {
          padding: 11px 24px;
          background: #e74c3c;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-danger:hover { background: #c0392b; }
      `}</style>

      {/* ── Body ── */}
      <div class="profile-layout">
        {/* Sidebar */}
        <aside class="sidebar">
          <button
            class={`sidebar-item ${activePage() === "account" ? "active" : ""}`}
            onClick={() => setActivePage("account")}
          >
            Account Details
          </button>
          <button
            class={`sidebar-item ${activePage() === "reviews" ? "active" : ""}`}
            onClick={() => setActivePage("reviews")}
          >
            My Review
          </button>
          <button class="sidebar-item logout" onClick={handleLogout}>
            Log Out
          </button>
          <button
            class="sidebar-item delete"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </button>
        </aside>

        {/* Main content */}
        <main>
          {activePage() === "account" && <AccountDetails />}
          {activePage() === "reviews" && <MyReview />}
        </main>
      </div>

      {/* ── Delete Confirm Modal ── */}
      {showDeleteConfirm() && (
        <div class="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div class="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Account?</h3>
            <p>This action is permanent and cannot be undone. Are you sure?</p>
            <div class="modal-actions">
              <button class="btn-cancel" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button class="btn-danger" onClick={handleDeleteAccount}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}