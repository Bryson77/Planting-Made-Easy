const MAIZE_GROWING_DATA = {
    standard: {
        rowSpacing: 0.75, // 75cm between rows
        plantSpacing: 0.25, // 25cm between plants
        waterNeeds: {
            establishment: 25,    // liters per m² per week
            vegetative: 35,
            flowering: 45,
            grainfill: 40
        },
        seasonalAdjustment: {
            summer: 1.3,  // 30% more water in summer
            winter: 0.7   // 30% less water in winter
        },
        fertilizerType: "NPK 3:2:1",
        fertilizerSchedule: {
            planting: "200kg/ha basal application",
            growing: "Top dress with LAN at 6 weeks"
        },
        yieldExpectation: {
            perPlant: 0.6, // kg per plant
            harvestPeriod: "120-140 days"
        },
        spacingNote: "75cm row spacing optimal for mechanized farming",
        careNotes: "Monitor for stalk borer and fall armyworm"
    },
    intensive: {
        rowSpacing: 0.6,
        plantSpacing: 0.2,
        waterNeeds: {
            establishment: 30,
            vegetative: 40,
            flowering: 50,
            grainfill: 45
        },
        seasonalAdjustment: {
            summer: 1.4,
            winter: 0.6
        },
        fertilizerType: "NPK 2:3:2",
        fertilizerSchedule: {
            planting: "250kg/ha basal application",
            growing: "Split nitrogen application"
        },
        yieldExpectation: {
            perPlant: 0.5,
            harvestPeriod: "110-130 days"
        },
        spacingNote: "60cm spacing requires careful weed management",
        careNotes: "Higher density requires more frequent pest monitoring"
    },
    container: {
        rowSpacing: 0.45,
        plantSpacing: 0.15,
        waterNeeds: {
            establishment: 35,
            vegetative: 45,
            flowering: 55,
            grainfill: 50
        },
        seasonalAdjustment: {
            summer: 1.5,
            winter: 0.5
        },
        fertilizerType: "Balanced organic fertilizer",
        fertilizerSchedule: {
            planting: "Mix 100g per container",
            growing: "Liquid feed every 2 weeks"
        },
        yieldExpectation: {
            perPlant: 0.3,
            harvestPeriod: "100-120 days"
        },
        spacingNote: "45cm spacing suitable for container growing",
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

    const growingData = MAIZE_GROWING_DATA[method];
    
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
        <h3>Your Maize Garden Plan</h3>
        <p><strong>Layout:</strong> ${rows} rows with ${plantsPerRow} plants each (${totalPlants} total plants)</p>
        <p><strong>Growing Area:</strong> ${area.toFixed(2)} m²</p>
        
        <h4>Water Requirements (per week):</h4>
        <p>Establishment (Weeks 1-3): ${(area * data.waterNeeds.establishment).toFixed(1)} liters</p>
        <p>Vegetative Growth (Weeks 4-7): ${(area * data.waterNeeds.vegetative).toFixed(1)} liters</p>
        <p>Flowering (Weeks 8-11): ${(area * data.waterNeeds.flowering).toFixed(1)} liters</p>
        <p>Grain Fill (Weeks 12-16): ${(area * data.waterNeeds.grainfill).toFixed(1)} liters</p>
        
        <p><strong>Seasonal Adjustments:</strong></p>
        <p>Summer: Increase water by ${((data.seasonalAdjustment.summer - 1) * 100).toFixed(0)}%</p>
        <p>Winter: Decrease water by ${((1 - data.seasonalAdjustment.winter) * 100).toFixed(0)}%</p>
        
        <h4>Fertilizer Plan:</h4>
        <p>Initial: ${data.fertilizerSchedule.planting}</p>
        <p>Maintenance: ${data.fertilizerSchedule.growing}</p>
        
        <h4>Expected Harvest:</h4>
        <p>Total yield: ${(totalPlants * data.yieldExpectation.perPlant).toFixed(1)} kg</p>
        <p>Time to harvest: ${data.yieldExpectation.harvestPeriod}</p>
        
        <p><strong>Growing Notes:</strong></p>
        <p>${data.spacingNote}</p>
        <p>${data.careNotes}</p>
        
        <p><em>Note: Plant at the start of the rainy season. Adjust irrigation based on rainfall and temperature.</em></p>
    `;
}