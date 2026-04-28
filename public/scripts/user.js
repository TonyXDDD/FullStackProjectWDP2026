
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

        console.log(user)

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
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        console.log(newUser)

    } else {
        console.log("password not gud :( ")
    }
}

function checkPassword(password) {
    return true;
}
