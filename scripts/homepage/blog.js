import {posts} from "../../data/posts.js";

function renderPosts(renderPosts) {
    let html = '<div class="cinema-title">سینما</div>';
    renderPosts.forEach((post) => {
        html += 
        `
        <div class="film-card">            
            <div class="card-inner">
                <div class="poster-section">
                    <div class="poster-frame">
                        <img src= ${post.image} class="poster-image">
                        <div class="poster-overlay">
                            <div class="genre-tag">${post.badge}</div>
                            <div class="play-button">
                                <div class="play-icon"></div>
                            </div>
                        </div>
                    </div>
                </div>

                    <div class="card-content">
                        <h3 class="film-title">${post.title}</h3>
                        
                        <div class="author-section">
                            <div class="author-avatar">
                                <img src= ${post.authorImage} class="avatar-image">
                            </div>
                            <span class="author-name">${post.author}</span>
                            <span class="author-name"> - ${post.date}</span>
                        </div>


                        <button class="show-more-btn">
                            <span>Show More</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="card-border"></div>
                <div class="corner-decorations">
                    <div class="corner top-left"></div>
                    <div class="corner top-right"></div>
                    <div class="corner bottom-left"></div>
                    <div class="corner bottom-right"></div>
                </div>
            </div>
        </div>
        `
    })

    document.querySelector('.cinema-container').innerHTML = html;
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