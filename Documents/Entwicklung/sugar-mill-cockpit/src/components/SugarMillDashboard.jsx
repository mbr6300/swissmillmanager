import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import './SugarMillDashboard.css';

function SugarMillDashboard() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const svgContainerRef = useRef(null);

  // Add state for canton info
  const [cantonInfo, setCantonInfo] = useState({
    name: 'Canton Information',
    capital: '',
    population: '',
    description: 'Click on a canton to see information about it.'
  });

  // Add this state to track the selected region
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Add this state for controlling the modal visibility
  const [resourceModalVisible, setResourceModalVisible] = useState(false);

  useEffect(() => {
    // Set current date
    const currentDate = new Date();
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      dateElement.textContent = currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    
    // Initialize analytics chart
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          datasets: [{
            label: 'Production Output (tons)',
            data: [120, 132, 128, 142, 150, 160],
            backgroundColor: 'rgba(58, 126, 79, 0.2)',
            borderColor: 'rgba(58, 126, 79, 1)',
            borderWidth: 2,
            tension: 0.3
          }, {
            label: 'Quality Index (%)',
            data: [88, 86, 90, 92, 94, 95],
            backgroundColor: 'rgba(249, 200, 70, 0.2)',
            borderColor: 'rgba(249, 200, 70, 1)',
            borderWidth: 2,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              min: 80
            }
          }
        }
      });
    }
    
    // Simulate shift calendar functionality
    const shiftCalendar = document.querySelector('.shift-calendar');
    if (shiftCalendar) {
      shiftCalendar.innerHTML = `
        <div style="text-align: center;">
          <div style="font-weight: bold; margin-bottom: 10px;">October 2023</div>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px;">
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
            <div>Su</div>
            
            <div style="color: #ccc;">25</div>
            <div style="color: #ccc;">26</div>
            <div style="color: #ccc;">27</div>
            <div style="color: #ccc;">28</div>
            <div style="color: #ccc;">29</div>
            <div style="color: #ccc;">30</div>
            <div>1</div>
            
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div style="background-color: #3a7e4f; color: white; border-radius: 50%;">6</div>
            <div>7</div>
            <div>8</div>
          </div>
        </div>
      `;
    }
    
    // Simulate map placeholder
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
      mapPlaceholder.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="width: 80%; height: 80%; background-color: #e6e6b8; border-radius: 4px; position: relative; overflow: hidden;">
            <div 
              style={{
                position: 'absolute',
                top: '10%',
                left: '20%',
                width: '25%',
                height: '30%',
                backgroundColor: selectedRegion === 'A' ? '#27ae60' : '#2ecc71',
                borderRadius: '4px',
                opacity: selectedRegion === 'A' ? 0.9 : 0.7,
                cursor: 'pointer',
                border: selectedRegion === 'A' ? '2px solid #333' : 'none',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleRegionClick('A')}
            ></div>
            <div style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              width: '30%',
              height: '40%',
              backgroundColor: '#f39c12',
              borderRadius: '4px',
              opacity: 0.7
            }}></div>
            <div style={{
              position: 'absolute',
              top: '60%',
              left: '30%',
              width: '40%',
              height: '25%',
              backgroundColor: '#3498db',
              borderRadius: '4px',
              opacity: 0.7
            }}></div>
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              fontSize: '10px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: '2px 5px',
              borderRadius: '2px'
            }}>Region A: High Yield</div>
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '60%',
              fontSize: '10px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: '2px 5px',
              borderRadius: '2px'
            }}>Region B: Medium Yield</div>
            <div style={{
              position: 'absolute',
              top: '70%',
              left: '40%',
              fontSize: '10px',
              backgroundColor: 'rgba(255,255,255,0.8)',
              padding: '2px 5px',
              borderRadius: '2px'
            }}>Region C: Low Yield</div>
            <div style={{marginTop: '10px', fontSize: '12px', color: '#666'}}>
              Click "Draw Custom Region" to add new areas
            </div>
          </div>
          <div style="margin-top: 10px; font-size: 12px; color: #666;">Click "Draw Custom Field" to add new areas</div>
        </div>
      `;
    }
    
    // Filter button functionality
    const filterButton = document.querySelector('.filter-button');
    if (filterButton) {
      filterButton.addEventListener('click', function() {
        const selectedFilter = document.getElementById('data-source-filter').value;
        console.log(`Filtering data by: ${selectedFilter}`);
        
        // In a real application, this would fetch and update the chart data
        // For demo purposes, we'll just show a different dataset based on selection
        if (selectedFilter === 'production') {
          updateChartData(chartInstance.current, 
            [120, 132, 128, 142, 150, 160], 
            []);
        } else if (selectedFilter === 'quality') {
          updateChartData(chartInstance.current, 
            [], 
            [88, 86, 90, 92, 94, 95]);
        } else if (selectedFilter === 'efficiency') {
          updateChartData(chartInstance.current, 
            [], 
            [], 
            [75, 78, 82, 85, 88, 92], 
            'Efficiency Rate (%)', 
            'rgba(231, 76, 60, 0.2)', 
            'rgba(231, 76, 60, 1)');
        } else {
          // All data
          updateChartData(chartInstance.current, 
            [120, 132, 128, 142, 150, 160], 
            [88, 86, 90, 92, 94, 95]);
        }
      });
    }
    
    // Make sure the map is visible
    const mapContainer = document.querySelector('.map-container');
    const switzerlandMap = document.querySelector('.switzerland-map');
    
    // Declare regions variable at a higher scope
    const regions = document.querySelectorAll('.region');
    
    if (mapContainer && switzerlandMap) {
      // Ensure the map container has proper dimensions
      if (mapContainer.clientHeight < 100) {
        mapContainer.style.height = '400px';
      }
      
      // Make Switzerland map regions interactive with tooltips
      // Create tooltip element if it doesn't exist
      if (!document.querySelector('.region-tooltip')) {
        const tooltip = document.createElement('div');
        tooltip.className = 'region-tooltip';
        mapContainer.appendChild(tooltip);
        
        if (regions && regions.length > 0) {
          regions.forEach(region => {
            region.addEventListener('mousemove', function(e) {
              const regionName = this.getAttribute('data-region');
              const yieldValue = this.getAttribute('data-yield');
              
              tooltip.innerHTML = `<strong>${regionName}</strong><br>Predicted Yield: ${yieldValue}`;
              tooltip.style.display = 'block';
              tooltip.style.left = `${e.pageX - mapContainer.getBoundingClientRect().left + 10}px`;
              tooltip.style.top = `${e.pageY - mapContainer.getBoundingClientRect().top + 10}px`;
            });
            
            region.addEventListener('mouseleave', function() {
              tooltip.style.display = 'none';
            });
          });
        }
      }
    }
    
    // Region data for predictions and recommendations
    const regionData = {
      "ZH - Zurich": {
        sugarContent: "18.7%",
        harvestWindow: "Sep 15 - Oct 10",
        fieldArea: "4,250 hectares",
        transportTime: "35 min",
        production: "76 tons/hectare",
        historicalProduction: "71 tons/hectare",
        productionDiff: "+7%",
        totalProduction: "323,000 tons",
        historicalTotal: "301,750 tons",
        totalDiff: "+7%",
        recommendations: [
          "Prioritize northern fields for earlier harvest (higher sugar content)",
          "Coordinate with Frauenfeld processing plant for optimal delivery schedule",
          "Consider expanding contract farming in Winterthur area next year"
        ]
      },
      "BE - Bern": {
        sugarContent: "17.9%",
        harvestWindow: "Sep 20 - Oct 15",
        fieldArea: "3,800 hectares",
        transportTime: "1 hr 10 min",
        production: "72 tons/hectare",
        historicalProduction: "69 tons/hectare",
        productionDiff: "+4%",
        totalProduction: "273,600 tons",
        historicalTotal: "262,200 tons",
        totalDiff: "+4%",
        recommendations: [
          "Implement staggered harvesting to optimize mill capacity",
          "Monitor rainfall patterns in Seeland region to adjust harvest timing",
          "Consider soil improvement measures in western fields"
        ]
      },
      "VD - Vaud": {
        sugarContent: "18.2%",
        harvestWindow: "Sep 25 - Oct 20",
        fieldArea: "3,200 hectares",
        transportTime: "1 hr 30 min",
        production: "74 tons/hectare",
        historicalProduction: "70 tons/hectare",
        productionDiff: "+4%",
        totalProduction: "236,800 tons",
        historicalTotal: "224,000 tons",
        totalDiff: "+6%",
        recommendations: [
          "Prioritize fields near Lake Geneva for earlier harvest",
          "Coordinate with local transport companies to ensure timely delivery",
          "Implement precision agriculture techniques in La Côte region"
        ]
      },
      "FR - Fribourg": {
        sugarContent: "17.5%",
        harvestWindow: "Sep 20 - Oct 15",
        fieldArea: "2,100 hectares",
        transportTime: "1 hr 15 min",
        production: "70 tons/hectare",
        historicalProduction: "68 tons/hectare",
        productionDiff: "+2%",
        totalProduction: "147,000 tons",
        historicalTotal: "140,400 tons",
        totalDiff: "+5%",
        recommendations: [
          "Focus on fields in Broye valley for highest yield potential",
          "Consider increasing contract area by 10% next season",
          "Implement improved drainage in low-lying fields"
        ]
      },
      "TG - Thurgau": {
        sugarContent: "19.1%",
        harvestWindow: "Sep 10 - Oct 5",
        fieldArea: "2,800 hectares",
        transportTime: "20 min",
        production: "78 tons/hectare",
        historicalProduction: "75 tons/hectare",
        productionDiff: "+3%",
        totalProduction: "218,400 tons",
        historicalTotal: "202,500 tons",
        totalDiff: "+8%",
        recommendations: [
          "This region shows highest sugar content - prioritize for processing",
          "Proximity to Frauenfeld factory offers logistical advantages",
          "Expand contract farming in this region next year"
        ]
      },
      "AG - Aargau": {
        sugarContent: "18.4%",
        harvestWindow: "Sep 15 - Oct 10",
        fieldArea: "2,500 hectares",
        transportTime: "45 min",
        production: "75 tons/hectare",
        historicalProduction: "72 tons/hectare",
        productionDiff: "+3%",
        totalProduction: "187,500 tons",
        historicalTotal: "175,000 tons",
        totalDiff: "+7%",
        recommendations: [
          "Coordinate with Rhine valley farmers for optimal harvest timing",
          "Implement soil conservation measures in sloped fields",
          "Consider water management improvements in eastern areas"
        ]
      },
      "SG - St. Gallen": {
        sugarContent: "17.8%",
        harvestWindow: "Sep 20 - Oct 15",
        fieldArea: "1,900 hectares",
        transportTime: "50 min",
        production: "71 tons/hectare",
        historicalProduction: "69 tons/hectare",
        productionDiff: "+2%",
        totalProduction: "134,900 tons",
        historicalTotal: "126,500 tons",
        totalDiff: "+7%",
        recommendations: [
          "Monitor soil moisture levels in Rhine valley fields",
          "Implement crop rotation improvements for better soil health",
          "Consider earlier varieties for northern fields"
        ]
      },
      "NE - Neuchâtel": {
        sugarContent: "17.2%",
        harvestWindow: "Sep 25 - Oct 20",
        fieldArea: "1,450 hectares",
        transportTime: "1 hr 45 min",
        production: "68 tons/hectare",
        historicalProduction: "72 tons/hectare",
        productionDiff: "-6%",
        totalProduction: "98,600 tons",
        historicalTotal: "104,400 tons",
        totalDiff: "-6%",
        recommendations: [
          "Long transport time requires careful logistics planning",
          "Investigate causes of yield decline compared to historical average",
          "Consider soil improvement measures for next season"
        ]
      },
      "VS - Valais": {
        sugarContent: "16.1%",
        harvestWindow: "Oct 5 - Oct 30",
        fieldArea: "850 hectares",
        transportTime: "2 hr 30 min",
        production: "58 tons/hectare",
        historicalProduction: "65 tons/hectare",
        productionDiff: "-11%",
        totalProduction: "49,300 tons",
        historicalTotal: "55,250 tons",
        totalDiff: "-11%",
        recommendations: [
          "Urgent attention needed to address significant yield decline",
          "Consider reducing allocation in this region due to declining performance",
          "Implement comprehensive soil and water management plan"
        ]
      },
      "TI - Ticino": {
        sugarContent: "16.5%",
        harvestWindow: "Oct 1 - Oct 25",
        fieldArea: "920 hectares",
        transportTime: "2 hr 15 min",
        production: "62 tons/hectare",
        historicalProduction: "68 tons/hectare",
        productionDiff: "-9%",
        totalProduction: "57,040 tons",
        historicalTotal: "62,560 tons",
        totalDiff: "-9%",
        recommendations: [
          "Long transport time and declining yields require reassessment",
          "Consider alternative crop rotation to improve soil health",
          "Implement more frequent quality checks during harvest"
        ]
      },
      "GR - Graubünden": {
        sugarContent: "16.8%",
        harvestWindow: "Oct 1 - Oct 25",
        fieldArea: "1,100 hectares",
        transportTime: "1 hr 50 min",
        production: "64 tons/hectare",
        historicalProduction: "69 tons/hectare",
        productionDiff: "-7%",
        totalProduction: "70,400 tons",
        historicalTotal: "75,900 tons",
        totalDiff: "-7%",
        recommendations: [
          "Analyze soil conditions to address declining yields",
          "Consider adjusting planting schedule for next season",
          "Implement improved irrigation in drought-prone areas"
        ]
      },
      "JU - Jura": {
        sugarContent: "16.9%",
        harvestWindow: "Sep 25 - Oct 20",
        fieldArea: "1,350 hectares",
        transportTime: "1 hr 30 min",
        production: "65 tons/hectare",
        historicalProduction: "68 tons/hectare",
        productionDiff: "-4%",
        totalProduction: "87,750 tons",
        historicalTotal: "91,800 tons",
        totalDiff: "-4%",
        recommendations: [
          "Investigate soil nutrient deficiencies in eastern fields",
          "Consider adjusting planting schedule for next season",
          "Implement improved drainage in low-lying areas"
        ]
      },
      "Central Switzerland": {
        sugarContent: "17.0%",
        harvestWindow: "Sep 25 - Oct 20",
        fieldArea: "1,600 hectares",
        transportTime: "1 hr 15 min",
        production: "67 tons/hectare",
        historicalProduction: "70 tons/hectare",
        productionDiff: "-4%",
        totalProduction: "107,200 tons",
        historicalTotal: "112,000 tons",
        totalDiff: "-4%",
        recommendations: [
          "Address yield decline in higher elevation fields",
          "Consider soil improvement measures for next season",
          "Evaluate impact of recent weather patterns on production"
        ]
      }
    };

    // Default data for regions not specifically defined
    const defaultRegionData = {
      sugarContent: "17.5%",
      harvestWindow: "Sep 20 - Oct 15",
      fieldArea: "1,200 hectares",
      transportTime: "1 hr 20 min",
      production: "69 tons/hectare",
      historicalProduction: "67 tons/hectare",
      productionDiff: "+3%",
      totalProduction: "82,800 tons",
      historicalTotal: "80,400 tons",
      totalDiff: "+3%",
      recommendations: [
        "Monitor sugar content weekly to determine optimal harvest time",
        "Coordinate with local farmers to ensure timely harvesting",
        "Adjust transport schedule based on mill capacity"
      ]
    };

    // Update the region click handler
    if (regions && regions.length > 0) {
      regions.forEach(region => {
        // Keep the existing mousemove and mouseleave handlers
        
        // Replace the click handler
        region.addEventListener('click', function() {
          const regionNameValue = this.getAttribute('data-region');
          const yieldValue = this.getAttribute('data-yield');
          
          // Get the overlay elements
          const overlay = document.getElementById('region-details-overlay');
          const regionNameElement = document.getElementById('region-name');
          const regionYieldElement = document.getElementById('region-yield');
          const sugarContentElement = document.getElementById('sugar-content');
          const harvestWindowElement = document.getElementById('harvest-window');
          const fieldAreaElement = document.getElementById('field-area');
          const transportTimeElement = document.getElementById('transport-time');
          const productionYieldElement = document.getElementById('production-yield');
          const yieldComparisonElement = document.getElementById('yield-comparison');
          const totalProductionElement = document.getElementById('total-production');
          const totalComparisonElement = document.getElementById('total-comparison');
          const recommendationsListElement = document.getElementById('recommendations-list');
          
          // Get region specific data or use default
          const data = regionData[regionNameValue] || defaultRegionData;
          
          // Update overlay content
          if (regionNameElement) regionNameElement.textContent = regionNameValue;
          if (regionYieldElement) regionYieldElement.textContent = yieldValue;
          if (sugarContentElement) sugarContentElement.textContent = data.sugarContent;
          if (harvestWindowElement) harvestWindowElement.textContent = data.harvestWindow;
          if (fieldAreaElement) fieldAreaElement.textContent = data.fieldArea;
          if (transportTimeElement) transportTimeElement.textContent = data.transportTime;
          if (productionYieldElement) productionYieldElement.textContent = data.production;
          if (totalProductionElement) totalProductionElement.textContent = data.totalProduction;
          
          // Add historical comparison data
          if (yieldComparisonElement) {
            yieldComparisonElement.textContent = `vs ${data.historicalProduction} (${data.productionDiff})`;
            yieldComparisonElement.className = 'historical-comparison ' + 
              (data.productionDiff.includes('+') ? 'positive' : 'negative');
          }
          
          if (totalComparisonElement) {
            totalComparisonElement.textContent = `vs ${data.historicalTotal} (${data.totalDiff})`;
            totalComparisonElement.className = 'historical-comparison ' + 
              (data.totalDiff.includes('+') ? 'positive' : 'negative');
          }
          
          // Update recommendations
          if (recommendationsListElement) {
            recommendationsListElement.innerHTML = '';
            data.recommendations.forEach(rec => {
              const li = document.createElement('li');
              li.textContent = rec;
              recommendationsListElement.appendChild(li);
            });
          }
          
          // Show the overlay
          if (overlay) {
            overlay.classList.add('active');
          }
        });
      });
      
      // Add close button functionality
      const closeButton = document.getElementById('close-overlay');
      if (closeButton) {
        closeButton.addEventListener('click', function() {
          const overlay = document.getElementById('region-details-overlay');
          if (overlay) {
            overlay.classList.remove('active');
          }
        });
      }
      
      // Add detailed analysis button functionality
      const detailedAnalysisBtn = document.getElementById('detailed-analysis-btn');
      if (detailedAnalysisBtn) {
        detailedAnalysisBtn.addEventListener('click', function() {
          const regionName = document.getElementById('region-name').textContent;
          alert(`Detailed analysis for ${regionName} would open in a new view.\n\nThis would include historical data, trend analysis, and predictive modeling for future yields.`);
        });
      }
    }
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Update the SVG interaction useEffect to include dynamic coloring
  useEffect(() => {
    // Only run this effect once the component is mounted
    if (!svgContainerRef.current) return;

    const loadSvg = async () => {
      try {
        // Get the correct path to the SVG
        const svgPath = `${process.env.PUBLIC_URL}/switzerland-map.svg`;
        console.log('Loading SVG from:', svgPath);
        
        // Fetch the SVG content
        const response = await fetch(svgPath);
        if (!response.ok) {
          throw new Error(`Failed to load SVG: ${response.status}`);
        }
        
        // Get the SVG text content
        const svgText = await response.text();
        
        // Set the SVG content to the container
        svgContainerRef.current.innerHTML = svgText;
        
        // Now that the SVG is loaded directly in the DOM, we can interact with it
        const svgElement = svgContainerRef.current.querySelector('svg');
        if (!svgElement) {
          console.error('SVG element not found in the loaded content');
          return;
        }
        
        // Set SVG attributes for proper display
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
        svgElement.style.maxWidth = '100%';
        svgElement.style.maxHeight = '100%';
        
        // If the SVG doesn't have a viewBox, create one
        if (!svgElement.getAttribute('viewBox')) {
          const width = svgElement.getAttribute('width') || 800;
          const height = svgElement.getAttribute('height') || 600;
          svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
        }
        
        // Make sure it preserves aspect ratio
        svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        
        // Expanded list of canton IDs
        const cantonIds = [
          'CHZH', 'CHBE', 'CHVD', 'CHGE', 'CHTI', 'CHSG',  // Original cantons
          'CHLU', 'CHUR', 'CHSZ', 'CHOW', 'CHNW', 'CHGL',  // Additional cantons
          'CHZG', 'CHFR', 'CHSO', 'CHBS', 'CHBL', 'CHSH',
          'CHAR', 'CHAI', 'CHGR', 'CHAG', 'CHTG', 'CHNE',
          'CHJU', 'CHVS'  // All 26 Swiss cantons
        ];
        
        // Try different selectors to find the canton elements
        let cantonElements = [];
        
        // First try by ID
        cantonIds.forEach(id => {
          const element = svgElement.getElementById(id);
          if (element) cantonElements.push(element);
        });
        
        // If no elements found by ID, try paths and other elements
        if (cantonElements.length === 0) {
          const paths = svgElement.querySelectorAll('path, polygon');
          paths.forEach(path => cantonElements.push(path));
        }
        
        console.log(`Found ${cantonElements.length} potential canton elements`);
        
        // Function to get color based on yield trend
        const getYieldTrendColor = (cantonCode) => {
          // Remove CH prefix if present
          const code = cantonCode.replace('CH', '');
          
          // Canton data mapping (simplified version)
          const trendData = {
            ZH: 5.1,
            BE: -2.1,
            VD: 5.9,
            GE: -0.6,
            TI: -2.3,
            SG: 0.6,
            LU: 3.9,
            UR: -2.8,
            AG: 3.6,
            VS: -5.5,
            // Add more cantons as needed
          };
          
          const trend = trendData[code] || 0;
          
          // Color scale from red (negative) to yellow (neutral) to green (positive)
          if (trend <= -4) return '#e74c3c'; // Strong negative - red
          if (trend < -2) return '#e67e22';  // Moderate negative - orange
          if (trend < 0) return '#f1c40f';   // Slight negative - yellow
          if (trend < 2) return '#f9e79f';   // Neutral to slight positive - light yellow
          if (trend < 4) return '#2ecc71';   // Moderate positive - light green
          return '#27ae60';                  // Strong positive - green
        };
        
        // Make the elements interactive
        cantonElements.forEach(element => {
          // Get element ID or generate one
          const id = element.id || `canton-${Math.random().toString(36).substr(2, 9)}`;
          
          // Store original styles
          const originalFill = element.getAttribute('fill') || '#e6e6b8';
          const originalStroke = element.getAttribute('stroke') || '#333';
          const originalStrokeWidth = element.getAttribute('stroke-width') || '1';
          
          // Make it interactive
          element.style.cursor = 'pointer';
          element.style.transition = 'all 0.3s ease';
          
          // Get the color based on yield trend
          const trendColor = getYieldTrendColor(id);
          
          // Update styles based on selection
          if (selectedRegion === id) {
            element.setAttribute('fill', trendColor);
            element.setAttribute('stroke', '#16a085');
            element.setAttribute('stroke-width', '2');
            element.setAttribute('opacity', '0.9');
          } else {
            // Use trend-based coloring for all cantons
            element.setAttribute('fill', trendColor);
            element.setAttribute('stroke', originalStroke);
            element.setAttribute('stroke-width', originalStrokeWidth);
            element.setAttribute('opacity', '0.7');
          }
          
          // Add click handler
          element.addEventListener('click', () => {
            console.log(`Element clicked: ${id}`);
            // Extract canton code from ID if possible
            const cantonMatch = id.match(/CH([A-Z]{2})/);
            const cantonCode = cantonMatch ? `CH${cantonMatch[1]}` : id;
            handleRegionClick(cantonCode);
          });
        });
      } catch (error) {
        console.error('Error loading or processing SVG:', error);
      }
    };
    
    // Load the SVG
    loadSvg();
    
    // Cleanup function
    return () => {
      if (svgContainerRef.current) {
        svgContainerRef.current.innerHTML = '';
      }
    };
  }, [selectedRegion]); // Re-run when selectedRegion changes

  // Update the handleRegionClick function with varied yield data
  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    
    // Remove the CH prefix for the switch statement
    const cantonCode = region.replace('CH', '');
    
    // Define default values to prevent undefined errors
    const defaultCantonInfo = {
      name: cantonCode,
      capital: 'Information not available',
      population: 'Information not available',
      qualityIndex: 'N/A',
      description: 'Detailed information about this canton is not available.',
      yieldPrediction: 'N/A',
      yieldTrend: 0,
      sugarContent: 'N/A',
      sugarTrend: 0,
      harvestDate: 'N/A',
      transportTrend: 0,
      recommendations: [
        'No specific recommendations available for this region.'
      ]
    };
    
    // Canton data with varied yield predictions
    const cantonData = {
      ZH: {
        name: 'Zürich',
        capital: 'Zürich',
        population: '1.5 million',
        qualityIndex: '86',
        description: 'Zürich has high sugar beet production with excellent quality due to optimal soil conditions and advanced farming techniques.',
        yieldPrediction: '68.5 tons/hectare',
        previousYield: '65.2 tons/hectare',
        yieldTrend: 5.1,  // Positive trend (percentage change)
        sugarContent: '17.8%',
        sugarTrend: 0.5,
        harvestDate: 'October 1-15, 2023',
        transportTrend: -1,
        recommendations: [
          'Schedule harvest during optimal weather conditions',
          'Utilize precision agriculture for fertilizer application',
          'Coordinate with processing facility for just-in-time delivery'
        ]
      },
      BE: {
        name: 'Bern',
        capital: 'Bern',
        population: '1 million',
        qualityIndex: '88',
        description: 'Bern has medium yield but consistent production. The canton\'s diverse topography allows for varied agricultural practices.',
        yieldPrediction: '65.8 tons/hectare',
        previousYield: '67.2 tons/hectare',
        yieldTrend: -2.1,  // Negative trend
        sugarContent: '17.5%',
        sugarTrend: 0.3,
        harvestDate: 'October 10-20, 2023',
        transportTrend: -0.5,
        recommendations: [
          'Focus on soil quality improvement in northern regions',
          'Implement water conservation techniques',
          'Consider crop rotation to improve soil fertility'
        ]
      },
      VD: {
        name: 'Vaud',
        capital: 'Lausanne',
        population: '800,000',
        qualityIndex: '86',
        description: 'Vaud is known for its early harvest potential. The canton\'s favorable climate conditions create an ideal environment for sugar beet cultivation.',
        yieldPrediction: '72.3 tons/hectare',
        previousYield: '68.3 tons/hectare',
        yieldTrend: 5.9,  // Positive trend
        sugarContent: '16.9%',
        sugarTrend: -0.2,
        harvestDate: 'September 25 - October 5, 2023',
        transportTrend: 0.8,
        recommendations: [
          'Take advantage of early harvest window',
          'Monitor sugar content closely as harvest approaches',
          'Prepare transportation logistics for peak harvest period'
        ]
      },
      GE: {
        name: 'Geneva',
        capital: 'Geneva',
        population: '500,000',
        qualityIndex: '90',
        description: 'Geneva has smaller but highly efficient sugar beet farms. The canton\'s limited agricultural space has led to innovative farming techniques.',
        yieldPrediction: '70.1 tons/hectare',
        previousYield: '70.5 tons/hectare',
        yieldTrend: -0.6,  // Slight negative trend
        sugarContent: '17.8%',
        sugarTrend: 0.7,
        harvestDate: 'October 1-10, 2023',
        transportTrend: 0.3,
        recommendations: [
          'Continue implementing precision farming techniques',
          'Optimize harvest scheduling to maximize sugar content',
          'Consider cooperative transportation with neighboring farms'
        ]
      },
      TI: {
        name: 'Ticino',
        capital: 'Bellinzona',
        population: '350,000',
        qualityIndex: '82',
        description: 'Ticino has unique growing conditions due to its southern location and Mediterranean climate, producing sugar beets with distinctive characteristics.',
        yieldPrediction: '62.5 tons/hectare',
        previousYield: '64.0 tons/hectare',
        yieldTrend: -2.3,  // Negative trend
        sugarContent: '16.2%',
        sugarTrend: -0.8,
        harvestDate: 'October 15-25, 2023',
        transportTrend: -1.2,
        recommendations: [
          'Address declining yield trends with soil amendments',
          'Evaluate irrigation practices for efficiency',
          'Consider earlier planting dates to extend growing season'
        ]
      },
      SG: {
        name: 'St. Gallen',
        capital: 'St. Gallen',
        population: '510,000',
        qualityIndex: '85',
        description: 'St. Gallen combines traditional and modern farming methods, resulting in reliable sugar beet production with good quality metrics.',
        yieldPrediction: '67.9 tons/hectare',
        previousYield: '67.5 tons/hectare',
        yieldTrend: 0.6,  // Slight positive trend
        sugarContent: '17.1%',
        sugarTrend: 0.1,
        harvestDate: 'October 8-18, 2023',
        transportTrend: 0.2,
        recommendations: [
          'Balance traditional and modern farming techniques',
          'Focus on maintaining consistent sugar content',
          'Optimize transportation routes to reduce costs'
        ]
      },
      LU: {
        name: 'Lucerne',
        capital: 'Lucerne',
        population: '410,000',
        qualityIndex: '84',
        description: 'Lucerne has a growing sugar beet industry with moderate yields and good quality.',
        yieldPrediction: '64.2 tons/hectare',
        previousYield: '61.8 tons/hectare',
        yieldTrend: 3.9,  // Positive trend
        sugarContent: '16.8%',
        sugarTrend: 0.4,
        harvestDate: 'October 5-15, 2023',
        transportTrend: 0.5,
        recommendations: [
          'Expand cultivation areas in northern regions',
          'Implement advanced irrigation systems',
          'Increase organic matter in soil for better water retention'
        ]
      },
      UR: {
        name: 'Uri',
        capital: 'Altdorf',
        population: '36,000',
        qualityIndex: '79',
        description: 'Uri has limited sugar beet production due to its mountainous terrain, but maintains quality in available areas.',
        yieldPrediction: '58.5 tons/hectare',
        previousYield: '60.2 tons/hectare',
        yieldTrend: -2.8,  // Negative trend
        sugarContent: '16.5%',
        sugarTrend: -0.3,
        harvestDate: 'October 10-20, 2023',
        transportTrend: -0.8,
        recommendations: [
          'Focus on valley areas with better soil conditions',
          'Consider alternative crop varieties better suited to local climate',
          'Improve drainage systems in cultivation areas'
        ]
      },
      // Add more cantons with varied data...
      AG: {
        name: 'Aargau',
        capital: 'Aarau',
        population: '680,000',
        qualityIndex: '87',
        description: 'Aargau is one of the leading sugar beet producers with excellent infrastructure and farming practices.',
        yieldPrediction: '71.2 tons/hectare',
        previousYield: '68.7 tons/hectare',
        yieldTrend: 3.6,  // Positive trend
        sugarContent: '17.6%',
        sugarTrend: 0.6,
        harvestDate: 'October 1-15, 2023',
        transportTrend: -0.4,
        recommendations: [
          'Continue expanding high-efficiency farming areas',
          'Implement latest harvesting technology',
          'Optimize fertilizer application timing'
        ]
      },
      VS: {
        name: 'Valais',
        capital: 'Sion',
        population: '345,000',
        qualityIndex: '81',
        description: 'Valais has unique growing conditions in its valley regions, with irrigation from alpine water sources.',
        yieldPrediction: '63.8 tons/hectare',
        previousYield: '67.5 tons/hectare',
        yieldTrend: -5.5,  // Significant negative trend
        sugarContent: '16.7%',
        sugarTrend: -0.5,
        harvestDate: 'October 5-20, 2023',
        transportTrend: 0.7,
        recommendations: [
          'Address soil salinity issues in southern regions',
          'Revise irrigation schedules based on climate data',
          'Consider pest-resistant varieties for next season'
        ]
      }
    };
    
    // Get canton info or use default if not found
    const cantonInfo = cantonData[cantonCode] || defaultCantonInfo;
    
    // Set the canton info
    setCantonInfo(cantonInfo);
  };

  // Add this function
  const updateChartData = (chart, productionData, qualityData, newData, newLabel, newBgColor, newBorderColor) => {
    if (!chart) return;
    
    // Update existing datasets
    if (productionData.length > 0) {
      chart.data.datasets[0].data = productionData;
      chart.data.datasets[0].hidden = false;
    } else {
      chart.data.datasets[0].hidden = true;
    }
    
    if (qualityData.length > 0) {
      chart.data.datasets[1].data = qualityData;
      chart.data.datasets[1].hidden = false;
    } else {
      chart.data.datasets[1].hidden = true;
    }
    
    // Add new dataset if provided
    if (newData && newData.length > 0) {
      if (chart.data.datasets.length > 2) {
        chart.data.datasets[2].data = newData;
        chart.data.datasets[2].hidden = false;
      } else {
        chart.data.datasets.push({
          label: newLabel || 'New Data',
          data: newData,
          backgroundColor: newBgColor || 'rgba(52, 152, 219, 0.2)',
          borderColor: newBorderColor || 'rgba(52, 152, 219, 1)',
          borderWidth: 2,
          tension: 0.3
        });
      }
    } else if (chart.data.datasets.length > 2) {
      chart.data.datasets[2].hidden = true;
    }
    
    chart.update();
  };

  // Add this to your useEffect to handle canton info and remove the green bar
  useEffect(() => {
    // When canton info changes, check for and remove any unwanted elements
    const infoPanel = document.querySelector('.info-panel');
    if (infoPanel) {
      // Look for any green rectangles or unwanted elements
      const greenBars = infoPanel.querySelectorAll('[style*="background-color: #3a7e4f"], [style*="background-color:#3a7e4f"], .green-bar, .green-rectangle');
      greenBars.forEach(el => {
        el.style.display = 'none';
      });
      
      // Also check for any elements with green background that might be at the top
      const allElements = infoPanel.querySelectorAll('*');
      allElements.forEach(el => {
        const style = window.getComputedStyle(el);
        if (style.backgroundColor.includes('rgb(58, 126, 79)') || 
            style.backgroundColor.includes('#3a7e4f') ||
            style.backgroundColor.includes('rgb(46, 204, 113)') ||
            style.backgroundColor.includes('#2ecc71')) {
          el.style.display = 'none';
        }
      });
    }
  }, [selectedRegion, cantonInfo]);

  // Add a useEffect hook to fix the SVG viewBox
  useEffect(() => {
    const svgObject = document.querySelector('object[type="image/svg+xml"]');
    
    if (svgObject) {
      svgObject.onload = function() {
        try {
          const svgDoc = svgObject.contentDocument;
          if (!svgDoc) return;
          
          const svgElement = svgDoc.querySelector('svg');
          if (svgElement) {
            // Ensure the SVG has a proper viewBox
            if (!svgElement.getAttribute('viewBox')) {
              // Get the natural dimensions of the SVG
              const width = svgElement.getAttribute('width') || svgElement.getBoundingClientRect().width || 800;
              const height = svgElement.getAttribute('height') || svgElement.getBoundingClientRect().height || 600;
              
              // Set a viewBox that shows the entire SVG
              svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
            }
            
            // Ensure the SVG preserves aspect ratio and fits in the container
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', '100%');
          }
        } catch (error) {
          console.error('Error adjusting SVG viewBox:', error);
        }
      };
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('sugarMillAuthenticated');
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo" style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <img 
            src={`${process.env.PUBLIC_URL}/logo-swissmill.png`} 
            alt="Swiss Mill Logo" 
            style={{
              height: '40px',
              marginRight: '10px'
            }}
          />
          <h1 style={{ 
            margin: 0,
            fontSize: '20px',
            color: '#3a7e4f'  // Keeping the green color
          }}>
            Sugar Mill Manager
          </h1>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto' // This pushes everything to the right
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginRight: '15px'
          }}>
            <span id="current-date" style={{ fontSize: '14px', color: '#666' }}></span>
            <span id="user-name" style={{ fontWeight: 'bold', color: '#333' }}>Factory Manager</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            padding: '5px 10px',
            borderRadius: '20px',
            marginRight: '15px'
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#3a7e4f',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              FM
            </div>
          </div>
          
          <div className="header-actions" style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '8px 12px',
                color: '#666',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="dashboard-grid">
        {/* Harvest Optimization Section - Now First */}
        <div className="dashboard-card harvest">
          <h2>Harvest Optimization</h2>
          <div className="card-content">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                backgroundColor: '#f0f7e6',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0', fontSize: '16px', color: '#333' }}>National Sugar Beet Area</h3>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#3a7e4f', 
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  21,500 ha
                  <span style={{ 
                    fontSize: '14px', 
                    marginLeft: '8px', 
                    color: '#2ecc71',
                    padding: '2px 5px',
                    borderRadius: '4px'
                  }}>↑2.1%</span>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total cultivation area in Switzerland</div>
              </div>
              
              <div style={{
                backgroundColor: '#f0f7e6',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0', fontSize: '16px', color: '#333' }}>Average Yield</h3>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#3a7e4f', 
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  73 t/ha
                  <span style={{ 
                    fontSize: '14px', 
                    marginLeft: '8px', 
                    color: '#2ecc71',
                    padding: '2px 5px',
                    borderRadius: '4px'
                  }}>↑4.3%</span>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>National average for current season</div>
              </div>
              
              <div style={{
                backgroundColor: '#f0f7e6',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0', fontSize: '16px', color: '#333' }}>Expected Production</h3>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#3a7e4f', 
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  1.57M tons
                  <span style={{ 
                    fontSize: '14px', 
                    marginLeft: '8px', 
                    color: '#2ecc71',
                    padding: '2px 5px',
                    borderRadius: '4px'
                  }}>↑6.8%</span>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total expected sugar beet harvest</div>
              </div>
              
              <div style={{
                backgroundColor: '#f0f7e6',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0', fontSize: '16px', color: '#333' }}>Sugar Content</h3>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: '#3a7e4f', 
                  margin: '10px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  18.2%
                  <span style={{ 
                    fontSize: '14px', 
                    marginLeft: '8px', 
                    color: '#2ecc71',
                    padding: '2px 5px',
                    borderRadius: '4px'
                  }}>↑0.5%</span>
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>National average sugar content</div>
              </div>
            </div>
            
            <h3>Field Yield Prediction by Canton</h3>
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '60%',
                height: '400px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div 
                  ref={svgContainerRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
              </div>
              
              <div className="canton-info-panel" style={{
                width: '40%',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* First row: Capital and Quality Index */}
                <div style={{
                  padding: '15px',
                  borderBottom: '1px solid #ddd',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#555',
                      fontWeight: 'bold',
                      textAlign: 'left'
                    }}>
                      Capital: {cantonInfo.capital}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#666',
                      marginTop: '3px',
                      textAlign: 'left'
                    }}>
                      Pop: {cantonInfo.population}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}>
                    {cantonInfo.qualityIndex}/100
                  </div>
                </div>
                
                {/* Description */}
                <div style={{
                  padding: '15px',
                  borderBottom: '1px solid #ddd'
                }}>
                  <p style={{
                    margin: '0',
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: '1.5',
                    textAlign: 'center'
                  }}>
                    {cantonInfo.description}
                  </p>
                </div>
                
                {/* Harvest Predictions Header */}
                <div style={{
                  padding: '15px',
                  textAlign: 'center',
                  borderBottom: '1px solid #ddd'
                }}>
                  <h3 style={{
                    margin: '0',
                    fontSize: '18px',
                    color: '#3a7e4f'
                  }}>
                    Harvest Predictions
                  </h3>
                </div>
                
                {/* Yield and Sugar Content */}
                <div style={{
                  display: 'flex',
                  borderBottom: '1px solid #ddd'
                }}>
                  {/* Yield */}
                  <div style={{
                    flex: 1,
                    backgroundColor: '#f5f9f7',
                    padding: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Yield</div>
                    <div style={{ 
                      fontSize: '22px', 
                      fontWeight: 'bold', 
                      color: '#3a7e4f',
                      marginBottom: '5px'
                    }}>
                      {cantonInfo.yieldPrediction} <span style={{ fontSize: '14px', fontWeight: 'normal' }}>t/ha</span>
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: cantonInfo.yieldTrend >= 0 ? '#27ae60' : '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      {cantonInfo.yieldTrend >= 0 ? '↑' : '↓'} {Math.abs(cantonInfo.yieldTrend).toFixed(2)}%
                    </div>
                  </div>
                  
                  {/* Sugar Content */}
                  <div style={{
                    flex: 1,
                    backgroundColor: '#fff9e6',
                    padding: '15px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>Sugar Content</div>
                    <div style={{ 
                      fontSize: '22px', 
                      fontWeight: 'bold', 
                      color: '#f39c12',
                      marginBottom: '5px'
                    }}>
                      {cantonInfo.sugarContent}
                    </div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: cantonInfo.sugarTrend >= 0 ? '#27ae60' : '#e74c3c',
                      fontWeight: 'bold'
                    }}>
                      {cantonInfo.sugarTrend >= 0 ? '↑' : '↓'} {Math.abs(cantonInfo.sugarTrend).toFixed(2)}%
                    </div>
                  </div>
                </div>
                
                {/* Harvest Date and Transport */}
                <div style={{
                  padding: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid #ddd'
                }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Harvest Date:</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{cantonInfo.harvestDate}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Transport:</div>
                    <div style={{ 
                      fontSize: '14px', 
                      color: cantonInfo.transportTrend < 0 ? '#27ae60' : '#e74c3c'
                    }}>
                      {cantonInfo.transportTrend < 0 ? '↓ Decreased Need' : '↑ Increased Need'}
                    </div>
                  </div>
                </div>
                
                {/* Recommendations */}
                <div style={{
                  padding: '15px'
                }}>
                  <h3 style={{
                    margin: '0 0 10px 0',
                    fontSize: '16px',
                    color: '#3a7e4f',
                    textAlign: 'center'
                  }}>
                    Recommendations:
                  </h3>
                  <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: '1.6',
                    textAlign: 'left'
                  }}>
                    {cantonInfo.recommendations && cantonInfo.recommendations.map((recommendation, index) => (
                      <li key={index} style={{ textAlign: 'left' }}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="map-actions" style={{ marginTop: '10px' }}>
              <button className="action-button">
                Draw Custom Region
              </button>
              <button className="action-button">
                View Detailed Analysis
              </button>
            </div>
          </div>
        </div>
        
        {/* Workforce Management Section */}
        <div className="dashboard-card workforce">
          <h2>Workforce Management</h2>
          <div className="card-content">
            <div className="shift-planning">
              <h3>Shift Planning</h3>
              <div className="shift-calendar">
                {/* Calendar view will be rendered here */}
              </div>
              <button className="action-button">Optimize Shifts</button>
            </div>
            <div className="worker-stats">
              <h3>Workers on Duty: <span id="workers-count">42</span></h3>
              <div className="progress-bar">
                <div className="progress" style={{ width: '85%' }}></div>
              </div>
              <p>85% of optimal workforce</p>
            </div>
          </div>
        </div>
        
        {/* Logistics Management Section */}
        <div className="dashboard-card logistics">
          <h2>Logistics & Resources</h2>
          <div className="card-content">
            <div className="resource-allocation">
              <h3>Resource Allocation</h3>
              <ul className="resource-list">
                <li>
                  <span className="resource-name">Trucks</span>
                  <span className="resource-value">18/24 available</span>
                  <div className="mini-progress">
                    <div style={{ width: '75%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="resource-name">Railway Capacity</span>
                  <span className="resource-value">90% utilized</span>
                  <div className="mini-progress">
                    <div style={{ width: '90%' }}></div>
                  </div>
                </li>
                <li>
                  <span className="resource-name">Manpower</span>
                  <span className="resource-value">85% allocated</span>
                  <div className="mini-progress">
                    <div style={{ width: '85%' }}></div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="logistics-actions">
              <button 
                className="action-button optimize-resources-btn" 
                type="button"
                onClick={() => setResourceModalVisible(true)}
              >
                Optimize Resources
              </button>
              <button className="action-button">Schedule Transport</button>
            </div>
          </div>
        </div>
        
        {/* Supplier Management Section */}
        <div className="dashboard-card suppliers">
          <h2>Supplier Management</h2>
          <div className="card-content">
            <div className="supplier-timing">
              <h3>Upcoming Deliveries</h3>
              <table className="supplier-table">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Material</th>
                    <th>ETA</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>AgriCane Ltd.</td>
                    <td>Raw Sugarcane</td>
                    <td>Today, 14:30</td>
                    <td className="status on-time">On Time</td>
                  </tr>
                  <tr>
                    <td>ChemSupply Co.</td>
                    <td>Processing Chemicals</td>
                    <td>Tomorrow, 09:00</td>
                    <td className="status on-time">On Time</td>
                  </tr>
                  <tr>
                    <td>PackMasters Inc.</td>
                    <td>Packaging Materials</td>
                    <td>Today, 16:00</td>
                    <td className="status delayed">Delayed</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="supplier-actions">
              <button className="action-button">Contact Suppliers</button>
              <button className="action-button">View All Deliveries</button>
            </div>
          </div>
        </div>
        
        {/* Data Analytics Section */}
        <div className="dashboard-card data-analytics">
          <h2>Data Analytics</h2>
          <div className="card-content">
            <div className="data-filters">
              <select id="data-source-filter">
                <option value="all">All Data Sources</option>
                <option value="production">Production Data</option>
                <option value="quality">Quality Metrics</option>
                <option value="efficiency">Efficiency Metrics</option>
              </select>
              <button className="filter-button">Filter</button>
            </div>
            <div className="data-visualization" style={{ 
              backgroundColor: '#f5f5f5', 
              height: '200px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              borderRadius: '4px'
            }}>
              <div>Chart visualization will appear here</div>
            </div>
            <div className="data-insights">
              <h3>Key Insights</h3>
              <ul>
                <li>Production efficiency increased by 12% this week</li>
                <li>Quality control issues reduced by 8%</li>
                <li>Optimal harvest time identified: 6-8 AM</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Core Factory Data Section */}
        <div className="dashboard-card core-data">
          <h2>Core Factory Data</h2>
          <div className="card-content">
            <div className="data-grid">
              <div className="data-item">
                <h3>Employees</h3>
                <div className="data-value">124</div>
              </div>
              <div className="data-item">
                <h3>Storage Capacity</h3>
                <div className="data-value">78% <span className="trend positive">↑3%</span></div>
              </div>
              <div className="data-item">
                <h3>Railway Usage</h3>
                <div className="data-value">90% <span className="trend negative">↓5%</span></div>
              </div>
              <div className="data-item">
                <h3>Truck Fleet</h3>
                <div className="data-value">24 <span className="status">(18 active)</span></div>
              </div>
              <div className="data-item">
                <h3>Production Volume</h3>
                <div className="data-value">142 tons <span className="trend positive">↑12%</span></div>
              </div>
              <div className="data-item">
                <h3>Field Parcels</h3>
                <div className="data-value">28 active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Optimization Modal */}
      <div 
        className="modal-overlay" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: resourceModalVisible ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}
      >
        <div className="modal-content" style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          width: '80%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}>
          <div className="modal-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            paddingBottom: '10px',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0, color: '#3a7e4f' }}>Resource Optimization</h2>
            <button 
              onClick={() => setResourceModalVisible(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666'
              }}
            >
              ×
            </button>
          </div>
          
          <div className="modal-body">
            <p>Based on harvest predictions and current resource availability, we recommend the following allocation:</p>
            
            <div className="resource-allocation-table" style={{
              marginTop: '20px',
              marginBottom: '20px'
            }}>
              <h3>Recommended Resource Allocation</h3>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '10px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Resource</th>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Current Allocation</th>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Recommended Allocation</th>
                    <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #ddd' }}>Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>Trucks</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>18/24 available</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>24/24 allocated</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', color: '#2ecc71' }}>+6 trucks</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>Railway Capacity</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>75% utilized</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>100% optimized</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', color: '#2ecc71' }}>+25% utilization</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>Manpower</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>85% allocated</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>100% allocated</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd', color: '#2ecc71' }}>+15% allocation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="optimization-notes" style={{
              backgroundColor: '#f9f9f9',
              padding: '15px',
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              <h4 style={{ marginTop: 0 }}>Optimization Notes:</h4>
              <ul style={{ 
                paddingLeft: '20px',
                margin: 0,
                textAlign: 'left'
              }}>
                <li style={{ textAlign: 'left', marginBottom: '5px' }}>Increase truck allocation to Region A by 4 units to handle the high yield</li>
                <li style={{ textAlign: 'left', marginBottom: '5px' }}>Add 2 trucks to Region C for early harvest transportation</li>
                <li style={{ textAlign: 'left', marginBottom: '5px' }}>Optimize railway schedule to increase capacity utilization by 25%</li>
                <li style={{ textAlign: 'left', marginBottom: '5px' }}>Shift 15% of manpower from processing to transportation during peak harvest</li>
                <li style={{ textAlign: 'left', marginBottom: '5px' }}>Maintain 10% reserve capacity for unexpected production increases</li>
              </ul>
            </div>
          </div>
          
          <div className="modal-footer" style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '20px',
            paddingTop: '15px',
            borderTop: '1px solid #ddd'
          }}>
            <button 
              onClick={() => setResourceModalVisible(false)}
              style={{
                padding: '10px 15px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                // Apply optimization logic
                alert('Resources have been optimized based on harvest predictions!');
                setResourceModalVisible(false);
              }}
              style={{
                padding: '10px 15px',
                backgroundColor: '#3a7e4f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Apply Optimization
            </button>
          </div>
        </div>
      </div>

      {/* Add this to your JSX, below the map */}
      <div style={{
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Yield Trend Legend:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: '#e74c3c', marginRight: '5px' }}></div>
            <span>Strong decline (&lt;-4%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: '#e67e22', marginRight: '5px' }}></div>
            <span>Moderate decline (-2% to -4%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: '#f1c40f', marginRight: '5px' }}></div>
            <span>Slight decline (0% to -2%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: '#f9e79f', marginRight: '5px' }}></div>
            <span>Neutral to slight increase (0% to 2%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: '#2ecc71', marginRight: '5px' }}></div>
            <span>Moderate increase (2% to 4%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: '#27ae60', marginRight: '5px' }}></div>
            <span>Strong increase (&gt;4%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SugarMillDashboard; 