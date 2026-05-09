import { getCurrentUser, removeCurrentUser } from "./user.js";

let cUser = await getCurrentUser()
let navRight = document.querySelector('.nav-right')

if(navRight) {
    if(cUser) {
        navRight.innerHTML = `
            <a href="post.html">Posts</a>
            <a id="logout" href="#">Logout</a>
        `
    } else {
        navRight.innerHTML = `
            <a href="login.html">Login</a>
            <a href="register.html">Register</a>
            <a href="post.html">Posts</a>
        `
    }
}

let logout = document.getElementById("logout")
if(logout) logout.addEventListener('click', removeCurrentUser)

export async function fetchData(route = '', data = {}, methodType) {
  const response = await fetch(`http://localhost:3500${route}`, {
    method: methodType,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}