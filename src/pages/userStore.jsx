import { createSignal } from "solid-js";

export const [users, setUsers] = createSignal([]);
export const [currentUser, setCurrentUser] = createSignal(null);