const floatingContainer = document.querySelector('.floating-elements');
const icons = ['fa-film', 'fa-ticket-alt', 'fa-camera', 'fa-video', 'fa-clapperboard'];
const colors = ['#ff9f1c', '#ffffff', '#2ec4b6', '#ff3366'];

let floatingClasses = [];
let connectionLines = [];

class floatingElement {
    floating;
    container;
    left;
    top;
    color;
    linePrev = null;
    lineNext = null;

    constructor(container) {
        this.container = container;
        this.createElement();
        this.setStyles();
        this.registerListeners();

        container.appendChild(this.floating);
        floatingClasses.push(this);
    }

    createElement() {
        this.floating = document.createElement('div');
        this.floating.className = 'floating-element';
        this.floating.innerHTML = `<i class="fas ${icons[Math.floor(Math.random() * icons.length)]}"></i>`;
    }

    setStyles() {
        this.left = Math.round(Math.random() * 90 + 5);
        this.top = Math.round(Math.random() * 90 + 5);
        this.color = colors[Math.floor(Math.random() * colors.length)];

        const size = Math.random() * 1.5 + 1;

        this.floating.style.left = `${this.left}%`;
        this.floating.style.top = `${this.top}%`;
        this.floating.style.fontSize = `${size}rem`;
        this.floating.style.opacity = Math.random() * 0.5 + 0.4;
        this.floating.style.color = this.color;
        this.floating.style.transition = 'all ease 1s'
    }

    registerListeners() {
        this.floating.addEventListener('click', () => {
            this.remove();
            this.createBlood(0, 0);
            const additionalDrops = 1 + Math.floor(Math.random() * 5);
            for (let i = 0; i < additionalDrops; i++) {
                setTimeout(() => {
                    const offsetX = (Math.random() / 2) + 0.25;
                    const offsetY = (Math.random() / 2) + 0.25;
                    this.createBlood(offsetX, offsetY);
                }, Math.random() * 200);
            }
            addFloatingElement();
        });

        this.floating.addEventListener('mouseenter', () => {
            this.floating.style.transition = 'all 0.8s ease';
            this.floating.style.color = '#e50914';
        });

        this.floating.addEventListener('mouseleave', () => {
            this.floating.style.color = this.color;
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

        setTimeout(() => bloodDrop.remove(), 3000);
    }

    remove() {
        this.floating.remove();

        const index = floatingClasses.indexOf(this);
        floatingClasses.splice(index, 1);

        if (this.linePrev) {
            this.linePrev.remove();
            connectionLines.splice(connectionLines.indexOf(this.linePrev), 1);
        }
        if (this.lineNext) {
            this.lineNext.remove();
            connectionLines.splice(connectionLines.indexOf(this.lineNext), 1);
        }

        if (floatingClasses[index - 1] && floatingClasses[index]) {
            createLineBetween(floatingClasses[index - 1], floatingClasses[index]);
        }

        floatingClasses.forEach((el) => el.innerAnger());
    }

    
    innerAnger() {
        this.floating.style.filter = "drop-shadow(0px 0px 10px rgba(229, 0, 0, 1))";

        setTimeout(() => this.floating.style.filter = '', 1500);
    }
}

function createLineBetween(el1, el2) {
    const line = document.createElement('div');
    line.className = 'connection-line';
    floatingContainer.appendChild(line);
    connectionLines.push(line);

    el1.lineNext = line;
    el2.linePrev = line;

    updateSingleLine(el1, el2, line);
}

function updateSingleLine(el1, el2, line) {
    const containerRect = floatingContainer.getBoundingClientRect();

    const rect1 = el1.floating.getBoundingClientRect();
    const rect2 = el2.floating.getBoundingClientRect();

    const x1 = (rect1.left - containerRect.left) + rect1.width / 2;
    const y1 = (rect1.top - containerRect.top) + rect1.height / 2;
    const x2 = (rect2.left - containerRect.left) + rect2.width / 2;
    const y2 = (rect2.top - containerRect.top) + rect2.height / 2;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1);

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    line.style.width = `${length}px`;
    line.style.left = `${(midX - length / 2) / containerRect.width * 100}%`;
    line.style.top = `${midY / containerRect.height * 100}%`;
    line.style.transform = `rotate(${angle}rad)`;
    line.style.transformOrigin = "center center";
}

function updateAllLines() {
    for (let i = 0; i < floatingClasses.length - 1; i++) {
        const el1 = floatingClasses[i];
        const el2 = floatingClasses[i + 1];
        if (el1.lineNext) {
            updateSingleLine(el1, el2, el1.lineNext);
        }
    }
}

function addFloatingElement() {
    const newEl = new floatingElement(floatingContainer);

    if (floatingClasses.length > 1) {
        const prevEl = floatingClasses[floatingClasses.length - 2];
        createLineBetween(prevEl, newEl);
    }
}

for (let i = 0; i < 15; i++) {
    addFloatingElement();
}

let resizeScheduled = false;
window.addEventListener('resize', () => {
    if (!resizeScheduled) {
        resizeScheduled = true;
        requestAnimationFrame(() => {
            updateAllLines();
            resizeScheduled = false;
        });
    }
});
