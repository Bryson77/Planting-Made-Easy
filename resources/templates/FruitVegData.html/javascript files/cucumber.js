const CUCUMBER_GROWING_DATA = {
    standard: {
        spacing: 0.5, // 50cm spacing
        waterNeeds: {
            week1_4: 2.5,  // liters per plant per week
            week5_8: 4.0,
            week9_12: 5.0
        },
        seasonalAdjustment: {
            summer: 1.3,  // 30% more water in summer
            winter: 0.7   // 30% less water in winter
        },
        fertilizerType: "Balanced NPK (5:5:5)",
        fertilizerSchedule: {
            planting: "100g per meter of complete fertilizer",
            growing: "Side dress with 50g per plant every 2 weeks"
        },
        yieldExpectation: {
            perPlant: 3.5, // kg per plant
            harvestPeriod: "6-8 weeks"
        },
        spacingNote: "50cm spacing allows good air circulation for trellised plants",
        careNotes: "Requires vertical support, regular pruning of side shoots"
    },
    intensive: {
        spacing: 0.3,
        waterNeeds: {
            week1_4: 2.0,
            week5_8: 3.5,
            week9_12: 4.5
        },
        seasonalAdjustment: {
            summer: 1.4,
            winter: 0.6
        },
        fertilizerType: "Higher nitrogen (8:5:5)",
        fertilizerSchedule: {
            planting: "150g per meter",
            growing: "Weekly liquid feeding"
        },
        yieldExpectation: {
            perPlant: 2.5,
            harvestPeriod: "5-7 weeks"
        },
        spacingNote: "30cm spacing requires careful disease monitoring",
        careNotes: "Need excellent ventilation and regular pruning"
    },
    container: {
        spacing: 0.2,
        waterNeeds: {
            week1_4: 1.5,
            week5_8: 2.5,
            week9_12: 3.5
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "Slow-release vegetable fertilizer",
        fertilizerSchedule: {
            planting: "50g per container",
            growing: "Liquid feed every 5 days"
        },
        yieldExpectation: {
            perPlant: 1.5,
            harvestPeriod: "4-6 weeks"
        },
        spacingNote: "20cm spacing suitable for dwarf varieties",
        careNotes: "Daily monitoring of soil moisture essential"
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

    const growingData = CUCUMBER_GROWING_DATA[method];
    
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
        <h3>Your Cucumber Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>Weeks 1-4: ${(totalPlants * data.waterNeeds.week1_4).toFixed(1)} liters</p>
        <p>Weeks 5-8: ${(totalPlants * data.waterNeeds.week5_8).toFixed(1)} liters</p>
        <p>Weeks 9-12: ${(totalPlants * data.waterNeeds.week9_12).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Plan:</h4>
        <p>At planting: ${data.fertilizerSchedule.planting}</p>
        <p>Maintenance: ${data.fertilizerSchedule.growing}</p>
        
        <h4>Expected Harvest:</h4>
        <p>Total yield: ${(totalPlants * data.yieldExpectation.perPlant).toFixed(1)} kg</p>
        <p>Harvest period: ${data.yieldExpectation.harvestPeriod}</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Adjust watering based on rainfall and temperature. Best planted in warm seasons in South Africa.</em></p>
    `;
}