// BMI Calculation & Analysis

function calculateBMI(weight, height) {
    // weight in kg, height in cm
    const heightM = height / 100;
    return (weight / (heightM * heightM)).toFixed(1);
}

function getBMIStatus(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function analyzeHabits(data) {
    const bmi = calculateBMI(data.weight, data.height);
    const bmiStatus = getBMIStatus(bmi);

    // Calculate scores
    let energyScore = 50;
    let activityScore = 0;
    let nutritionScore = 50;

    // Adjust based on sleep
    if (data.sleep >= 7 && data.sleep <= 9) {
        energyScore += 30;
    } else if (data.sleep < 5 || data.sleep > 10) {
        energyScore -= 20;
    }

    // Activity score
    if (data.activity === 'active') {
        activityScore = 80;
    } else if (data.activity === 'moderate') {
        activityScore = 50;
    } else {
        activityScore = 20;
    }

    // Nutrition score
    if (data.foodType === 'balanced') {
        nutritionScore = 85;
    } else if (data.foodType === 'mixed') {
        nutritionScore = 60;
    } else {
        nutritionScore = 30;
    }

    // Screen time impact
    if (data.screen > 7) {
        energyScore -= 15;
        activityScore -= 10;
    }

    // Water intake
    if (data.water >= 6) {
        nutritionScore += 10;
    }

    // Generate insights
    const insights = generateInsights(data, bmi, bmiStatus);

    // Determine risk level
    const lifestyleRisk = calculateRiskLevel(energyScore, activityScore, nutritionScore);

    const analysis = {
        bmi: parseFloat(bmi),
        bmiStatus,
        energyScore: Math.min(100, Math.max(0, energyScore)),
        activityScore: Math.min(100, Math.max(0, activityScore)),
        nutritionScore: Math.min(100, Math.max(0, nutritionScore)),
        insights,
        lifestyleRisk,
        date: new Date().toISOString()
    };

    saveAnalysis(analysis);
    return analysis;
}

function generateInsights(data, bmi, bmiStatus) {
    const insights = [];

    // BMI insights
    if (bmiStatus === 'Obese' || bmiStatus === 'Overweight') {
        insights.push('⚠️ BMI indicates need for lifestyle changes');
    }

    // Sleep insights
    if (data.sleep < 6) {
        insights.push('😴 Low sleep detected - affects energy levels');
    }
    if (data.sleep > 9) {
        insights.push('💤 High sleep duration - may indicate fatigue');
    }

    // Activity insights
    if (data.activity === 'low') {
        insights.push('🚶 Low physical activity - increase movement');
    }

    // Food insights
    if (data.foodType === 'fastfood') {
        insights.push('🍔 High fast food intake - switch to balanced meals');
    }

    // Screen time insights
    if (data.screen > 7) {
        insights.push('📱 High screen time detected - take breaks');
    }

    // Water insights
    if (data.water < 4) {
        insights.push('💧 Low water intake - increase hydration');
    }

    // Energy prediction
    if (data.sleep < 6 && data.screen > 7) {
        insights.push('⚡ Energy likely to drop in afternoon');
    }

    // Pattern detection
    if (data.foodType === 'fastfood' && data.activity === 'low') {
        insights.push('📊 High sugar intake pattern detected');
    }

    return insights.length > 0 ? insights : ['✓ Your habits are generally balanced'];
}

function calculateRiskLevel(energy, activity, nutrition) {
    const average = (energy + activity + nutrition) / 3;
    if (average >= 70) return 'LOW RISK';
    if (average >= 50) return 'MODERATE RISK';
    return 'HIGH RISK';
}
