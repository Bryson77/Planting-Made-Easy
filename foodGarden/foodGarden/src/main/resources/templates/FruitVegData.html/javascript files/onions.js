const ONION_GROWING_DATA = {
    standard: {
        rowSpacing: 0.3,  // 30cm between rows
        plantSpacing: 0.1, // 10cm between plants
        waterNeeds: {
            month1_2: 2.0,  // liters per m² per week
            month3_4: 3.0,
            month5_6: 4.0
        },
        seasonalAdjustment: {
            summer: 1.4,  // 40% more water in summer
            winter: 0.6   // 40% less water in winter
        },
        fertilizerType: "NPK 5:10:10",
        fertilizerSchedule: {
            planting: "100g per m² complete fertilizer",
            growing: "Side dress with 50g per m² every 4 weeks"
        },
        yieldExpectation: {
            perSquareMeter: 4.0, // kg per m²
            harvestPeriod: "90-100 days"
        },
        spacingNote: "30cm row spacing for maximum bulb size",
        careNotes: "Monitor for thrips and downy mildew"
    },
    intensive: {
        rowSpacing: 0.2,
        plantSpacing: 0.08,
        waterNeeds: {
            month1_2: 2.5,
            month3_4: 3.5,
            month5_6: 4.5
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "NPK 6:8:8",
        fertilizerSchedule: {
            planting: "150g per m²",
            growing: "Liquid feed every 3 weeks"
        },
        yieldExpectation: {
            perSquareMeter: 5.0,
            harvestPeriod: "85-95 days"
        },
        spacingNote: "20cm spacing requires good disease management",
        careNotes: "Regular monitoring for pest and disease essential"
    },
    container: {
        rowSpacing: 0.15,
        plantSpacing: 0.05,
        waterNeeds: {
            month1_2: 3.0,
            month3_4: 4.0,
            month5_6: 5.0
        },
        seasonalAdjustment: {
            summer: 1.6,
            winter: 0.4
        },
        fertilizerType: "Slow-release vegetable fertilizer",
        fertilizerSchedule: {
            planting: "75g per container",
            growing: "Weekly liquid feeding"
        },
        yieldExpectation: {
            perSquareMeter: 3.5,
            harvestPeriod: "80-90 days"
        },
        spacingNote: "15cm spacing suitable for spring onions",
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

    const growingData = ONION_GROWING_DATA[method];
    
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
        <h3>Your Onion Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>Months 1-2: ${(area * data.waterNeeds.month1_2).toFixed(1)} liters</p>
        <p>Months 3-4: ${(area * data.waterNeeds.month3_4).toFixed(1)} liters</p>
        <p>Months 5-6: ${(area * data.waterNeeds.month5_6).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Plan:</h4>
        <p>At planting: ${data.fertilizerSchedule.planting}</p>
        <p>Maintenance: ${data.fertilizerSchedule.growing}</p>
        
        <h4>Expected Harvest:</h4>
        <p>Total yield: ${(area * data.yieldExpectation.perSquareMeter).toFixed(1)} kg</p>
        <p>Time to harvest: ${data.yieldExpectation.harvestPeriod}</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Best planted in autumn/winter in South Africa. Adjust watering based on rainfall and temperature.</em></p>
    `;
}
