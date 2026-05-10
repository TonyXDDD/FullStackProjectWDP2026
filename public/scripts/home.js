import { fetchData } from "./main.js"

async function searchPosts() {
    let location = document.getElementById("locationSearch").value.trim().toLowerCase()
    let container = document.getElementById("search-results")
    container.innerHTML = ""

    if(location === "") return

    fetchData('/post/getAllPosts', {}, 'GET')
        .then(posts => {
            const filtered = posts.filter(post => {
                let postLocation = post.location.toLowerCase().replace(/\s/g, '')
                let search = location.toLowerCase().replace(/\s/g, '')
                return postLocation.includes(search)
            })

            if(filtered.length === 0) {
                container.innerHTML = `<p>No posts found for "${location}"</p>`
                return
            }

            filtered.forEach(post => {
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

window.searchPosts = searchPosts