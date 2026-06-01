import { createSignal } from "solid-js";
import { users as mockUsers } from "../data/mockData";
import { reviews } from "../data/mockData"

export const [users, setUsers] = createSignal(mockUsers);
export const [currentUser, setCurrentUser] = createSignal(null);
export const [searchQuery, setSearchQuery] = createSignal("");

export function updateUser(updatedUser) {
  setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  setCurrentUser(updatedUser);
}

export const [IsModalOpen, setIsModalOpen] = createSignal(false);
export const [review, setReview] = createSignal(reviews)

// Saves user login info even when page is refreshed
const token = localStorage.getItem("token");
if (token) {
  try {
    const response = await fetch(`http://localhost:8080/api/users/${token}`);
    if (response.ok) {
      const data = await response.json();
      setCurrentUser(data.user);
    }
  } catch (err) {
    console.error("Failed to restore session");
  }
}