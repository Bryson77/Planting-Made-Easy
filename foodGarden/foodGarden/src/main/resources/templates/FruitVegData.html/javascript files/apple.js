const APPLE_GROWING_DATA = {
    standard: {
        initialSpacing: 2.5,
        finalSpacing: 7.6,
        waterPerTree: 15, // liters per week for year 1
        waterYear2: 25,   // liters per week for year 2
        waterYear3: 35,   // liters per week for year 3
        fertilizerPerKg: 0.5,
        yieldPerTree: 40, // kg per year for young trees
        spacingNote: "Trees will need to be thinned to 7.6m spacing after 3 years",
        wateringNote: "Water needs increase yearly: Year 1: 15L/week, Year 2: 25L/week, Year 3: 35L/week"
    },
    intensive: {
        initialSpacing: 1.8,
        finalSpacing: 3.5,
        waterPerTree: 12, // liters per week for year 1
        waterYear2: 20,   // liters per week for year 2
        waterYear3: 30,   // liters per week for year 3
        fertilizerPerKg: 0.4,
        yieldPerTree: 25,
        spacingNote: "Trees will need to be thinned to 3.5m spacing after 3 years",
        wateringNote: "Water needs increase yearly: Year 1: 12L/week, Year 2: 20L/week, Year 3: 30L/week"
    },
    container: {
        spacing: 1.2,
        waterPerTree: 10, // liters per week for year 1
        waterYear2: 15,   // liters per week for year 2
        waterYear3: 20,   // liters per week for year 3
        fertilizerPerKg: 0.3,
        yieldPerTree: 15,
        spacingNote: "Suitable for long-term container growing with proper pruning",
        wateringNote: "Water needs increase yearly: Year 1: 10L/week, Year 2: 15L/week, Year 3: 20L/week"
    }
};

// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Changed from calculateBtn to planGarden to match HTML
    const planButton = document.getElementById('planGarden');
    planButton.addEventListener('click', calculateGardenPlan);
});

function calculateGardenPlan() {
    // Get input values using correct IDs from HTML
    const width = parseFloat(document.getElementById('gardenWidth').value);
    const length = parseFloat(document.getElementById('gardenLength').value);
    const method = document.getElementById('growingMethod').value;

    if (!validateDimensions(width, length)) {
        alert('Please enter valid garden dimensions (positive numbers)');
        return;
    }

    const growingData = APPLE_GROWING_DATA[method];
    
    const treesPerRow = Math.floor(width / growingData.initialSpacing);
    const rows = Math.floor(length / growingData.initialSpacing);
    const totalTrees = treesPerRow * rows;
    
    const weeklyWater = totalTrees * growingData.waterPerTree;
    const annualYield = totalTrees * growingData.yieldPerTree;
    const futureArea = totalTrees * growingData.finalSpacing * growingData.finalSpacing;

    displayGardenPlan({
        treesPerRow,
        rows,
        totalTrees,
        weeklyWater,
        annualYield,
        futureArea,
        ...growingData
    });
}

function validateDimensions(width, length) {
    return typeof width === 'number' && 
           typeof length === 'number' && 
           !isNaN(width) && 
           !isNaN(length) && 
           width > 0 && 
           length > 0;
}

function displayGardenPlan(plan) {
    const resultsDiv = document.getElementById('gardenResults');
    resultsDiv.innerHTML = `
        <h3>Your Apple Garden Plan</h3>
        <p><strong>Layout:</strong> ${plan.rows} rows with ${plan.treesPerRow} trees each (${plan.totalTrees} total trees)</p>
        <p><strong>Initial Area Needed:</strong> ${(plan.treesPerRow * plan.rows * plan.initialSpacing * plan.initialSpacing).toFixed(2)} m²</p>
        <p><strong>Future Area Needed:</strong> ${plan.futureArea.toFixed(2)} m²</p>
        <p><strong>Water Needs (per week):</strong></p>
        <ul>
            <li>Year 1: ${(plan.totalTrees * plan.waterPerTree).toFixed(1)} liters</li>
            <li>Year 2: ${(plan.totalTrees * plan.waterYear2).toFixed(1)} liters</li>
            <li>Year 3: ${(plan.totalTrees * plan.waterYear3).toFixed(1)} liters</li>
        </ul>
        <p><strong>Watering Note:</strong> ${plan.wateringNote}</p>
        <p><strong>Important Spacing Note:</strong> ${plan.spacingNote}</p>
        <p><em>Note: Adjust watering based on rainfall, season, and soil conditions. Young trees need consistent moisture but not waterlogging.</em></p>
    `;
}