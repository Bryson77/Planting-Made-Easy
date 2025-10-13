const SPINACH_GROWING_DATA = {
    standard: {
        rowSpacing: 0.3,  // 30cm between rows
        plantSpacing: 0.2, // 20cm between plants
        waterNeeds: {
            establishment: 2.0,    // liters per m² per day
            vegetative: 3.0,
            maturity: 4.0
        },
        seasonalAdjustment: {
            summer: 1.4,  // 40% more water in summer
            winter: 0.6   // 40% less water in winter
        },
        fertilizerType: "NPK 5:10:5",
        fertilizerSchedule: {
            planting: "100g per m² complete fertilizer",
            growing: "Side dress with 50g per m² every 3 weeks"
        },
        yieldExpectation: {
            perSquareMeter: 2.5, // kg per m²
            harvestPeriod: "45-60 days"
        },
        spacingNote: "30cm row spacing for full leaf development",
        careNotes: "Monitor for leaf miners and downy mildew"
    },
    intensive: {
        rowSpacing: 0.2,
        plantSpacing: 0.15,
        waterNeeds: {
            establishment: 2.5,
            vegetative: 3.5,
            maturity: 4.5
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "NPK 6:8:6",
        fertilizerSchedule: {
            planting: "150g per m²",
            growing: "Weekly liquid feeding"
        },
        yieldExpectation: {
            perSquareMeter: 3.0,
            harvestPeriod: "40-55 days"
        },
        spacingNote: "20cm spacing requires good air circulation",
        careNotes: "Regular monitoring for disease essential"
    },
    container: {
        rowSpacing: 0.15,
        plantSpacing: 0.1,
        waterNeeds: {
            establishment: 3.0,
            vegetative: 4.0,
            maturity: 5.0
        },
        seasonalAdjustment: {
            summer: 1.6,
            winter: 0.4
        },
        fertilizerType: "Balanced liquid fertilizer",
        fertilizerSchedule: {
            planting: "75g per container",
            growing: "Liquid feed every 10 days"
        },
        yieldExpectation: {
            perSquareMeter: 2.0,
            harvestPeriod: "35-50 days"
        },
        spacingNote: "15cm spacing suitable for container growing",
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

    const growingData = SPINACH_GROWING_DATA[method];
    
    const rowsCount = Math.floor(width / growingData.rowSpacing);
    const plantsPerRow = Math.floor(length / growingData.plantSpacing);
    const totalPlants = rowsCount * plantsPerRow;
    const area = width * length;
    
    displayGardenPlan(totalPlants, rowsCount, plantsPerRow, area, growingData);
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
        <h3>Your Spinach Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per day):</h4>
        <p>Establishment (Days 1-14): ${(area * data.waterNeeds.establishment).toFixed(1)} liters</p>
        <p>Vegetative Growth (Days 15-30): ${(area * data.waterNeeds.vegetative).toFixed(1)} liters</p>
        <p>Maturity (Days 31-45): ${(area * data.waterNeeds.maturity).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Plan:</h4>
        <p>At planting: ${data.fertilizerSchedule.planting}</p>
        <p>During growth: ${data.fertilizerSchedule.growing}</p>
        
        <h4>Expected Harvest:</h4>
        <p>Total yield: ${(area * data.yieldExpectation.perSquareMeter).toFixed(1)} kg</p>
        <p>Time to harvest: ${data.yieldExpectation.harvestPeriod}</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Best planted in cooler seasons in South Africa. Provide afternoon shade in summer.</em></p>
    `;
}