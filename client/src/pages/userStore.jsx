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
  const [gamesRes, devicesRes, newReleasesRes, latestReviewsRes] = await Promise.all([
    fetch('http://localhost:8080/api/games'),
    fetch('http://localhost:8080/api/devices'),
    fetch('http://localhost:8080/api/games/new-releases'),
    fetch('http://localhost:8080/api/reviews/latest')
  ]);

  if (gamesRes.ok) setUserStore("games", (await gamesRes.json()).games);
  if (devicesRes.ok) setUserStore("devices", (await devicesRes.json()).devices);
  if (newReleasesRes.ok) setUserStore("newReleases", (await newReleasesRes.json()).games);
  if (latestReviewsRes.ok) setUserStore("latestReviews", (await latestReviewsRes.json()).reviews);
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