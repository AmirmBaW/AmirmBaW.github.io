document.addEventListener('DOMContentLoaded', function() {
    
    // ایجاد عناصر معلق با انیمیشن‌های خفن
    const floatingContainer = document.querySelector('.floating-elements');
    const icons = ['fa-film', 'fa-popcorn', 'fa-ticket-alt', 'fa-camera', 'fa-video', 'fa-clapperboard'];
    const colors = ['#ff9f1c', '#ffffff', '#2ec4b6', '#ff3366'];
    
    for(let i = 0; i < 25; i++) {
        const floatingElement = document.createElement('div');
        floatingElement.className = 'floating-element';
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        floatingElement.innerHTML = `<i class="fas ${randomIcon}"></i>`;
        
        // موقعیت تصادفی
        const left = Math.random() * 90 + 5;
        const top = Math.random() * 90 + 5;
        
        // انیمیشن تصادفی
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 5;
        const size = Math.random() * 1.5 + 1;
        
        floatingElement.style.willChange = 'transform'; 
        floatingElement.style.left = `${left}%`;
        floatingElement.style.top = `${top}%`;
        floatingElement.style.fontSize = `${size}rem`;
        floatingElement.style.opacity = Math.random() * 0.5 + 0.4;
        floatingElement.style.color = colors[Math.floor(Math.random() * colors.length)];
        floatingElement.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        floatingElement.addEventListener('click', () => {
            floatingElement.remove();
        });

        floatingElement.addEventListener('mouseenter', () => {
            floatingElement.style.transition = 'all 1s ease';
            floatingElement.style.color = '#e50914';            
        });
        
        floatingElement.addEventListener('mouseleave', function() {
            this.style.transform = '';
            floatingElement.style.color = colors[Math.floor(Math.random() * colors.length)];

        });
        
        console.log(floatingElement)
        floatingContainer.appendChild(floatingElement);
    }
    
    // افکت سوراخ‌های نوار فیلم
    const hero = document.querySelector('.hero');
    for(let i = 0; i < 20; i++) {
        const hole = document.createElement('div');
        hole.className = 'film-hole';
        hole.style.left = `${Math.random() * 100}%`;
        hole.style.top = `${Math.random() * 100}%`;
        hole.style.animationDelay = `${Math.random() * 5}s`;
        hero.appendChild(hole);
    }
});