document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, attempting to fetch SVG map...');
    
    // Try different possible locations for the SVG file
    const possiblePaths = [
        'switzerland-map.svg',
        '/switzerland-map.svg',
        '/public/switzerland-map.svg',
        './switzerland-map.svg'
    ];
    
    // Try each path until one works
    tryLoadSVG(possiblePaths, 0);
    
    // Add event listener for the "Optimize Resources" button with better debugging
    console.log('Looking for Optimize Resources button...');
    
    // Try multiple selectors to find the button
    const optimizeResourcesBtn = document.querySelector('.logistics-actions .action-button:first-child');
    const allActionButtons = document.querySelectorAll('.action-button');
    
    console.log('Found button?', optimizeResourcesBtn !== null);
    console.log('Total action buttons found:', allActionButtons.length);
    
    // Add click event to all buttons with "Optimize Resources" text
    allActionButtons.forEach(button => {
        if (button.textContent.trim() === 'Optimize Resources') {
            console.log('Found button with text "Optimize Resources"');
            button.addEventListener('click', function() {
                console.log('Optimize Resources button clicked');
                const modal = document.getElementById('resource-optimization-modal');
                if (modal) {
                    modal.style.display = 'block';
                    console.log('Modal should be visible now');
                } else {
                    console.error('Modal element not found!');
                }
            });
        }
    });
    
    // Original event listener (keep this as a backup)
    if (optimizeResourcesBtn) {
        optimizeResourcesBtn.addEventListener('click', function() {
            console.log('Original selector button clicked');
            document.getElementById('resource-optimization-modal').style.display = 'block';
        });
    }
    
    // Close modal when clicking the X
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('resource-optimization-modal').style.display = 'none';
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('resource-optimization-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Apply Recommendations button
    const applyOptimizationBtn = document.getElementById('apply-optimization');
    if (applyOptimizationBtn) {
        applyOptimizationBtn.addEventListener('click', function() {
            alert('Optimization recommendations applied successfully. Resources have been allocated according to the plan.');
            document.getElementById('resource-optimization-modal').style.display = 'none';
            
            // Update the dashboard to reflect the applied recommendations
            updateDashboardAfterOptimization();
        });
    }
    
    // Export Plan button
    const exportPlanBtn = document.getElementById('export-plan');
    if (exportPlanBtn) {
        exportPlanBtn.addEventListener('click', function() {
            alert('Resource optimization plan exported successfully. The file has been sent to your email.');
        });
    }
    
    // Add this near the top of your DOMContentLoaded function
    console.log('Checking if modal exists in DOM...');
    const modalCheck = document.getElementById('resource-optimization-modal');
    console.log('Modal exists:', modalCheck !== null);
    if (!modalCheck) {
        console.error('Modal element not found in the DOM!');
    }
    
    // Add this to your script to check modal visibility
    setTimeout(() => {
        const modal = document.getElementById('resource-optimization-modal');
        if (modal) {
            console.log('Modal current display style:', modal.style.display);
            console.log('Modal computed style:', window.getComputedStyle(modal).display);
        }
    }, 2000);
    
    // Find and modify the Draw Custom Region button
    const drawRegionBtn = document.querySelector('.custom-region-btn');
    if (drawRegionBtn) {
        drawRegionBtn.style.backgroundColor = '#2980b9';
        drawRegionBtn.style.color = 'white';
    }
});

function tryLoadSVG(paths, index) {
    if (index >= paths.length) {
        // We've tried all paths and none worked
        document.querySelector('.map-container').innerHTML = 
            `<div style="color: red; padding: 20px;">
                Error loading map: Could not find the SVG file.<br>
                Tried paths: ${paths.join(', ')}
            </div>`;
        return;
    }
    
    console.log(`Trying to load SVG from: ${paths[index]}`);
    
    fetch(paths[index])
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed with status: ${response.status}`);
            }
            return response.text();
        })
        .then(svgContent => {
            console.log('SVG content loaded successfully from', paths[index]);
            
            // Insert the SVG into the container
            document.querySelector('.map-container').innerHTML = svgContent;
            
            // Add event listeners to all cantons
            const cantons = document.querySelectorAll('#features path');
            console.log(`Found ${cantons.length} cantons in the SVG`);
            
            cantons.forEach(canton => {
                canton.addEventListener('click', function() {
                    // Remove selected class from all cantons
                    cantons.forEach(c => c.classList.remove('selected'));
                    
                    // Add selected class to clicked canton
                    this.classList.add('selected');
                    
                    // Display canton information
                    displayCantonInfo(this.getAttribute('id'), this.getAttribute('name'));
                });
            });
        })
        .catch(error => {
            console.log(`Error loading from ${paths[index]}:`, error.message);
            // Try the next path
            tryLoadSVG(paths, index + 1);
        });
}

function displayCantonInfo(id, name) {
    // Canton data - you can expand this with more information
    const cantonData = {
        CHVS: {
            name: 'Valais',
            capital: 'Sion',
            population: 'Approx. 345,000',
            description: 'Valais is known for its mountainous terrain, including the Matterhorn, and is a popular destination for skiing and hiking.'
        },
        CHTI: {
            name: 'Ticino',
            capital: 'Bellinzona',
            population: 'Approx. 350,000',
            description: 'Ticino is the southernmost canton of Switzerland, known for its Italian-speaking population and Mediterranean climate.'
        },
        CHGR: {
            name: 'Graubünden',
            capital: 'Chur',
            population: 'Approx. 200,000',
            description: 'Graubünden is the largest canton by area and is known for its diverse landscapes and the Romansh language.'
        },
        // Add data for other cantons here
        CHZH: {
            name: 'Zürich',
            capital: 'Zürich',
            population: 'Approx. 1,500,000',
            description: 'Zürich is the most populous canton and a global center for banking and finance.'
        },
        CHBE: {
            name: 'Bern',
            capital: 'Bern',
            population: 'Approx. 1,030,000',
            description: 'Bern is the second most populous canton and home to the Swiss capital city.'
        }
    };
    
    // Get the info for the selected canton
    const canton = cantonData[id] || { 
        name: name || 'Unknown',
        capital: 'Information not available',
        population: 'Information not available',
        description: 'Detailed information about this canton is not available.'
    };
    
    // Update the info box
    const infoBox = document.querySelector('.info-box');
    infoBox.innerHTML = `
        <h2>${canton.name}</h2>
        <p><strong>Capital:</strong> ${canton.capital}</p>
        <p><strong>Population:</strong> ${canton.population}</p>
        <p>${canton.description}</p>
    `;
}

// Function to update dashboard after optimization
function updateDashboardAfterOptimization() {
    // Update truck allocation
    const truckValue = document.querySelector('.resource-list li:first-child .resource-value');
    if (truckValue) {
        truckValue.textContent = '24/24 allocated';
    }
    
    const truckProgress = document.querySelector('.resource-list li:first-child .mini-progress div');
    if (truckProgress) {
        truckProgress.style.width = '100%';
    }
    
    // Update railway capacity
    const railwayValue = document.querySelector('.resource-list li:nth-child(2) .resource-value');
    if (railwayValue) {
        railwayValue.textContent = '100% optimized';
    }
    
    const railwayProgress = document.querySelector('.resource-list li:nth-child(2) .mini-progress div');
    if (railwayProgress) {
        railwayProgress.style.width = '100%';
    }
    
    // Update manpower allocation
    const manpowerValue = document.querySelector('.resource-list li:nth-child(3) .resource-value');
    if (manpowerValue) {
        manpowerValue.textContent = '100% allocated';
    }
    
    const manpowerProgress = document.querySelector('.resource-list li:nth-child(3) .mini-progress div');
    if (manpowerProgress) {
        manpowerProgress.style.width = '100%';
    }
    
    // Add an optimization indicator
    const resourceAllocation = document.querySelector('.resource-allocation');
    if (resourceAllocation) {
        const optimizationIndicator = document.createElement('div');
        optimizationIndicator.className = 'optimization-indicator';
        optimizationIndicator.innerHTML = '<span class="indicator-dot"></span> Resources optimized based on harvest predictions';
        optimizationIndicator.style.marginTop = '15px';
        optimizationIndicator.style.padding = '8px';
        optimizationIndicator.style.backgroundColor = '#d4edda';
        optimizationIndicator.style.color = '#155724';
        optimizationIndicator.style.borderRadius = '4px';
        optimizationIndicator.style.fontSize = '14px';
        
        const indicatorDot = optimizationIndicator.querySelector('.indicator-dot');
        indicatorDot.style.display = 'inline-block';
        indicatorDot.style.width = '10px';
        indicatorDot.style.height = '10px';
        indicatorDot.style.backgroundColor = '#155724';
        indicatorDot.style.borderRadius = '50%';
        indicatorDot.style.marginRight = '8px';
        
        resourceAllocation.appendChild(optimizationIndicator);
    }
}

// Add this at the end of your script.js file
window.showResourceModal = function() {
    console.log('Direct function called');
    const modal = document.getElementById('resource-optimization-modal');
    if (modal) {
        modal.style.display = 'block';
    } else {
        console.error('Modal not found in DOM');
    }
}; 