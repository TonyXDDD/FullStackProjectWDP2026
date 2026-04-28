
let postForm = document.getElementById("post")

if(postForm) postForm.addEventListener('submit', post)

function post(e) {
    e.preventDefault()

    let restaurantname = document.getElementById("restaurantName").value
    let location = document.getElementById("location").value
    let rating125 = document.getElementById("rating").value
    let wrtrevw = document.getElementById("postText").value
    
    const user = {
        restaurantname: restaurantname,
        location: location,
        rating125: rating125,
        wrtrevw: wrtrevw
    }

    console.log(user)
    }