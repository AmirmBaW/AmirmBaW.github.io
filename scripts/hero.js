const floatingContainer = document.querySelector('.floating-elements');
const icons = ['fa-film', 'fa-popcorn', 'fa-ticket-alt', 'fa-camera', 'fa-video', 'fa-clapperboard'];
const colors = ['#ff9f1c', '#ffffff', '#2ec4b6', '#ff3366'];

class floatingElement {
    floating;
    container;
    left;
    top;
    color;

    constructor(container) {
        this.floating = document.createElement('div');
        this.container = container;
        this.registery();
        this.setStyles();
        this.registerListeners();

        container.appendChild(this.floating);
    }

    registery() {
        this.floating.className = 'floating-element'
        this.floating.innerHTML = `<i class="fas ${icons[Math.floor(Math.random() * icons.length)]}"></i>`;
    }

    setStyles() {
        this.left = Math.random() * 90 + 5;
        this.top = Math.random() * 90 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];

        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 5;
        const size = Math.random() * 1.5 + 1;
        
        this.floating.style.willChange = 'transform'; 
        this.floating.style.left = `${this.left}%`;
        this.floating.style.top = `${this.top}%`;
        this.floating.style.fontSize = `${size}rem`;
        this.floating.style.opacity = Math.random() * 0.5 + 0.4;
        this.floating.style.color = this.color;
        this.floating.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    }

    registerListeners() {
        this.floating.addEventListener('click', (e) => {
        const actualPos = this.getActualPosition();

        this.createBlood();
        const additionalDrops = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < additionalDrops; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() * 40) - 20;
                const offsetY = (Math.random() * 40) - 20;
                this.createBlood();
            }, Math.random() * 200);
        }
            this.floating.remove();
            new floatingElement(this.container);
        });

        this.floating.addEventListener('mouseenter', () => {
            this.floating.style.transition = 'all 1s ease';
            this.floating.style.color = '#e50914';            
        });
        
        this.floating.addEventListener('mouseleave', () => {
            this.floating.style.transform = this.color;
        });
    }

    createBlood() {
        const bloodDrop = document.createElement('div');
        bloodDrop.className = 'blood-drop';
        
        const types = ['', 'splatter', 'drip'];
        const type = types[Math.floor(Math.random() * types.length)];
        if (type) bloodDrop.classList.add(type);
        
        const rotation = Math.random() * 360;
        const scale = 0.7 + Math.random() * 0.6; 
        
        bloodDrop.style.setProperty('--rotation', `${rotation}deg`);
        bloodDrop.style.setProperty('--scale', scale);
        bloodDrop.style.left = `${this.left}%`; 
        bloodDrop.style.top = `${this.top}%`;
        
        this.container.appendChild(bloodDrop);
        
        setTimeout(() => {
            bloodDrop.remove();
        }, 3000);
    }
}



for(let i = 0; i < 25; i++) {
   new floatingElement(floatingContainer);
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


