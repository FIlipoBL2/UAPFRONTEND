import { createStore } from "solid-js/store";
import { users as mockUsers } from "../data/mockData";

export const [userStore, setUserStore] = createStore({
  users: mockUsers,
  currentUser: null,
  searchQuery: "",
  isModalOpen: false,
  reviews: [],
});

export function updateUser(updatedUser) {
  setUserStore("users", (u) => u.id === updatedUser.id, updatedUser);
  setUserStore("currentUser", updatedUser);
}

// Saves user login info even when page is refreshed
const token = localStorage.getItem("token");
if (token) {
  // fetch current user data
  try {
    const response = await fetch(`http://localhost:8080/api/users/${token}`);
    if (response.ok) {
      const data = await response.json();
      setUserStore("currentUser", data.user);
    }
  } catch (err) {
    console.error("Failed to restore session");
  }

  //fetch reviews from server
  try {
    const reviewResponse = await fetch('http://localhost:8080/api/reviews');
    if (reviewResponse.ok) {
      const reviewData = await reviewResponse.json();
      setUserStore("reviews", reviewData.reviews);
    }
  } catch (err) {
    console.error("Failed to fetch reviews");
  }
}