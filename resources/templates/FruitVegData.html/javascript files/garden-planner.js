const APPLE_GROWING_DATA = {
    standard: {
        spacing: 7.6,
        waterPerTree: 38,
        waterFrequency: "Every 3-4 days in summer, weekly in winter",
        fertilizerType: "Balanced NPK (6:6:6)",
        fertilizerSchedule: "Early spring and mid-summer",
        yieldPerTree: 175 // kg per year when mature
    },
    intensive: {
        spacing: 3.5,
        waterPerTree: 28,
        waterFrequency: "Every 2-3 days in summer, twice weekly in winter",
        fertilizerType: "High nitrogen in spring, balanced in summer",
        fertilizerSchedule: "Monthly during growing season",
        yieldPerTree: 75 // kg per year when mature
    },
    container: {
        spacing: 1.8,
        waterPerTree: 18,
        waterFrequency: "Daily in summer, every 2-3 days in winter",
        fertilizerType: "Slow-release fruit tree fertilizer",
        fertilizerSchedule: "Every 6-8 weeks during growing season",
        yieldPerTree: 25 // kg per year when mature
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const planButton = document.getElementById('planGarden');
    planButton.addEventListener('click', calculateGardenPlan);
});

function calculateGardenPlan() {
    // Get input values
    const width = parseFloat(document.getElementById('gardenWidth').value);
    const length = parseFloat(document.getElementById('gardenLength').value);
    const method = document.getElementById('growingMethod').value;

    // Validate inputs
    if (!validateDimensions(width, length)) {
        alert('Please enter valid garden dimensions (positive numbers)');
        return;
    }

    const growingData = APPLE_GROWING_DATA[method];
    
    // Calculate number of trees that can fit
    const treesPerRow = Math.floor(width / growingData.spacing);
    const rows = Math.floor(length / growingData.spacing);
    const totalTrees = treesPerRow * rows;
    
    // Calculate resources needed
    const weeklyWater = totalTrees * growingData.waterPerTree;
    const annualYield = totalTrees * growingData.yieldPerTree;

    displayGardenPlan({
        treesPerRow,
        rows,
        totalTrees,
        weeklyWater,
        annualYield,
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
        <p><strong>Water Needs:</strong> ${plan.weeklyWater.toFixed(1)} liters per week total</p>
        <p><strong>Watering Schedule:</strong> ${plan.waterFrequency}</p>
        <p><strong>Recommended Fertilizer:</strong> ${plan.fertilizerType}</p>
        <p><strong>Fertilizing Schedule:</strong> ${plan.fertilizerSchedule}</p>
        <p><strong>Estimated Annual Yield:</strong> ${plan.annualYield.toFixed(1)} kg when trees mature</p>
        <p><em>Note: These calculations are based on typical apple tree requirements in South African conditions. Adjust based on your specific climate and soil conditions.</em></p>
    `;
}