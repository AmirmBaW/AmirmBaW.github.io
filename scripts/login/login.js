// Open saloon doors animation
setTimeout(() => {
    document.querySelector('.door-left').style.transform = 'perspective(1000px) rotateY(-30deg)';
    document.querySelector('.door-right').style.transform = 'perspective(1000px) rotateY(30deg)';
}, 500);

// Form submission animation
const form = document.querySelector('.login-form');
const loginBtn = document.querySelector('.login-btn');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading animation
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ورود...';
    loginBtn.disabled = true;
    
    // Simulate API call with western theme
    setTimeout(() => {
        // Play gunshot sound
        playGunshot();
        
        // Show success message
        loginBtn.innerHTML = '<i class="fas fa-star"></i> خوش آمدید!';
        
        // Reset after 2 seconds
        setTimeout(() => {
            loginBtn.innerHTML = '<span>ورود به سیستم</span><i class="fas fa-hat-cowboy"></i>';
            loginBtn.disabled = false;
        }, 2000);
    }, 2000);
});

// Input field animations
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    input.addEventListener('blur', function() {
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
});

// Add more tumbleweeds randomly
function addTumbleweed() {
    const tumbleweed = document.createElement('div');
    tumbleweed.className = 'tumbleweed';
    tumbleweed.style.bottom = Math.random() * 100 + 'px';
    tumbleweed.style.left = '-50px';
    tumbleweed.style.animationDuration = (Math.random() * 10 + 15) + 's';
    tumbleweed.style.opacity = Math.random() * 0.5 + 0.3;
    document.body.appendChild(tumbleweed);
    
    // Remove after animation completes
    setTimeout(() => {
        tumbleweed.remove();
    }, 25000);
}

// Add initial tumbleweeds
setInterval(addTumbleweed, 8000);

// Gunshot sound effect
function playGunshot() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.7, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
}

// Animate cacti on hover
const cacti = document.querySelectorAll('.cactus');
cacti.forEach(cactus => {
    cactus.addEventListener('mouseenter', () => {
        cactus.style.transform = 'scale(1.1)';
        cactus.style.transition = 'transform 0.3s ease';
    });
    
    cactus.addEventListener('mouseleave', () => {
        cactus.style.transform = 'scale(1)';
    });
});