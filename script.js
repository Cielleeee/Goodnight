const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const greeting = document.querySelector('.greeting');
const message = document.querySelector('.message');
const body = document.body;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function isNight() {
    const hour = new Date().getHours();
    return hour >= 18 || hour < 5;
}

function updateGreeting() {
    if (isNight()) {
        body.classList.remove('day');
        body.classList.add('night');
        greeting.textContent = 'Goodnight';
        message.textContent = 'AGA MO MATULOOOOG';
    } else {
        body.classList.remove('night');
        body.classList.add('day');
        greeting.textContent = 'Goodmorning';
        message.textContent = 'HIIII HAHAHAHHAHAAHHAAH, AGA MO MATULOG';
    }
}

function createStar() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.4,
        speed: Math.random() * 1.5 + 0.5,
        twinkle: Math.random() * 0.02 + 0.01
    };
}

function createCloud() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.6,
        width: Math.random() * 60 + 30,
        height: Math.random() * 30 + 15,
        opacity: Math.random() * 0.2 + 0.3,
        speedX: Math.random() * 0.8 + 0.3,
        speedY: Math.random() * 0.2 - 0.1
    };
}

function initializeParticles() {
    particles.length = 0;
    // Reduce particle count on mobile for performance
    const isMobile = window.innerWidth <= 600;
    const particleCount = isNight() ? (isMobile ? 60 : 120) : (isMobile ? 8 : 15);
    for (let i = 0; i < particleCount; i++) {
        particles.push(isNight() ? createStar() : createCloud());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        if (isNight()) {
            // Star animation
            particle.y += particle.speed;
            particle.opacity += particle.twinkle;
            if (particle.opacity > 0.8 || particle.opacity < 0.4) particle.twinkle = -particle.twinkle;
            if (particle.y > canvas.height) {
                particle.y = 0;
                particle.x = Math.random() * canvas.width;
                particle.speed = Math.random() * 1.5 + 0.5;
            }
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = rgba(255, 255, 200, ${particle.opacity});
            ctx.fill();
        } else {
            // Cloud animation
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x > canvas.width) {
                particle.x = -particle.width;
                particle.y = Math.random() * canvas.height * 0.6;
                particle.speedX = Math.random() * 0.8 + 0.3;
            }
            if (particle.y < 0 || particle.y > canvas.height * 0.6) {
                particle.speedY = -particle.speedY;
            }
            ctx.beginPath();
            ctx.ellipse(particle.x, particle.y, particle.width / 2, particle.height / 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = rgba(255, 255, 255, ${particle.opacity});
            ctx.fill();
        }
    });
    requestAnimationFrame(animate);
}

// Initialize and start
updateGreeting();
initializeParticles();
animate();

// Update greeting every minute
setInterval(() => {
    updateGreeting();
    initializeParticles();
}, 60000);

// Handle resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeParticles();
});

// Add touch interaction
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent default touch behavior
    initializeParticles(); // Reset particles on tap
});

