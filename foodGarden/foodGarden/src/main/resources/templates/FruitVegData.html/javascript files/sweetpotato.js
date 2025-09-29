const SWEETPOTATO_GROWING_DATA = {
    standard: {
        rowSpacing: 1.0,  // 100cm between rows
        plantSpacing: 0.3, // 30cm between plants
        waterNeeds: {
            establishment: 20,    // liters per m² per week
            vegetative: 30,
            tuberFormation: 40
        },
        seasonalAdjustment: {
            summer: 1.3,  // 30% more water in summer
            winter: 0.7   // 30% less water in winter
        },
        fertilizerType: "NPK 2:3:4",
        fertilizerSchedule: {
            planting: "200g per m² complete fertilizer",
            growing: "Side dress with 100g per m² after 6 weeks"
        },
        yieldExpectation: {
            perSquareMeter: 3.5, // kg per m²
            harvestPeriod: "120-150 days"
        },
        spacingNote: "100cm row spacing for maximum tuber development",
        careNotes: "Make ridges 30cm high, mulch heavily"
    },
    intensive: {
        rowSpacing: 0.75,
        plantSpacing: 0.25,
        waterNeeds: {
            establishment: 25,
            vegetative: 35,
            tuberFormation: 45
        },
        seasonalAdjustment: {
            summer: 1.4,
            winter: 0.6
        },
        fertilizerType: "NPK 3:2:4",
        fertilizerSchedule: {
            planting: "250g per m²",
            growing: "Monthly liquid feeding"
        },
        yieldExpectation: {
            perSquareMeter: 4.0,
            harvestPeriod: "110-140 days"
        },
        spacingNote: "75cm spacing requires careful vine management",
        careNotes: "Regular pruning of vines needed"
    },
    container: {
        rowSpacing: 0.6,
        plantSpacing: 0.2,
        waterNeeds: {
            establishment: 30,
            vegetative: 40,
            tuberFormation: 50
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "Slow-release vegetable fertilizer",
        fertilizerSchedule: {
            planting: "150g per container",
            growing: "Liquid feed every 2 weeks"
        },
        yieldExpectation: {
            perSquareMeter: 2.5,
            harvestPeriod: "100-130 days"
        },
        spacingNote: "60cm spacing suitable for container growing",
        careNotes: "Use minimum 50L containers, monitor moisture daily"
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

    const growingData = SWEETPOTATO_GROWING_DATA[method];
    
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
        <h3>Your Sweet Potato Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>Establishment (Weeks 1-4): ${(area * data.waterNeeds.establishment).toFixed(1)} liters</p>
        <p>Vegetative Growth (Weeks 5-12): ${(area * data.waterNeeds.vegetative).toFixed(1)} liters</p>
        <p>Tuber Formation (Weeks 13-20): ${(area * data.waterNeeds.tuberFormation).toFixed(1)} liters</p>
        
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
        
        <p><em>Note: Plant in January-March in South Africa. Ensure soil temperature is above 20°C.</em></p>
    `;
}