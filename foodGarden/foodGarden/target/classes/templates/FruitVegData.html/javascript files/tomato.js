const TOMATO_GROWING_DATA = {
    standard: {
        rowSpacing: 0.9,  // 90cm between rows
        plantSpacing: 0.6, // 60cm between plants
        waterNeeds: {
            establishment: 3.0,    // liters per plant per day
            vegetative: 4.0,
            fruiting: 5.0
        },
        seasonalAdjustment: {
            summer: 1.4,  // 40% more water in summer
            winter: 0.6   // 40% less water in winter
        },
        fertilizerType: "NPK 5:10:10",
        fertilizerSchedule: {
            planting: "100g per plant complete fertilizer",
            growing: "Side dress with 50g per plant every 4 weeks"
        },
        yieldExpectation: {
            perPlant: 5.0, // kg per plant
            harvestPeriod: "70-100 days"
        },
        spacingNote: "90cm spacing allows good airflow and disease prevention",
        careNotes: "Stake or cage plants, prune suckers regularly"
    },
    intensive: {
        rowSpacing: 0.6,
        plantSpacing: 0.45,
        waterNeeds: {
            establishment: 2.5,
            vegetative: 3.5,
            fruiting: 4.5
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "NPK 6:8:8",
        fertilizerSchedule: {
            planting: "150g per m²",
            growing: "Weekly liquid feeding"
        },
        yieldExpectation: {
            perPlant: 4.0,
            harvestPeriod: "65-90 days"
        },
        spacingNote: "60cm spacing requires good disease management",
        careNotes: "Regular pruning and strong support system needed"
    },
    container: {
        rowSpacing: 0.45,
        plantSpacing: 0.3,
        waterNeeds: {
            establishment: 2.0,
            vegetative: 3.0,
            fruiting: 4.0
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
            perPlant: 3.0,
            harvestPeriod: "60-85 days"
        },
        spacingNote: "45cm spacing suitable for determinate varieties",
        careNotes: "Use minimum 40L containers, monitor moisture daily"
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

    const growingData = TOMATO_GROWING_DATA[method];
    
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
        <h3>Your Tomato Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per day):</h4>
        <p>Establishment (Weeks 1-3): ${(totalPlants * data.waterNeeds.establishment).toFixed(1)} liters</p>
        <p>Vegetative Growth (Weeks 4-7): ${(totalPlants * data.waterNeeds.vegetative).toFixed(1)} liters</p>
        <p>Fruiting (Week 8+): ${(totalPlants * data.waterNeeds.fruiting).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Plan:</h4>
        <p>At planting: ${data.fertilizerSchedule.planting}</p>
        <p>During growth: ${data.fertilizerSchedule.growing}</p>
        
        <h4>Expected Harvest:</h4>
        <p>Total yield: ${(totalPlants * data.yieldExpectation.perPlant).toFixed(1)} kg</p>
        <p>Time to harvest: ${data.yieldExpectation.harvestPeriod}</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Best planted spring to early summer in South Africa. Protect from afternoon sun in hot regions.</em></p>
    `;
}