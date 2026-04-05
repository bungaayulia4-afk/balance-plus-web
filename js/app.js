// Global State
let userHealth = {
    sleep: 6,
    screenTime: 'medium',
    meals: 'mixed',
    activity: 'medium',
    water: 5,
    status: 'unstable',
    insights: [],
    risks: {}
};

// Screen Navigation
function goToScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

// Slider Value Updates
document.addEventListener('DOMContentLoaded', function() {
    const sleepSlider = document.getElementById('sleep');
    const waterSlider = document.getElementById('water');

    if (sleepSlider) {
        sleepSlider.addEventListener('input', function() {
            document.getElementById('sleep-value').textContent = this.value;
            userHealth.sleep = parseInt(this.value);
        });
    }

    if (waterSlider) {
        waterSlider.addEventListener('input', function() {
            document.getElementById('water-value').textContent = this.value;
            userHealth.water = parseInt(this.value);
        });
    }
});

// Select Options
function selectOption(category, value, element) {
    document.querySelectorAll(`[data-value]`).forEach(btn => {
        if (btn.parentElement === element.parentElement) {
            btn.classList.remove('selected');
        }
    });
    element.classList.add('selected');
    userHealth[category] = value;
}

// Analyze Balance
function analyzeBalance() {
    calculateHealthStatus();
    generateInsights();
    calculateRisks();
    updateResultScreen();
    goToScreen('screen-result');
}

// Calculate Health Status
function calculateHealthStatus() {
    let score = 0;

    // Sleep scoring
    if (userHealth.sleep >= 7 && userHealth.sleep <= 8) {
        score += 25;
    } else if (userHealth.sleep >= 6 && userHealth.sleep <= 9) {
        score += 20;
    } else {
        score += 10;
    }

    // Screen time scoring
    if (userHealth.screenTime === 'low') {
        score += 25;
    } else if (userHealth.screenTime === 'medium') {
        score += 15;
    } else {
        score += 5;
    }

    // Meals scoring
    if (userHealth.meals === 'healthy') {
        score += 25;
    } else if (userHealth.meals === 'mixed') {
        score += 15;
    } else {
        score += 5;
    }

    // Activity scoring
    if (userHealth.activity === 'high') {
        score += 25;
    } else if (userHealth.activity === 'medium') {
        score += 15;
    } else {
        score += 5;
    }

    // Water intake scoring
    if (userHealth.water >= 8) {
        score += 0; // bonus already counted
    } else if (userHealth.water >= 6) {
        score += 10;
    } else {
        score += 5;
    }

    // Determine status
    if (score >= 80) {
        userHealth.status = 'stable';
    } else if (score >= 60) {
        userHealth.status = 'unstable';
    } else {
        userHealth.status = 'critical';
    }
}

// Generate Insights
function generateInsights() {
    userHealth.insights = [];

    if (userHealth.screenTime === 'high') {
        userHealth.insights.push('⚠️ High screen exposure detected');
    }

    if (userHealth.activity === 'low') {
        userHealth.insights.push('⚠️ Low movement detected');
    }

    if (userHealth.sleep < 6) {
        userHealth.insights.push('⚠️ Insufficient sleep - energy may drop');
    }

    if (userHealth.meals === 'fastfood') {
        userHealth.insights.push('⚠️ Diet needs improvement for better health');
    }

    if (userHealth.water < 5) {
        userHealth.insights.push('⚠️ Low water intake - increase hydration');
    }

    if (userHealth.insights.length === 0) {
        userHealth.insights.push('✅ Great job! Keep maintaining healthy habits');
    }
}

// Calculate Risks
function calculateRisks() {
    // Fatigue Risk
    if (userHealth.sleep < 5 || userHealth.activity === 'low') {
        userHealth.risks.fatigue = 'HIGH';
    } else if (userHealth.sleep < 7 || userHealth.activity === 'medium') {
        userHealth.risks.fatigue = 'MEDIUM';
    } else {
        userHealth.risks.fatigue = 'LOW';
    }

    // Obesity Risk
    if (userHealth.meals === 'fastfood' && userHealth.activity === 'low') {
        userHealth.risks.obesity = 'HIGH';
    } else if (userHealth.meals === 'fastfood' || userHealth.activity === 'low') {
        userHealth.risks.obesity = 'MEDIUM';
    } else {
        userHealth.risks.obesity = 'LOW';
    }

    // Screen Strain Risk
    if (userHealth.screenTime === 'high') {
        userHealth.risks.screenStrain = 'HIGH';
    } else if (userHealth.screenTime === 'medium') {
        userHealth.risks.screenStrain = 'MEDIUM';
    } else {
        userHealth.risks.screenStrain = 'LOW';
    }
}

// Update Result Screen
function updateResultScreen() {
    // Update status badge
    const statusBadge = document.getElementById('status-badge-result');
    statusBadge.className = `status-badge ${userHealth.status}`;
    
    if (userHealth.status === 'stable') {
        statusBadge.textContent = '🟢 Stable';
    } else if (userHealth.status === 'unstable') {
        statusBadge.textContent = '🟡 Unstable';
    } else {
        statusBadge.textContent = '🔴 Critical';
    }

    // Update insights
    const insightsList = document.getElementById('insights-list');
    insightsList.innerHTML = userHealth.insights
        .map(insight => `<li>${insight}</li>`)
        .join('');

    // Update risk indicators
    const fatigueRisk = document.getElementById('fatigue-risk');
    const fatigueLabel = document.getElementById('fatigue-label');
    const obesityRisk = document.getElementById('obesity-risk');
    const obesityLabel = document.getElementById('obesity-label');

    // Set fatigue risk
    fatigueLabel.textContent = userHealth.risks.fatigue;
    if (userHealth.risks.fatigue === 'HIGH') {
        fatigueRisk.style.width = '85%';
        fatigueRisk.className = 'risk-fill high';
    } else if (userHealth.risks.fatigue === 'MEDIUM') {
        fatigueRisk.style.width = '60%';
        fatigueRisk.className = 'risk-fill';
    } else {
        fatigueRisk.style.width = '30%';
        fatigueRisk.className = 'risk-fill';
    }

    // Set obesity risk
    obesityLabel.textContent = userHealth.risks.obesity;
    if (userHealth.risks.obesity === 'HIGH') {
        obesityRisk.style.width = '85%';
        obesityRisk.className = 'risk-fill high';
    } else if (userHealth.risks.obesity === 'MEDIUM') {
        obesityRisk.style.width = '60%';
        obesityRisk.className = 'risk-fill';
    } else {
        obesityRisk.style.width = '30%';
        obesityRisk.className = 'risk-fill';
    }
}

// Reset Habits
function resetHabits() {
    userHealth = {
        sleep: 6,
        screenTime: 'medium',
        meals: 'mixed',
        activity: 'medium',
        water: 5,
        status: 'unstable',
        insights: [],
        risks: {}
    };

    // Reset UI
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('sleep').value = 6;
    document.getElementById('water').value = 5;
    document.getElementById('sleep-value').textContent = '6';
    document.getElementById('water-value').textContent = '5';

    goToScreen('screen-daily');
}

// Export user data
function exportHealthData() {
    const dataStr = JSON.stringify(userHealth, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `health-data-${new Date().toISOString().slice(0,10)}.json`;
    link.click();
}
