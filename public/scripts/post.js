import { fetchData } from "./main.js"
import { getCurrentUser } from "./user.js"

let postForm = document.getElementById("post")
if(postForm) postForm.addEventListener('submit', createPost)

function createPost(e) {
    e.preventDefault()

    let restaurantname = document.getElementById("restaurantName").value
    let restaurantLocation = document.getElementById("location").value  
    let rating125 = document.getElementById("rating").value
    let wrtrevw = document.getElementById("postText").value

    let cUser = getCurrentUser()

    const newPost = {
        user_id: cUser.user_id,         
        restaurant_name: restaurantname, 
        location: restaurantLocation,    
        safety_rating: rating125,        
        review_text: wrtrevw            
    }

    fetchData('/post/createPost', newPost, 'POST')
        .then(data => {
            window.location.reload()     
        })
        .catch(err => alert(err.message))
}