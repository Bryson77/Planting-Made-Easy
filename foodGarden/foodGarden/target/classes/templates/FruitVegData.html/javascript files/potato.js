const POTATO_GROWING_DATA = {
    standard: {
        rowSpacing: 0.75,  // 75cm between rows
        plantSpacing: 0.30, // 30cm between plants
        waterNeeds: {
            establishment: 15,    // liters per m² per week
            vegetative: 25,
            tuberFormation: 35
        },
        seasonalAdjustment: {
            summer: 1.3,  // 30% more water in summer
            winter: 0.7   // 30% less water in winter
        },
        fertilizerType: "NPK 4:2:6",
        fertilizerSchedule: {
            planting: "200g per m² complete fertilizer",
            hilling: "Side dress with 100g per m² when hilling"
        },
        yieldExpectation: {
            perSquareMeter: 4.0, // kg per m²
            harvestPeriod: "90-120 days"
        },
        spacingNote: "75cm row spacing for maximum tuber development",
        careNotes: "Regular hilling required, monitor for late blight"
    },
    intensive: {
        rowSpacing: 0.60,
        plantSpacing: 0.25,
        waterNeeds: {
            establishment: 20,
            vegetative: 30,
            tuberFormation: 40
        },
        seasonalAdjustment: {
            summer: 1.4,
            winter: 0.6
        },
        fertilizerType: "NPK 5:2:8",
        fertilizerSchedule: {
            planting: "250g per m²",
            hilling: "Weekly liquid feeding during growth"
        },
        yieldExpectation: {
            perSquareMeter: 5.0,
            harvestPeriod: "85-110 days"
        },
        spacingNote: "60cm spacing requires careful disease management",
        careNotes: "Intensive monitoring for pests and diseases"
    },
    container: {
        rowSpacing: 0.45,
        plantSpacing: 0.20,
        waterNeeds: {
            establishment: 25,
            vegetative: 35,
            tuberFormation: 45
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "Slow-release potato fertilizer",
        fertilizerSchedule: {
            planting: "150g per container",
            growing: "Liquid feed every 2 weeks"
        },
        yieldExpectation: {
            perSquareMeter: 3.5,
            harvestPeriod: "80-100 days"
        },
        spacingNote: "45cm spacing suitable for container growing",
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

    const growingData = POTATO_GROWING_DATA[method];
    
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
        <h3>Your Potato Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>Establishment (Weeks 1-3): ${(area * data.waterNeeds.establishment).toFixed(1)} liters</p>
        <p>Vegetative Growth (Weeks 4-8): ${(area * data.waterNeeds.vegetative).toFixed(1)} liters</p>
        <p>Tuber Formation (Weeks 9-16): ${(area * data.waterNeeds.tuberFormation).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Plan:</h4>
        <p>At planting: ${data.fertilizerSchedule.planting}</p>
        <p>During growth: ${data.fertilizerSchedule.hilling}</p>
        
        <h4>Expected Harvest:</h4>
        <p>Total yield: ${(area * data.yieldExpectation.perSquareMeter).toFixed(1)} kg</p>
        <p>Time to harvest: ${data.yieldExpectation.harvestPeriod}</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Plant in cool season for best results. Adjust watering based on rainfall and temperature.</em></p>
    `;
}