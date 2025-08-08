import {posts} from "../data/posts.js";

function renderPosts(renderPosts) {
    let html = '<div class="blog-title">وبلاگ</div>';
    renderPosts.forEach((post) => {
        html += 
        `
        <div class="product-card">
            <div class="product-image">
                <img src=${post.image}>
            </div>
        
            <div class="product-title">
                <h3>${post.title}</h3>
            </div>
            
            <div class="author-info">
                <div class="author-avatar">
                <img src=${post.authorImage}>
                </div>
                <div class="author-details">
                    <span class="author-name">${post.author}</span>
                    <span class="publish-date">${post.date}</span>
                </div>
            </div>
        `

        if (post.badge) {
            html += `<div class="product-badge">${post.badge}</div>`
        }

        html += "</div>"
    })

    document.querySelector('.blog').innerHTML = html;
}

function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    console.log(searchTerm);
    const filteredProducts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm)
    );
    renderPosts(filteredProducts);
}

document.getElementById('searchInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchProducts();
    }
});

renderPosts(posts);