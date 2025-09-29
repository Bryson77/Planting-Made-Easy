const LETTUCE_GROWING_DATA = {
    standard: {
        spacing: 0.25, // 25cm spacing
        waterNeeds: {
            week1_2: 0.5,  // liters per plant per week
            week3_4: 0.75,
            week5_6: 1.0
        },
        seasonalAdjustment: {
            summer: 1.4,  // 40% more water in summer
            winter: 0.6   // 40% less water in winter
        },
        fertilizerType: "Balanced NPK (5:5:5)",
        fertilizerSchedule: {
            planting: "50g per m² of complete fertilizer",
            growing: "Light feeding every 2 weeks"
        },
        yieldExpectation: {
            perPlant: 0.3, // kg per plant
            harvestPeriod: "45-60 days"
        },
        spacingNote: "25cm spacing for full-sized heads",
        careNotes: "Protect from afternoon sun in summer"
    },
    intensive: {
        spacing: 0.2,
        waterNeeds: {
            week1_2: 0.4,
            week3_4: 0.6,
            week5_6: 0.8
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "Lower nitrogen (3:5:5)",
        fertilizerSchedule: {
            planting: "75g per m²",
            growing: "Weekly liquid feeding"
        },
        yieldExpectation: {
            perPlant: 0.25,
            harvestPeriod: "40-55 days"
        },
        spacingNote: "20cm spacing for medium heads",
        careNotes: "Monitor closely for disease in dense plantings"
    },
    container: {
        spacing: 0.15,
        waterNeeds: {
            week1_2: 0.3,
            week3_4: 0.5,
            week5_6: 0.7
        },
        seasonalAdjustment: {
            summer: 1.6,
            winter: 0.4
        },
        fertilizerType: "Slow-release vegetable fertilizer",
        fertilizerSchedule: {
            planting: "40g per container",
            growing: "Liquid feed every 10 days"
        },
        yieldExpectation: {
            perPlant: 0.2,
            harvestPeriod: "35-50 days"
        },
        spacingNote: "15cm spacing for compact growth",
        careNotes: "Daily moisture monitoring essential"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const planButton = document.getElementById('planGarden');
    planButton.addEventListener('click', calculateGardenPlan);
});

function calculateGardenPlan() {
    const width = parseFloat(document.getElementById('gardenWidth').value);
    const length = parseFloat(document.getElementById('gardenLength').value);
    const method = document.getElementById('growingMethod').value;

    if (!validateDimensions(width, length)) {
        alert('Please enter valid garden dimensions (positive numbers)');
        return;
    }

    const growingData = LETTUCE_GROWING_DATA[method];
    
    const plantsPerRow = Math.floor(width / growingData.spacing);
    const rows = Math.floor(length / growingData.spacing);
    const totalPlants = plantsPerRow * rows;
    const area = width * length;
    
    displayGardenPlan(totalPlants, rows, plantsPerRow, area, growingData);
}

function validateDimensions(width, length) {
    return typeof width === 'number' && 
           typeof length === 'number' && 
           !isNaN(width) && 
           !isNaN(length) && 
           width > 0 && 
           length > 0;
}

function displayGardenPlan(totalPlants, rows, plantsPerRow, area, data) {
    const resultsDiv = document.getElementById('gardenResults');
    resultsDiv.innerHTML = `
        <h3>Your Lettuce Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>Weeks 1-2: ${(totalPlants * data.waterNeeds.week1_2).toFixed(1)} liters</p>
        <p>Weeks 3-4: ${(totalPlants * data.waterNeeds.week3_4).toFixed(1)} liters</p>
        <p>Weeks 5-6: ${(totalPlants * data.waterNeeds.week5_6).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Plan:</h4>
        <p>At planting: ${data.fertilizerSchedule.planting}</p>
        <p>Maintenance: ${data.fertilizerSchedule.growing}</p>
        
        <h4>Expected Harvest:</h4>
        <p>Total yield: ${(totalPlants * data.yieldExpectation.perPlant).toFixed(1)} kg</p>
        <p>Time to harvest: ${data.yieldExpectation.harvestPeriod}</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Adjust watering based on rainfall and temperature. Best planted in cooler seasons in South Africa.</em></p>
    `;
}