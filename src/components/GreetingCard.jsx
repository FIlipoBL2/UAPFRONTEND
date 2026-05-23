import { currentUser } from "../pages/userStore";

function GreetingCard() {
  const activeUser = () => currentUser()?.username || "USER";

  return (
    <header class="greeting-card" style={{ "background-color": "#d9d9d9", padding: "30px", "border-radius": "30px", "margin-bottom": "50px", "max-width": "350px" }}>
      <h2 style={{ margin: "0 0 10px 0", "font-size": "24px" }}>HELLO! {activeUser()} 👋</h2>
      <p style={{ margin: 0, color: "#333", "font-size": "16px" }}>What Would You Like To Review Today ?</p>
    </header>
  );
}

export default GreetingCard;
