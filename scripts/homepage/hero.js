const floatingContainer = document.querySelector('.floating-elements');
let floatingClasses = [];
const icons = ['fa-film', 'fa-ticket-alt', 'fa-camera', 'fa-video', 'fa-clapperboard'];
const colors = ['#ff9f1c', '#ffffff', '#2ec4b6', '#ff3366'];
const containerWidth = floatingContainer.offsetWidth;
const containerHeight = floatingContainer.offsetHeight;

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
        floatingClasses.push(this);
    }

    registery() {
        this.floating.className = 'floating-element'
        this.floating.innerHTML = `<i class="fas ${icons[Math.floor(Math.random() * icons.length)]}"></i>`;
    }

    setStyles() {
        this.left = Math.round(Math.random() * 90 + 5);
        this.top = Math.round(Math.random() * 90 + 5);
        this.color = colors[Math.floor(Math.random() * colors.length)];

        console.log(this.top);
        const size = Math.random() * 1.5 + 1;
        
        this.floating.style.willChange = 'transform'; 
        this.floating.style.left = `${this.left}%`;
        this.floating.style.top = `${this.top}%`;
        this.floating.style.fontSize = `${size}rem`;
        this.floating.style.opacity = Math.random() * 0.5 + 0.4;
        this.floating.style.color = this.color;
    }

    registerListeners() {
        this.floating.addEventListener('click', () => {
        
        this.remove();
        this.createBlood(0, 0);
        const additionalDrops = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < additionalDrops; i++) {
            setTimeout(() => {
                const offsetX = (Math.random() / 2) + 0.25;
                const offsetY = (Math.random() / 2) + 0.25;
                this.createBlood(offsetX, offsetY);
            }, Math.random() * 200);
        }
            new floatingElement(this.container);
            renderLines();

        });

        this.floating.addEventListener('mouseenter', () => {
            this.floating.style.transition = 'all 1s ease';
            this.floating.style.color = '#e50914';            
        });
        
        this.floating.addEventListener('mouseleave', () => {
            this.floating.style.transform = this.color;
        });
    }

    createBlood(offsetX, offsetY) {
        const bloodDrop = document.createElement('div');
        bloodDrop.className = 'blood-drop';
        
        const types = ['', 'splatter', 'drip'];
        const type = types[Math.floor(Math.random() * types.length)];
        if (type) bloodDrop.classList.add(type);
        
        const scale = 0.7 + Math.random() * 0.6; 
        
        bloodDrop.style.setProperty('--scale', scale);
        bloodDrop.style.left = `${this.left + offsetX}%`; 
        bloodDrop.style.top = `${this.top + offsetY}%`;
        
        this.container.appendChild(bloodDrop);
        
        setTimeout(() => {
            bloodDrop.remove();
        }, 3000);
    }

    remove() {
        this.floating.remove();
        floatingClasses = floatingClasses.filter(element => element !== this);
    }
    
}

for(let i = 0; i < 15; i++) {
    new floatingElement(floatingContainer);
}

// Remove old lines
function renderLines() {
    floatingContainer.querySelectorAll('.connection-line').forEach(line => line.remove());
    console.log(floatingClasses);

    for (let i = 0; i < floatingClasses.length - 1; i++) {
        const rect1 = floatingClasses[i];
        const rect2 = floatingClasses[i + 1];

        const x1 = (rect1.left / 100) * containerWidth;
        const y1 = (rect1.top / 100) * containerHeight;

        const x2 = (rect2.left / 100) * containerWidth;
        const y2 = (rect2.top / 100) * containerHeight;

        const line = document.createElement('div');
        line.className = 'connection-line';

        const length = Math.hypot(x2 - x1, y2 - y1);
        const angle = Math.atan2(y2 - y1, x2 - x1);

        line.style.width = `${length }px`;
        line.style.left = `${((x1 + x2) / 2 - length / 2) / containerWidth * 100 + 0.5}%`;
        line.style.top = `${(y1 + y2) / 2 / containerHeight * 100 + 1.4}%`;
        line.style.transform = `rotate(${angle}rad)`;

        floatingContainer.appendChild(line);
    }
}

renderLines();