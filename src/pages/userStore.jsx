import { createSignal } from "solid-js";

export const [users, setUsers] = createSignal([]);
export const [loggedIn, setLoggedIn] = createSignal(false);