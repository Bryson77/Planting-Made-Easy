const AVOCADO_GROWING_DATA = {
    standard: {
        initialSpacing: 3,
        finalSpacing: 10,
        waterNeeds: {
            year1: 40,  // liters per week
            year2: 80,
            year3: 120
        },
        seasonalAdjustment: {
            summer: 1.3,  // 30% more water in summer
            winter: 0.7   // 30% less water in winter
        },
        fertilizerType: "Balanced NPK (6:6:6) with added zinc and boron",
        fertilizerSchedule: {
            year1: "Quarterly applications of 0.5kg",
            year2: "Quarterly applications of 1kg",
            year3: "Quarterly applications of 1.5kg"
        },
        yieldExpectation: {
            year2: 5,  // kg per tree
            year3: 15,
            mature: 40
        },
        spacingNote: "Trees will need to be thinned to 10m spacing after 3 years",
        careNotes: "Protect from frost in winter, mulch well in summer"
    },
    intensive: {
        initialSpacing: 2,
        finalSpacing: 6,
        waterNeeds: {
            year1: 35,
            year2: 70,
            year3: 100
        },
        seasonalAdjustment: {
            summer: 1.3,
            winter: 0.7
        },
        fertilizerType: "Higher nitrogen in spring, balanced in summer",
        fertilizerSchedule: {
            year1: "Monthly applications of 0.3kg",
            year2: "Monthly applications of 0.6kg",
            year3: "Monthly applications of 0.9kg"
        },
        yieldExpectation: {
            year2: 3,
            year3: 10,
            mature: 25
        },
        spacingNote: "Trees will need to be thinned to 6m spacing after 3 years",
        careNotes: "Regular pruning required for density management"
    },
    container: {
        spacing: 1.5,
        waterNeeds: {
            year1: 25,
            year2: 45,
            year3: 65
        },
        seasonalAdjustment: {
            summer: 1.4,  // 40% more water in containers during summer
            winter: 0.6
        },
        fertilizerType: "Slow-release avocado fertilizer",
        fertilizerSchedule: {
            year1: "Every 8 weeks, 200g per tree",
            year2: "Every 8 weeks, 400g per tree",
            year3: "Every 8 weeks, 600g per tree"
        },
        yieldExpectation: {
            year2: 2,
            year3: 8,
            mature: 15
        },
        spacingNote: "Suitable for long-term container growing with proper pruning",
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

    const growingData = AVOCADO_GROWING_DATA[method];
    const spacing = method === 'container' ? growingData.spacing : growingData.initialSpacing;
    
    const treesPerRow = Math.floor(width / spacing);
    const rows = Math.floor(length / spacing);
    const totalTrees = treesPerRow * rows;
    
    displayGardenPlan(totalTrees, treesPerRow, rows, growingData);
}

function validateDimensions(width, length) {
    return typeof width === 'number' && 
           typeof length === 'number' && 
           !isNaN(width) && 
           !isNaN(length) && 
           width > 0 && 
           length > 0;
}

function displayGardenPlan(totalTrees, treesPerRow, rows, data) {
    const resultsDiv = document.getElementById('gardenResults');
    resultsDiv.innerHTML = `
        <h3>Your Avocado Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${treesPerRow} trees each (${totalTrees} total trees)</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>Year 1: ${(totalTrees * data.waterNeeds.year1).toFixed(1)} liters</p>
        <p>Year 2: ${(totalTrees * data.waterNeeds.year2).toFixed(1)} liters</p>
        <p>Year 3: ${(totalTrees * data.waterNeeds.year3).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Schedule:</h4>
        <p>Year 1: ${data.fertilizerSchedule.year1}</p>
        <p>Year 2: ${data.fertilizerSchedule.year2}</p>
        <p>Year 3: ${data.fertilizerSchedule.year3}</p>
        
        <h4>Expected Yields:</h4>
        <p>Year 2: ${(totalTrees * data.yieldExpectation.year2).toFixed(1)} kg</p>
        <p>Year 3: ${(totalTrees * data.yieldExpectation.year3).toFixed(1)} kg</p>
        <p>Mature: ${(totalTrees * data.yieldExpectation.mature).toFixed(1)} kg</p>
        
        <p><strong>Important Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Adjust water based on rainfall and season. Monitor soil moisture regularly.</em></p>
    `;
}