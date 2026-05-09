import { fetchData } from "./main.js"

//FOR LOGIN
let loginForm = document.getElementById("login")
if(loginForm) loginForm.addEventListener('submit', login)

//FOR REGISTER
let registerForm = document.getElementById("register")
if (registerForm) registerForm.addEventListener('submit', register)

//FOR LOGIN
function login(e) {
    e.preventDefault()

    let identifier = document.getElementById("identifier").value
    let password = document.getElementById("password").value

    if (checkPassword(password)) {

        let user = {}
        if (identifier.includes("@")) {
            user.email = identifier
        } else {
            user.username = identifier
        }
        user.password = password

        fetchData('/user/login', user, 'POST')
            .then(data => {
                setCurrentUser(data)
                window.location.href = "post.html"
            })
            .catch(err => alert(err.message))

    } else {
        console.log("password not gud :( ")
    }
}

//FOR REGISTER
function register(e) {
    e.preventDefault()

    let username = document.getElementById("username").value
    let firstName = document.getElementById("first_name").value
    let lastName = document.getElementById("last_name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if (checkPassword(password)) {

        const newUser = {
            username: username,
            first_name: firstName,  
            last_name: lastName,    
            email: email,
            password: password
        }

        fetchData('/user/register', newUser, 'POST')
            .then(data => {
                setCurrentUser(data)
                window.location.href = "post.html"
            })
            .catch(err => alert(err.message))

    } else {
        console.log("password not gud :( ")
    }
}

function checkPassword(password) {
    return true;
}

function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
}

export function removeCurrentUser() {
    localStorage.removeItem('user')
    window.location.href = "login.html"
}