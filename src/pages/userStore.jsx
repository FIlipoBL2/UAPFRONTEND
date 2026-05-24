import { createSignal } from "solid-js";
import { users as mockUsers } from "../data/mockData";

export const [users, setUsers] = createSignal(mockUsers);
export const [currentUser, setCurrentUser] = createSignal(null);
export function updateUser(updatedUser) {
  setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  setCurrentUser(updatedUser);
}