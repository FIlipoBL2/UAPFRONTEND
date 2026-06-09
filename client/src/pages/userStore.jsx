import { createStore } from "solid-js/store";

export const [userStore, setUserStore] = createStore({
  users: [],
  games: [],
  devices: [],
  newReleases: [],
  latestReviews: [],
  currentUser: null,
  searchQuery: "",
  isModalOpen: false,
  reviews: [],
});

export function updateUser(updatedUser) {
  setUserStore("users", (u) => u.id === updatedUser.id, updatedUser);
  setUserStore("currentUser", updatedUser);
}

// Fetch all initial data
try {
  const usersRes = await fetch('http://localhost:8080/api/users');
  if (usersRes.ok) {
    const data = await usersRes.json();
    setUserStore("users", data.users);
  }

  const gamesRes = await fetch('http://localhost:8080/api/games');
  if (gamesRes.ok) {
    const data = await gamesRes.json();
    setUserStore("games", data.games);
  }

  const devicesRes = await fetch('http://localhost:8080/api/devices');
  if (devicesRes.ok) {
    const data = await devicesRes.json();
    setUserStore("devices", data.devices);
  }

  const newReleasesRes = await fetch('http://localhost:8080/api/games/new-releases');
  if (newReleasesRes.ok) {
    const data = await newReleasesRes.json();
    setUserStore("newReleases", data.games);
  }

  const latestReviewsRes = await fetch('http://localhost:8080/api/reviews/latest');
  if (latestReviewsRes.ok) {
    const data = await latestReviewsRes.json();
    setUserStore("latestReviews", data.reviews);
  }
} catch (err) {
  console.error("Failed to fetch initial data", err);
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