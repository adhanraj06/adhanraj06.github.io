document.addEventListener("DOMContentLoaded", () => {
    // Hero section particle generation
    const hero = document.querySelector('.hero'); // Select the hero section
    let isDropping = true; // Tracks whether particles are dropping
    const particles = []; // Array to store particles for collision detection
    const particleDelay = 60; // Delay in milliseconds between each particle generation
    let lastParticleTime = 0; // Timestamp of the last particle creation

    // Function to generate a random color within a specific hue range (e.g., blues)
    function getRandomColor() {
        const hue = Math.floor(Math.random() * 360); // Any hue value from 0 to 360 (color wheel)
        const saturation = 70 + Math.random() * 30; // Saturation between 70% and 100%
        const lightness = 50 + Math.random() * 20; // Lightness between 50% and 70%
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    // Function to create a particle only if it is within the hero section
    function createParticle(x, y) {
        const rect = hero.getBoundingClientRect();

        // Check if the particle's position is within the hero section
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Set random color for the particle using the HSL color function
            particle.style.backgroundColor = getRandomColor();

            // Position particle relative to the hero section
            const particleSize = 15; // Particle size
            let particleX = x - rect.left - particleSize / 2;  // Adjust to center the particle
            let particleY = y - rect.top - particleSize / 2;    // Adjust to center the particle

            // Initial velocity
            let velocityX = (Math.random() - 0.5) * 4; // Random horizontal speed
            let velocityY = (Math.random() - 0.5) * 4; // Random vertical speed

            // Add CSS to position particle
            particle.style.position = 'absolute';
            particle.style.width = `${particleSize}px`;
            particle.style.height = `${particleSize}px`;

            // Append the particle to the hero section
            hero.appendChild(particle);

            // Push the particle into the particles array for collision detection
            particles.push({ particle, particleX, particleY, velocityX, velocityY, createdAt: Date.now() });

            // Function to animate and bounce the particle
            function animateParticle(particleData) {
                const rect = hero.getBoundingClientRect();
                const particleRect = particle.getBoundingClientRect();

                // Update particle position based on its velocity
                particleData.particleX += particleData.velocityX;
                particleData.particleY += particleData.velocityY;

                // Check for collision with the left boundary
                if (particleRect.left <= rect.left) {
                    // Apply slight transport to prevent sticking
                    particleRect.left = rect.left; // Set the particle's left edge to the boundary's left edge
                    particleData.velocityX = -particleData.velocityX * 0.95; // Reverse horizontal velocity and apply slight energy loss
                }

                // Check for collision with the right boundary
                if (particleRect.right >= rect.right) {
                    // Apply slight transport to prevent sticking
                    particleRect.right = rect.right; // Set the particle's right edge to the boundary's right edge
                    particleData.velocityX = -particleData.velocityX * 0.95; // Reverse horizontal velocity and apply slight energy loss
                }

                // Check for collision with the top boundary
                if (particleRect.top <= rect.top) {
                    // Apply slight transport to prevent sticking
                    particleRect.top = rect.top; // Set the particle's top edge to the boundary's top edge
                    particleData.velocityY = -particleData.velocityY * 0.95; // Reverse vertical velocity and apply slight energy loss
                }

                // Check for collision with the bottom boundary
                if (particleRect.bottom >= rect.bottom) {
                    // Apply slight transport to prevent sticking
                    particleRect.bottom = rect.bottom; // Set the particle's bottom edge to the boundary's bottom edge
                    particleData.velocityY = -particleData.velocityY * 0.95; // Reverse vertical velocity and apply slight energy loss
                }

                // Check for collision with other particles
                particles.forEach(otherParticleData => {
                    if (otherParticleData !== particleData) {
                        const dx = particleData.particleX - otherParticleData.particleX;
                        const dy = particleData.particleY - otherParticleData.particleY;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        const minDistance = 15; // Minimum distance to consider collision

                        if (distance < minDistance) {
                            // Check if the particles have the same color
                            if (particle.style.backgroundColor === otherParticleData.particle.style.backgroundColor) {
                                // Trigger explosion (remove all particles)
                                particles.forEach(p => p.particle.remove());  // Remove all particles
                                particles.length = 0;  // Clear the particles array
                            }

                            // Swap velocities for simple elastic collision
                            [particleData.velocityX, otherParticleData.velocityX] = [otherParticleData.velocityX, particleData.velocityX];
                            [particleData.velocityY, otherParticleData.velocityY] = [otherParticleData.velocityY, particleData.velocityY];
                        } else {
                            // Velocities increase as a result of the collision
                            const velocityIncreaseFactor = 0.0001; // Increase factor for velocities

                            // Simple approach to adjust velocities: increase the velocity components based on distance
                            particleData.velocityX += velocityIncreaseFactor * Math.sign(dx);
                            particleData.velocityY += velocityIncreaseFactor * Math.sign(dy);
                            otherParticleData.velocityX += velocityIncreaseFactor * Math.sign(-dx);
                            otherParticleData.velocityY += velocityIncreaseFactor * Math.sign(-dy);
                        }
                    }
                });

                // Update particle position
                particle.style.left = `${particleData.particleX}px`;
                particle.style.top = `${particleData.particleY}px`;

                // Continue animation if the particle is still inside the hero section
                if (Date.now() - particleData.createdAt < 10000) { // Particle disappears after 10 seconds
                    requestAnimationFrame(() => animateParticle(particleData)); // Continue animation
                } else {
                    particle.remove(); // Remove the particle after 5 seconds
                    const index = particles.indexOf(particleData);
                    if (index > -1) particles.splice(index, 1); // Remove from the array
                }
            }

            // Start the animation loop for the particle
            animateParticle(particles[particles.length - 1]);
        }
    }

    // Mouse move handler to create particles when isDropping is true
    function handleMouseMove(e) {
        if (isDropping && Date.now() - lastParticleTime > particleDelay) {
            // Create particle only if enough time has passed
            createParticle(e.clientX, e.clientY);
            lastParticleTime = Date.now(); // Update the last particle creation time
        }
    }

    // Toggle dropping on click inside hero section
    hero.addEventListener('click', () => {
        isDropping = !isDropping;  // Toggle the particle dropping state
    });

    // Track when the mouse enters and leaves the hero section
    hero.addEventListener('mouseenter', () => {
        if (isDropping) {
            // Continue dropping if it was already active
            hero.addEventListener('mousemove', handleMouseMove);
        }
    });

    hero.addEventListener('mouseleave', () => {
        if (isDropping) {
            // Stop creating particles when leaving the section
            hero.removeEventListener('mousemove', handleMouseMove);
        }
    });

    // Attach the mousemove listener to the hero section
    hero.addEventListener('mousemove', handleMouseMove);

    // Show All Content Button functionality
const allContentSections = document.querySelectorAll(
    '#computer-science-content, #finance-content, #mathematics-content, #other-interests, #before-college, .other-interests'
);

// Handle toggle of all content sections (Show All / Hide All)
let visibleOrNot = false; // Declare a boolean variable

function toggleAllContent() {
    const allContents = document.querySelectorAll('.interest-content');
    
    allContents.forEach(content => {
        const buttonId = content.id.replace('-content', '-btn'); // Generate button ID dynamically
        toggleContent(buttonId, content.id); // Toggle each content section
    });

    visibleOrNot = !visibleOrNot;  // Toggle the state
}

// Function to toggle visibility of content boxes
function toggleContent(buttonId, contentId) {
    const content = document.getElementById(contentId);
    const button = document.getElementById(buttonId);

    // If content is already visible, hide it
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        button.classList.remove('active');
    } else {
        // Hide all other content sections
        const allContents = document.querySelectorAll('.interest-content');
        const allButtons = document.querySelectorAll('.interest-btn');
        
        allContents.forEach(item => item.classList.remove('active'));
        allButtons.forEach(button => button.classList.remove('active'));
        
        // Show the selected content section
        content.classList.add('active');
        button.classList.add('active');
    }
}

// Generalized event listener for each button
document.querySelectorAll('.interest-btn').forEach(button => {
    const contentId = button.id.replace('-btn', '-content'); // Generate content ID dynamically
    button.addEventListener('click', () => {
        toggleContent(button.id, contentId);
    });
});

// Toggle visibility for fun fact box
document.getElementById('fun-fact-box').addEventListener('click', function () {
    const experienceBox = document.getElementById('trading-experience-box');
    trackButtonClick("Home - Fun Fact");
    // Check current visibility state
    if (!experienceBox.classList.contains('visible')) {
        // Show the box with a flip effect
        experienceBox.style.display = 'block';
        setTimeout(() => experienceBox.classList.add('visible'), 10);
    } else {
        // Hide the box with a reverse flip effect
        experienceBox.classList.remove('visible');
        setTimeout(() => experienceBox.style.display = 'none', 600);
    }
});

// Toggle individual info boxes (sports and piano example)
function toggleInfoBox(buttonId, infoBoxId) {
    const button = document.getElementById(buttonId);
    const infoBox = document.getElementById(infoBoxId);

    if (button && infoBox) {
        button.addEventListener('click', function () {
            // If the info box is not visible, show it
            if (!infoBox.classList.contains('visible')) {
                infoBox.style.display = 'block';
                infoBox.style.opacity = 1;
                setTimeout(() => infoBox.classList.add('visible'), 10);
            } else {
                infoBox.classList.remove('visible');
                infoBox.style.opacity = 0;
                setTimeout(() => infoBox.style.display = 'none', 600);
            }
        });
    }
}

// Example of toggling info boxes for sports and piano
toggleInfoBox('sports-button', 'sports-info');
toggleInfoBox('piano-button', 'piano-info');

// Add event listeners for all toggle buttons in the "Before College" section
document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', function () {
        const contentId = button.id.replace('-btn', '-content');
        const content = document.getElementById(contentId);

        // Toggle the visibility of the content
        if (content.classList.contains('active')) {
            content.classList.remove('active');
            content.style.display = 'none'; // Hide the content when "active" class is removed
        } else {
            content.classList.add('active');
            content.style.display = 'block'; // Show the content when "active" class is added
        }
    });
});

// Toggle content for individual competitions
document.querySelectorAll('.competitions-btn').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.id.replace('-btn', '-content');
        const targetContent = document.getElementById(targetId);

        // Hide all competition content
        document.querySelectorAll('.competitions-content').forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        // Show selected competition content
        if (targetContent) {
            targetContent.classList.add('active');
            targetContent.style.display = 'block';
        }
    });
});

    function trackButtonClick(buttonName) {
        gtag('event', 'button_click', {
            'event_category': 'button_clicks',
            'event_action': 'click',
            'event_name': buttonName  // Dynamically passed button name
        });
    }
});
