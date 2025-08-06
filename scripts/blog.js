import {posts} from "../data/posts.js";

function renderPosts(renderPosts) {
    let html = '';
    renderPosts.forEach((post) => {
        html += 
        `
            <div class="post">
                <div class="post-photo"> 
                    <img src=${post.image} />
                </div>
                <div class="post-info">
                    <div class="post-title"> ${post.title} </div>
                </div>
                <div class="post-about">
                    <img src="${post.authorImage}" class="post-author">
                    <div>${post.author}</div>
                    <div>${post.date}</div>
                </div>
            </div>
        `
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