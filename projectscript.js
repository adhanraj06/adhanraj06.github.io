// Data for each planet (you can expand this as needed)
const planetData = {
    planet1: {
        title: "Financial Market Monitor",
        timeframe: "September 2024 - Present",
        content: "In early September, I joined the University Finance Association, a student-run finance organization, as the only first-year associate, and during our second meeting, we held industry head presentations where candidates demonstrated their expertise in specific sectors. While I initially considered running for the tech sector, my broad interest in various industries led me to pursue the Generalist position, and instead of a standard stock pitch or industry analysis, I presented a comprehensive market report covering the previous six weeks (early-August to mid-September). This approach not only earned me the role but also sparked a passion for tracking dynamic markets through a macroeconomic and fundamental approach. Since then, I’ve continued creating detailed market reports every few weeks and sharing them with close friends, students at other colleges around the United States, and industry professionals within the Finance industry. I plan to continue to do so and expand this project further by potentially incorporating insights from other markets or collaborating with my peers.",
    },
    planet2: {
        title: "Algorithmic Trading Bot",
        timeframe: "October 2024 - December 2024",
        content: "BACKTEST RESULTS BELOW<br>While trading equities and derivatives earlier this year, I noticed a few reoccurring patterns among a few technical indicators I occasionally used along the way, and out of curiosity, I grew interested in potentially automating my discretionary processes through these. I kicked off my journey by considering how statistical concepts I had recently learned (e.g., hypothesis testing and regression) could be applied in forecasting models, but I ultimately decided to take things slow and build a completely technical-based trading bot not only to gain a better grasp of strategy development but to also experiment with the previous patterns I had noticed. I then built and enhanced the strategy in Pinescript and backtested the strategy on TradingView across differing timeframes and assets, results of which can be found below.",
    }
};

function trackButtonClick(buttonName) {
    gtag('event', 'button_click', {
        'event_category': 'button_clicks',
        'event_action': 'click',
        'event_name': buttonName  // Dynamically passed button name
    });
}

// Attach event listeners for planet buttons and orbiting planets
document.addEventListener('DOMContentLoaded', () => {
    // Attach click events to each planet button in the container
    const planetButtons = document.querySelectorAll('.planet-container button'); // Planet container buttons
    planetButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the planet ID from the button's ID
            const planetId = button.id.replace('-btn', ''); // e.g., planet1-btn becomes planet1
            openPlanetPopup(planetId);
        });
    });

    // Attach click events to each planet in orbit
    const orbitingPlanets = document.querySelectorAll('.planet'); // Orbiting planets
    orbitingPlanets.forEach(planet => {
        planet.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent vapor trail or other elements from intercepting clicks
            
            // Get the planet ID from the planet's ID
            const planetId = planet.id; // e.g., planet1
            trackButtonClick(planetId);
            openPlanetPopup(planetId);
        });

    });
});

// Function to open the popup and insert the planet content dynamically
function openPlanetPopup(planetId) {
    const popup = document.getElementById('planet-popup');
    const planetContent = document.querySelector('.planet-content');
    const table = document.querySelector('table');

    // Get the data for the clicked planet
    const data = planetData[planetId];

    if (data) {
        // Update popup content dynamically
        planetContent.innerHTML = `
        <h1 style="color: white;">${data.title}</h1>
        <p style="font-size: 1.5rem; color: white; margin-top: ${window.innerWidth <= 768 ? '0px' : '-20px'};">${data.timeframe}</p>
        <p style="font-size: 1.2rem; color: white; margin-top: ${window.innerWidth <= 768 ? '0px' : '-15px'}; line-height: 2;">${data.content}</p>
        `;
        
        // Display the popup
        popup.style.display = 'block';

        // Conditionally display the table for specific planets
        if (planetId === 'planet2') {
            table.style.display = 'table';
            table.style.opacity = '0';

            setTimeout(() => {
                table.style.opacity = '1';
            }, 10);

            // Add the specific paragraph after the table
            let additionalParagraph = document.querySelector('.planet-content.additional'); // Check if it already exists
            if (!additionalParagraph) {
                additionalParagraph = document.createElement('p');
                additionalParagraph.className = 'planet-content additional'; // Add a unique class
                // Check if the device is mobile (max-width: 768px)
                if (window.innerWidth <= 768) {
                    additionalParagraph.style.cssText = 'font-size: 1.2rem; color: white; margin-top: 0; line-height: 2;';
                } else {
                    additionalParagraph.style.cssText = 'font-size: 1.2rem; color: white; margin-top: -15px; line-height: 2;';
                }
                additionalParagraph.innerHTML = `
                    I selected XAU/USD, NDQ, and BTC/USD because of their liquidity and representation 
                    of broader market conditions (XAU/USD being a hedge against economic and/or geopolitical 
                    uncertainty oftentimes, NDQ being representative of tech stocks, and BTC/USD being 
                    indicative of the evolving cryptocurrency market). Also, after backtesting the strategy 
                    and connecting with industry professionals (especially QRs and QDs), I have decided to 
                    shift to a more statistical approach to strategy development and learn applicable concepts. 
                    However, this does not rule out the use of technical indicators; rather, it signifies a 
                    shift from an over-reliance on them to incorporating concepts such as regression analysis, 
                    regime modeling, classification and forecasting techniques, convex and nonconvex optimization, etc. 
                    For more information, please don't hesitate to reach out!
                `;
                table.insertAdjacentElement('afterend', additionalParagraph);
            }
        } else {
            table.style.display = 'none';

            // Remove the additional paragraph if it exists
            const additionalParagraph = document.querySelector('.planet-content.additional');
            if (additionalParagraph) {
                additionalParagraph.remove();
            }

            // If the planetId is 'planet1', display the button
            if (planetId === 'planet1') {
                const button = document.createElement('a');
                button.href = "https://financialmarketmonitor.github.io/"; // Link destination
                button.className = 'planet1link-box'; // Apply the provided styles
                button.innerText = 'Visit the Financial Market Monitor'; // Button text

                // Set the button to block level to make margin-top work
                button.style.display = 'block'; // Ensures button is block-level

                // Add a top margin and set font color to white
                button.style.marginTop = '20px'; // Add top margin here
                button.style.color = 'white'; // Set font color to white

                // Append the button to the planet content
                planetContent.appendChild(button);
            }
        }

    }
}

// Function to create a messy vapor trail for a given planet
function createVaporTrail(planetId, trailColor) {
    const planet = document.getElementById(planetId);
    const trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.backgroundColor = trailColor; // Set trail color

    // Get the space map container to append the trail to
    const spaceMap = document.querySelector('.space-map');

    // Get the space map's position to calculate the relative position of the trail
    const spaceMapRect = spaceMap.getBoundingClientRect();

    // Get the planet's position relative to the viewport
    const planetRect = planet.getBoundingClientRect();

    // Calculate the position of the trail relative to the space-map
    const randomOffsetX = Math.random() * 10 - 5;  // Reduced range for a subtler horizontal offset
    const randomOffsetY = Math.random() * 10 - 5;  // Reduced range for a subtler vertical offset

    const trailX = planetRect.left - spaceMapRect.left + planetRect.width / 2 - 7 + randomOffsetX;  
    const trailY = planetRect.top - spaceMapRect.top + planetRect.height / 2 - 7 + randomOffsetY;

    // Random size variation for each trail
    const randomSize = Math.random() * 5 + 2; // Size between 2px and 7px
    trail.style.width = `${randomSize}px`;
    trail.style.height = `${randomSize}px`;

    // Random opacity for added chaos
    trail.style.opacity = Math.random() * 0.5; // Random opacity between 0 and 0.5

    // Set position of the trail relative to the space-map container
    trail.style.position = 'absolute';
    trail.style.left = `${trailX}px`;
    trail.style.top = `${trailY}px`;

    // Append the trail to the space-map container to respect overflow settings
    spaceMap.appendChild(trail);

    // Remove the trail after it fades out to avoid clutter
    setTimeout(() => {
        trail.remove();
    }, 500); // 1 second (duration of the animation)
}

// Function to generate messy vapor trails for all planets in the list
function generateVaporTrails() {
    createVaporTrail('planet1', '#4CAF50');  // Green trail for Planet 1
    createVaporTrail('planet2', '#8A2BE2');  // Purple trail for Planet 2
    createVaporTrail('planet3', '#FF6347');  // Red-Orange trail for Planet 3
    createVaporTrail('planet4', '#FF1493');  // Pink trail for Planet 4
    createVaporTrail('planet5', '#00BFFF');  // Blue trail for Planet 5
    createVaporTrail('planet6', '#1E90FF');  // Dark Blue trail for Planet 6
    createVaporTrail('planet7', '#F4A300');  // Orange-Brown trail for Planet 7
    createVaporTrail('planet8', '#00CED1');  // Teal trail for Planet 8
}

// Continuously generate messy vapor trails for all planets at intervals
setInterval(generateVaporTrails, 25);  // Generate vapor trails every 100 milliseconds

// Function to close the popup
function closePlanetPopup() {
    const popup = document.getElementById('planet-popup');
    const table = document.querySelector('table');

    popup.style.display = 'none';

    // Reset the table's opacity and visibility for the next time
    table.style.opacity = '0';
    table.style.display = 'none';
}

// Get the UFO element
const ufo = document.querySelector('.ufo-contain');

// Sway parameters
let swayAmount = 2;  // Horizontal sway amount
let swaySpeed = 0.05;  // Speed of swaying
let swayAngle = 0;  // Current sway angle

// Continuous swaying function
function swayUFO() {
    // Sway the UFO with a sinusoidal function
    swayAngle += swaySpeed;

    // Keep the angle within the range of 0 to 2π to avoid large rotations
    if (swayAngle > 2 * Math.PI) swayAngle -= 2 * Math.PI;

    // Apply sway using sine and cosine
    const swayX = Math.sin(swayAngle) * swayAmount;  // Horizontal sway (left-right)

    // Apply the sway effect to the UFO
    ufo.style.transform = `rotate(${swayX}deg)`;  // Rotate based on sine value

    // Continue the swaying animation
    requestAnimationFrame(swayUFO);
}

// Start the swaying animation
swayUFO();
