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
    },
    planet3: {
        title: "MemScope",
        timeframe: "May 2025 - May 2025",
        content: "Enter Variables Manually -> Understand the Background Data Alignment"
    }
};

function trackButtonClick(buttonName) {
    gtag('event', 'button_click', {
        'event_category': 'button_clicks',
        'event_action': 'click',
        'event_name': buttonName  // Dynamically passed button name
    });
}

function animatePlanetToUFO(planetId) {
    const button = document.getElementById(`${planetId}-btn`);
    const ufo = document.querySelector('.ufo-contain');
    if (!button || !ufo) return;

    // Create clone
    const clone = button.cloneNode(true);
    const buttonRect = button.getBoundingClientRect();
    const ufoRect = ufo.getBoundingClientRect();

    // Style clone to match original position
    clone.style.position = 'fixed';
    clone.style.left = `${buttonRect.left}px`;
    clone.style.top = `${buttonRect.top}px`;
    clone.style.width = `${buttonRect.width}px`;
    clone.style.height = `${buttonRect.height}px`;
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    clone.style.transition = 'transform 2s ease-in-out, opacity 2s ease-in-out';
    clone.style.margin = '0';
    clone.style.transform = 'none';
    clone.style.opacity = '1';

    document.body.appendChild(clone);

    // Hide original button temporarily
    button.style.visibility = 'hidden';

    // Calculate movement deltas
    const deltaX = (ufoRect.left + ufoRect.width / 2) - (buttonRect.left + buttonRect.width / 2);
    const deltaY = (ufoRect.top + ufoRect.height / 2) - (buttonRect.top + buttonRect.height / 2);

    // Animate clone
    requestAnimationFrame(() => {
        clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.2)`;
        clone.style.opacity = '0.1';
    });

    // Remove clone & restore original after animation
    setTimeout(() => {
        clone.remove();
        button.style.visibility = 'visible';
    }, 2000);
}

// Attach event listeners for planet buttons and orbiting planets
document.addEventListener('DOMContentLoaded', () => {
    const planetButtons = document.querySelectorAll('.planet-container button');
    planetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const planetId = button.id.replace('-btn', '');
            animatePlanetToUFO(planetId);
            openPlanetPopup(planetId);
        });
    });

    const orbitingPlanets = document.querySelectorAll('.planet');
    orbitingPlanets.forEach(planet => {
        planet.addEventListener('click', (event) => {
            event.stopPropagation();
            const planetId = planet.id;
            trackButtonClick(planetId);
            animatePlanetToUFO(planetId);
            openPlanetPopup(planetId);
        });
    });
});


// Function to open the popup and insert the planet content dynamically
function openPlanetPopup(planetId) {
    setTimeout(() => {
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

                if (planetId === 'planet3') {
                    // Check if already inserted to avoid duplicates
                    if (!document.querySelector('#memory-tool-container')) {
                        const template = document.getElementById('memory-tool-template');
                        const clone = template.content.cloneNode(true);
                        planetContent.appendChild(clone);
                    }
                }
            }

        }
    }, 2000); // <-- 2 second delay
}

function handleTypeChange(selectElement) {
    const row = selectElement.closest('.variable-row');
    const sizeInput = row.querySelector('.size-input');
  
    if (selectElement.value.includes('[]') || selectElement.value === 'struct' || selectElement.value === 'union') {
      sizeInput.style.display = 'inline-block';
    } else {
      sizeInput.style.display = 'none';
      sizeInput.value = ''; // reset if not needed
    }
}
  
function addVariable() {
    const container = document.getElementById("variable-container");
  
    const row = document.createElement("div");
    row.className = "variable-row";
    row.innerHTML = `
        <input type="text" class="memory-tool-input" placeholder="Variable Name" />
        
        <select class="memory-tool-select" onchange="handleTypeChange(this)">
            <option value="char">char <!-- 1 byte --></option>
            <option value="signed char">signed char <!-- 1 byte --></option>
            <option value="unsigned char">unsigned char <!-- 1 byte --></option>

            <option value="short">short <!-- 2 bytes --></option>
            <option value="signed short">signed short <!-- 2 bytes --></option>
            <option value="unsigned short">unsigned short <!-- 2 bytes --></option>

            <option value="int">int <!-- 4 bytes --></option>
            <option value="signed int">signed int <!-- 4 bytes --></option>
            <option value="unsigned int">unsigned int <!-- 4 bytes --></option>

            <option value="long">long <!-- 4 bytes (typically) --></option>
            <option value="signed long">signed long <!-- 4 bytes (typically) --></option>
            <option value="unsigned long">unsigned long <!-- 4 bytes (typically) --></option>

            <option value="long long">long long <!-- 8 bytes --></option>
            <option value="signed long long">signed long long <!-- 8 bytes --></option>
            <option value="unsigned long long">unsigned long long <!-- 8 bytes --></option>

            <option value="float">float <!-- 4 bytes --></option>
            <option value="double">double <!-- 8 bytes --></option>
            <option value="long double">long double <!-- 8 or 12 bytes (depends on platform) --></option>

            <option value="void*">void* <!-- Pointer size (typically 4 or 8 bytes depending on architecture) --></option>

            <!-- Fixed-width integers from stdint.h -->
            <option value="int8_t">int8_t <!-- 1 byte --></option>
            <option value="uint8_t">uint8_t <!-- 1 byte --></option>

            <option value="int16_t">int16_t <!-- 2 bytes --></option>
            <option value="uint16_t">uint16_t <!-- 2 bytes --></option>

            <option value="int32_t">int32_t <!-- 4 bytes --></option>
            <option value="uint32_t">uint32_t <!-- 4 bytes --></option>

            <option value="int64_t">int64_t <!-- 8 bytes --></option>
            <option value="uint64_t">uint64_t <!-- 8 bytes --></option>

            <!-- Pointers -->
            <option value="intptr_t">intptr_t <!-- Pointer size (typically 4 or 8 bytes depending on architecture) --></option>
            <option value="uintptr_t">uintptr_t <!-- Pointer size (typically 4 or 8 bytes depending on architecture) --></option>

            <!-- Other types -->
            <option value="size_t">size_t <!-- Pointer size (typically 4 or 8 bytes depending on architecture) --></option>
            <option value="ptrdiff_t">ptrdiff_t <!-- Pointer size (typically 4 or 8 bytes depending on architecture) --></option>
            <option value="wchar_t">wchar_t <!-- Typically 2 or 4 bytes (depends on platform) --></option>

            <!-- C99 Boolean -->
            <option value="_Bool">_Bool <!-- 1 byte --></option>

            <!-- Arrays -->
            <option value="char[]">char[] (array) <!-- Depends on array size --></option>
            <option value="int[]">int[] (array) <!-- Depends on array size --></option>
            <option value="float[]">float[] (array) <!-- Depends on array size --></option>
            <option value="double[]">double[] (array) <!-- Depends on array size --></option>

            <!-- Structs (user-defined) -->
            <option value="struct">struct <!-- Depends on structure size --></option>

            <!-- Unions (user-defined) -->
            <option value="union">union <!-- Depends on union size (largest member) --></option>

            <!-- Enumerations -->
            <option value="enum">enum <!-- Typically 4 bytes --></option>

            <!-- Function Pointers -->
            <option value="function_pointer">function_pointer <!-- Depends on architecture --></option>
        </select>

        <input type="number" class="memory-tool-input size-input" placeholder="Size (REQUIRED)" style="display: none;" />
        <input type="text" class="memory-tool-input" placeholder="Value (Optional)" />
        
        <button class="delete-variable-button" onclick="deleteVariable(this)">❌</button>
    `;
  
    container.appendChild(row);
}  

function deleteVariable(button) {
    const row = button.closest('.variable-row');
    if (row) {
        row.remove();
    }
}

function analyzeCode() {
    
    const CTypeSizes = new Map([
        // Integer types
        ['char', 1],
        ['unsigned char', 1],
        ['signed char', 1],
      
        ['short', 2],
        ['short int', 2],
        ['signed short', 2],
        ['unsigned short', 2],
        ['signed short int', 2],
        ['unsigned short int', 2],
      
        ['int', 4],
        ['signed int', 4],
        ['unsigned int', 4],
        ['signed', 4],
        ['unsigned', 4],
      
        ['long', 8],
        ['long int', 8],
        ['signed long', 8],
        ['unsigned long', 8],
        ['signed long int', 8],
        ['unsigned long int', 8],
      
        ['long long', 8],
        ['long long int', 8],
        ['signed long long', 8],
        ['unsigned long long', 8],
        ['signed long long int', 8],
        ['unsigned long long int', 8],
      
        // Floating point types
        ['float', 4],
        ['double', 8],
        ['long double', 16],
      
        // Pointer types (8 bytes on 64-bit)
        ['void*', 8],
        ['char*', 8],
        ['int*', 8],
        ['float*', 8],
        ['double*', 8],
      
        // Array types (user provides size, so we only use base type size)
        ['char[]', 1],
        ['int[]', 4],
        ['float[]', 4],
        ['double[]', 8],
      
        // Special/custom types
        ['struct', 1],
        ['union', 1],
        ['enum', 4], // usually treated like int
      
        // Optional
        ['bool', 1],
        ['_Bool', 1],
    ]);      

    // Get the memory context (Plain Variables, Struct, or Union)
    let memoryContext = document.getElementById("memory-context").value;

    // Start building the output string
    let output = '';
    output += `Memory Context: ${memoryContext}\n\n`;

    // Get all variable rows in the container
    const variableRows = Array.from(document.querySelectorAll('#variable-container .variable-row'))
    .filter(row => row.style.display !== 'none');

    let totalMem = 0;
    let totalPadding = 0;
    let currVarSize = 0;
    let paddingBefore = 0;
    // Loop through each variable row and extract details
    variableRows.forEach(row => {
        // Get the variable name
        const varName = row.querySelector('input[type="text"]').value;
    
        // Get the variable type, safely check if select element exists
        const varTypeElement = row.querySelector('select');
        const varType = varTypeElement ? varTypeElement.value : 'N/A';  // Default to 'N/A' if no select element
    
        // Get the optional size (if applicable)
        const sizeInput = row.querySelector('.size-input');
        const inputSize = sizeInput && sizeInput.style.display !== 'none' ? sizeInput.value : 'N/A';
    
        // Get the optional value (if applicable)
        const varValueElement = row.querySelector('input[type="text"]:nth-of-type(2)');
        const varValue = varValueElement ? varValueElement.value : 'None';  // Default to 'None' if not found
        
        if (varType !== 'N/A') {
            currVarSize = CTypeSizes.get(varType)
            if (inputSize !== 'N/A') {
                currVarSize *= inputSize;
            }
        } else {
            return;
        }
        
        if (memoryContext !== 'union') {
            const alignment = currVarSize;  // natural alignment

            if (totalMem % alignment !== 0) {
                paddingBefore = alignment - (totalMem % alignment);
            } else {
                paddingBefore = 0;
            }

            totalPadding += paddingBefore;
            totalMem += paddingBefore + currVarSize;

            // Add variable details to output
            output += `Variable Name: ${varName}\n`;
            output += `Type: ${varType}\n`;
            output += `Value: ${varValue ? varValue : 'None'}\n`;
            output += `Size: ${currVarSize}\n`;
            output += `Padding Before: ${paddingBefore}\n`;
            output += `Total Size So Far: ${totalMem}\n\n`;
        } else {
            totalMem = Math.max(totalMem, currVarSize);
        }
        
    });    
    
    output += `\n\nTotal Memory Size: ${totalMem} Bytes`;
    const resultSection = document.getElementById("result-section");
    resultSection.style.display = "block";
    resultSection.innerText = output;
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
