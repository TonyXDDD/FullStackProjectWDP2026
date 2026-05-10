import { fetchData } from "./main.js"

async function loadAllergens() {
    fetchData('/allergen/getAllAllergens', {}, 'GET')
        .then(allergens => {
            let container = document.getElementById("allergen-filter-container")
            allergens.forEach(allergen => {
                container.innerHTML += `
                    <label class="allergen-option">
                        <input type="checkbox" value="${allergen.allergen_id}">
                        ${allergen.allergen_name}
                    </label>
                `
            })
        })
        .catch(err => console.log(err))
}

async function searchPosts() {
    let location = document.getElementById("locationSearch").value.trim().toLowerCase()
    let container = document.getElementById("search-results")
    container.innerHTML = ""
    let selectedAllergens = Array.from(document.querySelectorAll('#allergen-filter-container input:checked')).map(cb => cb.value)

    if(location === "") return

    fetchData('/post/getAllPosts', {}, 'GET')
        .then(async posts => {
            let filtered = posts.filter(post => {
                let postLocation = post.location.toLowerCase().replace(/\s/g, '')
                let search = location.toLowerCase().replace(/\s/g, '')
                return postLocation.includes(search)
            })

            if(selectedAllergens.length > 0) {
                let filteredWithAllergens = []
                for(let post of filtered) {
                    let postAllergens = await fetchData(`/allergen/getPostAllergens/${post.post_id}`, {}, 'GET')
                    let postAllergenIds = postAllergens.map(a => String(a.allergen_id))
                    let hasAny = selectedAllergens.some(id => postAllergenIds.includes(id))
                    if(hasAny) filteredWithAllergens.push(post)
                }
                filtered = filteredWithAllergens
            }

            if(filtered.length === 0) {
                container.innerHTML = `<p>No posts found for "${location}"</p>`
                return
            }

            for(let post of filtered) {
                let allergens = await fetchData(`/allergen/getPostAllergens/${post.post_id}`, {}, 'GET')
                let allergenTags = allergens.map(a => `<span class="allergen-tag">${a.allergen_name}</span>`).join('')
                container.innerHTML += `
                    <div class="post-card">
                        <h3>${post.restaurant_name}</h3>
                        <p class="location">${post.location}</p>
                        <p class="rating">Rating: ${post.safety_rating}/5</p>
                        <p class="review">${post.review_text}</p>
                        <div class="allergen-tags">${allergenTags}</div>
                    </div>
                `
            }
        })
        .catch(err => console.log(err))
}

loadAllergens()
window.searchPosts = searchPosts