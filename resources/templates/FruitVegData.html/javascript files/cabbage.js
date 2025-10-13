const CABBAGE_GROWING_DATA = {
    standard: {
        spacing: 0.6, // 60cm spacing
        waterNeeds: {
            month1: 3.0,  // liters per plant per week
            month2: 4.0,
            month3: 5.0
        },
        seasonalAdjustment: {
            summer: 1.3,  // 30% more water in summer
            winter: 0.7   // 30% less water in winter
        },
        fertilizerType: "NPK 5:10:10",
        fertilizerSchedule: {
            planting: "100g per plant of complete fertilizer",
            growing: "Side dress with 50g per plant every 3 weeks"
        },
        yieldExpectation: {
            weightPerHead: 2.5, // kg per cabbage head
            harvestTime: "60-75 days"
        },
        spacingNote: "60cm spacing for large heads",
        careNotes: "Monitor for cabbage moths and aphids"
    },
    intensive: {
        spacing: 0.45,
        waterNeeds: {
            month1: 2.5,
            month2: 3.5,
            month3: 4.5
        },
        seasonalAdjustment: {
            summer: 1.4,
            winter: 0.6
        },
        fertilizerType: "NPK 6:8:8",
        fertilizerSchedule: {
            planting: "75g per plant of complete fertilizer",
            growing: "Liquid feed every 2 weeks"
        },
        yieldExpectation: {
            weightPerHead: 2.0,
            harvestTime: "55-70 days"
        },
        spacingNote: "45cm spacing for medium heads",
        careNotes: "Regular pest monitoring essential"
    },
    container: {
        spacing: 0.3,
        waterNeeds: {
            month1: 2.0,
            month2: 3.0,
            month3: 4.0
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "Slow-release vegetable fertilizer",
        fertilizerSchedule: {
            planting: "50g per container",
            growing: "Weekly liquid feeding"
        },
        yieldExpectation: {
            weightPerHead: 1.5,
            harvestTime: "50-65 days"
        },
        spacingNote: "30cm spacing for compact heads",
        careNotes: "Daily moisture monitoring required"
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

    const growingData = CABBAGE_GROWING_DATA[method];
    
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
        <h3>Your Cabbage Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>Month 1: ${(totalPlants * data.waterNeeds.month1).toFixed(1)} liters</p>
        <p>Month 2: ${(totalPlants * data.waterNeeds.month2).toFixed(1)} liters</p>
        <p>Month 3: ${(totalPlants * data.waterNeeds.month3).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Plan:</h4>
        <p>At planting: ${data.fertilizerSchedule.planting}</p>
        <p>Maintenance: ${data.fertilizerSchedule.growing}</p>
        
        <h4>Expected Harvest:</h4>
        <p>Total yield: ${(totalPlants * data.yieldExpectation.weightPerHead).toFixed(1)} kg</p>
        <p>Harvest time: ${data.yieldExpectation.harvestTime}</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Adjust watering based on rainfall and temperature. Best planted in cooler months in South Africa.</em></p>
    `;
}