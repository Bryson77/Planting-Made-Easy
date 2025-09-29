const CARROT_GROWING_DATA = {
    standard: {
        rowSpacing: 0.3, // 30cm between rows
        plantSpacing: 0.15, // 15cm between plants
        waterNeeds: {
            seedling: 0.5,  // liters per square meter per day
            growing: 1.0,
            mature: 1.5
        },
        seasonalAdjustment: {
            summer: 1.3,  // 30% more water in summer
            winter: 0.7   // 30% less water in winter
        },
        fertilizerType: "Balanced NPK (5:10:10)",
        fertilizerSchedule: {
            prePlanting: "100g per m² of complete fertilizer",
            growing: "Side dress with 50g per m² every 3 weeks"
        },
        yieldExpectation: {
            perMeter: 3.5 // kg per square meter
        },
        spacingNote: "15cm spacing gives full-sized carrots",
        careNotes: "Thin seedlings to prevent overcrowding"
    },
    intensive: {
        rowSpacing: 0.2,
        plantSpacing: 0.1,
        waterNeeds: {
            seedling: 0.6,
            growing: 1.2,
            mature: 1.8
        },
        seasonalAdjustment: {
            summer: 1.4,
            winter: 0.6
        },
        fertilizerType: "Higher phosphorus (3:15:8)",
        fertilizerSchedule: {
            prePlanting: "150g per m² of complete fertilizer",
            growing: "Liquid feed every 2 weeks"
        },
        yieldExpectation: {
            perMeter: 4.5
        },
        spacingNote: "10cm spacing produces medium-sized carrots",
        careNotes: "Regular thinning essential for good development"
    },
    container: {
        rowSpacing: 0.15,
        plantSpacing: 0.07,
        waterNeeds: {
            seedling: 0.8,
            growing: 1.5,
            mature: 2.0
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "Slow-release vegetable fertilizer",
        fertilizerSchedule: {
            prePlanting: "Mix 70g per container",
            growing: "Liquid feed weekly"
        },
        yieldExpectation: {
            perMeter: 5.0
        },
        spacingNote: "7cm spacing suitable for baby carrots",
        careNotes: "Monitor moisture daily in containers"
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

    const growingData = CARROT_GROWING_DATA[method];
    
    const rows = Math.floor(width / growingData.rowSpacing);
    const plantsPerRow = Math.floor(length / growingData.plantSpacing);
    const totalPlants = rows * plantsPerRow;
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
        <h3>Your Carrot Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per day):</h4>
        <p>Seedling stage: ${(area * data.waterNeeds.seedling).toFixed(1)} liters</p>
        <p>Growing stage: ${(area * data.waterNeeds.growing).toFixed(1)} liters</p>
        <p>Mature stage: ${(area * data.waterNeeds.mature).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Plan:</h4>
        <p>Initial: ${data.fertilizerSchedule.prePlanting}</p>
        <p>Maintenance: ${data.fertilizerSchedule.growing}</p>
        
        <h4>Expected Yield:</h4>
        <p>${(area * data.yieldExpectation.perMeter).toFixed(1)} kg total harvest</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Adjust water based on rainfall and temperature. Monitor soil moisture regularly.</em></p>
    `;
}