import { fetchData } from "./main.js"
import { getCurrentUser } from "./user.js"

let postForm = document.getElementById("post")
if(postForm) postForm.addEventListener('submit', createPost)

async function createPost(e) {
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

async function loadPosts() {
    let cUser = getCurrentUser()
    if(!cUser) return

    fetchData(`/post/getPostsByUser/${cUser.user_id}`, {}, 'GET')
        .then(posts => {
            let container = document.getElementById("posts-container")
            container.innerHTML = ""
            posts.forEach(post => {
                container.innerHTML += `
                    <div class="post-card">
                        <h3>${post.restaurant_name}</h3>
                        <p class="location">${post.location}</p>
                        <p class="rating">Rating: ${post.safety_rating}/5</p>
                        <p class="review">${post.review_text}</p>
                    </div>
                `
            })
        })
        .catch(err => console.log(err))
}

loadPosts()