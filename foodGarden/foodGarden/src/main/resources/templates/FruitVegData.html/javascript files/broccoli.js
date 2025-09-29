const BROCCOLI_GROWING_DATA = {
    standard: {
        spacing: 0.6, // 60cm converted to meters
        waterNeeds: {
            year1: 2.5,  // liters per plant per week
            year2: 3.0,
            year3: 3.5
        },
        seasonalAdjustment: {
            summer: 1.3,  // 30% more water in summer
            winter: 0.7   // 30% less water in winter
        },
        fertilizerType: "Balanced NPK (5:5:5)",
        fertilizerSchedule: {
            initial: "100g per m² before planting",
            growing: "Side dress with 50g per plant every 4 weeks"
        },
        yieldExpectation: {
            mainHead: 0.4, // kg per plant
            sideShoot: 0.2 // kg per plant
        },
        spacingNote: "60cm spacing allows good air circulation and head development",
        careNotes: "Protect from heat in summer, monitor for caterpillars"
    },
    intensive: {
        spacing: 0.45,
        waterNeeds: {
            year1: 2.0,
            year2: 2.5,
            year3: 3.0
        },
        seasonalAdjustment: {
            summer: 1.4,
            winter: 0.6
        },
        fertilizerType: "Higher nitrogen (8:5:5)",
        fertilizerSchedule: {
            initial: "150g per m² before planting",
            growing: "Liquid feed every 2 weeks"
        },
        yieldExpectation: {
            mainHead: 0.3,
            sideShoot: 0.15
        },
        spacingNote: "45cm spacing requires careful pest monitoring",
        careNotes: "Regular feeding and pest checks essential"
    },
    container: {
        spacing: 0.3,
        waterNeeds: {
            year1: 1.5,
            year2: 2.0,
            year3: 2.5
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "Slow-release vegetable fertilizer",
        fertilizerSchedule: {
            initial: "Mix 100g per container",
            growing: "Top dress monthly"
        },
        yieldExpectation: {
            mainHead: 0.2,
            sideShoot: 0.1
        },
        spacingNote: "30cm spacing suitable for container growing",
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

    const growingData = BROCCOLI_GROWING_DATA[method];
    
    const plantsPerRow = Math.floor(width / growingData.spacing);
    const rows = Math.floor(length / growingData.spacing);
    const totalPlants = plantsPerRow * rows;
    
    displayGardenPlan(totalPlants, plantsPerRow, rows, growingData);
}

function validateDimensions(width, length) {
    return typeof width === 'number' && 
           typeof length === 'number' && 
           !isNaN(width) && 
           !isNaN(length) && 
           width > 0 && 
           length > 0;
}

function displayGardenPlan(totalPlants, plantsPerRow, rows, data) {
    const resultsDiv = document.getElementById('gardenResults');
    resultsDiv.innerHTML = `
        <h3>Your Broccoli Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>First planting: ${(totalPlants * data.waterNeeds.year1).toFixed(1)} liters</p>
        <p>Second planting: ${(totalPlants * data.waterNeeds.year2).toFixed(1)} liters</p>
        <p>Third planting: ${(totalPlants * data.waterNeeds.year3).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Schedule:</h4>
        <p>Initial: ${data.fertilizerSchedule.initial}</p>
        <p>Maintenance: ${data.fertilizerSchedule.growing}</p>
        
        <h4>Expected Yields:</h4>
        <p>Main heads: ${(totalPlants * data.yieldExpectation.mainHead).toFixed(1)} kg</p>
        <p>Side shoots: ${(totalPlants * data.yieldExpectation.sideShoot).toFixed(1)} kg</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Adjust water based on rainfall and temperature. Plant in succession for continuous harvest.</em></p>
    `;
}