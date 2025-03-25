document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const currentDate = new Date();
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Initialize analytics chart
    const ctx = document.getElementById('analytics-chart').getContext('2d');
    const analyticsChart = new Chart(ctx, {
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
    
    // Filter button functionality
    document.querySelector('.filter-button').addEventListener('click', function() {
        const selectedFilter = document.getElementById('data-source-filter').value;
        console.log(`Filtering data by: ${selectedFilter}`);
        
        // In a real application, this would fetch and update the chart data
        // For demo purposes, we'll just show a different dataset based on selection
        if (selectedFilter === 'production') {
            updateChartData(analyticsChart, 
                [120, 132, 128, 142, 150, 160], 
                []);
        } else if (selectedFilter === 'quality') {
            updateChartData(analyticsChart, 
                [], 
                [88, 86, 90, 92, 94, 95]);
        } else if (selectedFilter === 'efficiency') {
            updateChartData(analyticsChart, 
                [], 
                [], 
                [75, 78, 82, 85, 88, 92], 
                'Efficiency Rate (%)', 
                'rgba(231, 76, 60, 0.2)', 
                'rgba(231, 76, 60, 1)');
        } else {
            // All data
            updateChartData(analyticsChart, 
                [120, 132, 128, 142, 150, 160], 
                [88, 86, 90, 92, 94, 95]);
        }
    });
    
    // Function to update chart data
    function updateChartData(chart, productionData, qualityData, newData, newLabel, newBgColor, newBorderColor) {
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
    }
    
    // Simulate shift calendar functionality
    const shiftCalendar = document.querySelector('.shift-calendar');
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
    
    // Add event listeners for action buttons
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', function() {
            alert(`Action: ${this.textContent} - This would trigger the corresponding functionality in a real application.`);
        });
    });
    
    // Simulate map placeholder
    const mapPlaceholder = document.querySelector('.map-placeholder');
    mapPlaceholder.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div style="width: 80%; height: 80%; background-color: #e6e6b8; border-radius: 4px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 10%; left: 20%; width: 25%; height: 30%; background-color: #2ecc71; border-radius: 4px; opacity: 0.7;"></div>
                <div style="position: absolute; top: 30%; left: 50%; width: 30%; height: 40%; background-color: #f39c12; border-radius: 4px; opacity: 0.7;"></div>
                <div style="position: absolute; top: 60%; left: 30%; width: 40%; height: 25%; background-color: #3498db; border-radius: 4px; opacity: 0.7;"></div>
                <div style="position: absolute; top: 20%; left: 10%; font-size: 10px; background-color: rgba(255,255,255,0.8); padding: 2px 5px; border-radius: 2px;">Field A: High Yield</div>
                <div style="position: absolute; top: 40%; left: 60%; font-size: 10px; background-color: rgba(255,255,255,0.8); padding: 2px 5px; border-radius: 2px;">Field B: Medium Yield</div>
                <div style="position: absolute; top: 70%; left: 40%; font-size: 10px; background-color: rgba(255,255,255,0.8); padding: 2px 5px; border-radius: 2px;">Field C: Low Yield</div>
            </div>
            <div style="margin-top: 10px; font-size: 12px; color: #666;">Click "Draw Custom Field" to add new areas</div>
        </div>
    `;
}); 