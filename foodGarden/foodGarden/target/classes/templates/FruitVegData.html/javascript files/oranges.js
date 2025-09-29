const ORANGE_GROWING_DATA = {
    standard: {
        initialSpacing: 4,
        finalSpacing: 8,
        waterNeeds: {
            year1: 80,  // liters per tree per week
            year2: 120,
            year3: 160
        },
        seasonalAdjustment: {
            summer: 1.3,  // 30% more water in summer
            winter: 0.7   // 30% less water in winter
        },
        fertilizerNeeds: {
            year1: {
                amount: "500g per tree",
                frequency: "Split into 4 applications"
            },
            year2: {
                amount: "1kg per tree",
                frequency: "Split into 4 applications"
            },
            year3: {
                amount: "2kg per tree",
                frequency: "Split into 4 applications"
            }
        },
        yieldExpectation: {
            year3: 20,  // kg per tree
            year4: 40,
            mature: 100
        },
        spacingNote: "Trees need to be thinned to 8m spacing by year 5",
        careNotes: "Protect from frost, maintain good airflow"
    },
    intensive: {
        initialSpacing: 3,
        finalSpacing: 6,
        waterNeeds: {
            year1: 60,
            year2: 100,
            year3: 140
        },
        seasonalAdjustment: {
            summer: 1.4,
            winter: 0.6
        },
        fertilizerNeeds: {
            year1: {
                amount: "400g per tree",
                frequency: "Monthly applications"
            },
            year2: {
                amount: "800g per tree",
                frequency: "Monthly applications"
            },
            year3: {
                amount: "1.5kg per tree",
                frequency: "Monthly applications"
            }
        },
        yieldExpectation: {
            year3: 15,
            year4: 30,
            mature: 75
        },
        spacingNote: "Trees need to be thinned to 6m spacing by year 4",
        careNotes: "Regular pruning required for density management"
    },
    container: {
        spacing: 2,
        waterNeeds: {
            year1: 40,
            year2: 60,
            year3: 80
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerNeeds: {
            year1: {
                amount: "300g per tree",
                frequency: "Every 6 weeks"
            },
            year2: {
                amount: "500g per tree",
                frequency: "Every 6 weeks"
            },
            year3: {
                amount: "800g per tree",
                frequency: "Every 6 weeks"
            }
        },
        yieldExpectation: {
            year3: 10,
            year4: 20,
            mature: 40
        },
        spacingNote: "Suitable for long-term container growing with pruning",
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

    const growingData = ORANGE_GROWING_DATA[method];
    const spacing = method === 'container' ? growingData.spacing : growingData.initialSpacing;
    
    const treesPerRow = Math.floor(width / spacing);
    const rows = Math.floor(length / spacing);
    const totalTrees = treesPerRow * rows;
    const area = width * length;
    
    displayGardenPlan(totalTrees, rows, treesPerRow, area, growingData);
}

function validateDimensions(width, length) {
    return typeof width === 'number' && 
           typeof length === 'number' && 
           !isNaN(width) && 
           !isNaN(length) && 
           width > 0 && 
           length > 0;
}

function displayGardenPlan(totalTrees, rows, treesPerRow, area, data) {
    const resultsDiv = document.getElementById('gardenResults');
    resultsDiv.innerHTML = `
        <h3>Your Orange Orchard Plan</h3>
        <p><strong>Initial Layout:</strong> ${rows} rows with ${treesPerRow} trees each (${totalTrees} total trees)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>Year 1: ${(totalTrees * data.waterNeeds.year1).toFixed(1)} liters</p>
        <p>Year 2: ${(totalTrees * data.waterNeeds.year2).toFixed(1)} liters</p>
        <p>Year 3: ${(totalTrees * data.waterNeeds.year3).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Schedule:</h4>
        <p>Year 1: ${data.fertilizerNeeds.year1.amount} - ${data.fertilizerNeeds.year1.frequency}</p>
        <p>Year 2: ${data.fertilizerNeeds.year2.amount} - ${data.fertilizerNeeds.year2.frequency}</p>
        <p>Year 3: ${data.fertilizerNeeds.year3.amount} - ${data.fertilizerNeeds.year3.frequency}</p>
        
        <h4>Expected Yields:</h4>
        <p>Year 3: ${(totalTrees * data.yieldExpectation.year3).toFixed(1)} kg</p>
        <p>Year 4: ${(totalTrees * data.yieldExpectation.year4).toFixed(1)} kg</p>
        <p>Mature: ${(totalTrees * data.yieldExpectation.mature).toFixed(1)} kg</p>
        
        <p><strong>Important Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Adjust watering based on rainfall and temperature. Best suited for frost-free areas in South Africa.</em></p>
    `;
}