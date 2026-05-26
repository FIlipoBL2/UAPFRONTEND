import { currentUser } from "../pages/userStore";

function GreetingCard() {
  const activeUser = () => currentUser()?.username || "USER";

  return (
    <header class="greeting-card" style={{ "background-color": "#d9d9d9", "padding": "10px", "border-radius": "30px", "width": "350px" }}>
      <h1>HELLO! {activeUser()} 👋</h1>
      <p>What Would You Like To Review Today ?</p>
    </header>
  );
}

export default GreetingCard;
