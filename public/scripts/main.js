import { getCurrentUser, removeCurrentUser } from "./user.js";

let cUser = await getCurrentUser()
let navRight = document.querySelector('.nav-right')

if(cUser) {
    navRight.innerHTML = `
        <a href="home.html">Home</a>
        <a href="post.html">Posts</a>
        <a id="logout" href="#">Logout</a>
    `
} else {
    navRight.innerHTML = `
        <a href="home.html">Home</a>
        <a href="login.html">Login</a>
        <a href="register.html">Register</a>
        <a href="post.html">Posts</a>
    `
}

let logout = document.getElementById("logout")
if(logout) logout.addEventListener('click', removeCurrentUser)

export async function fetchData(route = '', data = {}, methodType) {
  const options = {
    method: methodType,
    headers: { 'Content-Type': 'application/json' }
  }
  if(methodType !== 'GET') {
    options.body = JSON.stringify(data)
  }
  const response = await fetch(`http://localhost:3500${route}`, options);
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}  