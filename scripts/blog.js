import {posts} from "../data/posts.js";

let html = '';
posts.forEach((post) => {
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