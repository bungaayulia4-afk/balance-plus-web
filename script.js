// Assessment scoring logic
function calculateScore(assessments) {
    let totalScore = 0;
    const totalWeight = assessments.reduce((acc, assessment) => acc + assessment.weight, 0);
    
    assessments.forEach(assessment => {
        totalScore += (assessment.score * assessment.weight);
    });

    return totalScore / totalWeight;
}

// Calculate weighted domain scores
function calculateWeightedDomainScores(domains) {
    const scores = {};
    
    domains.forEach(domain => {
        scores[domain.name] = calculateScore(domain.assessments);
    });

    return scores;
}

// Determine category based on score
function determineCategory(score) {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 50) return 'Average';
    return 'Poor';
}

// Progress tracking
let progress = JSON.parse(localStorage.getItem('progress')) || [];

function trackProgress(score) {
    progress.push({ date: new Date(), score: score });
    localStorage.setItem('progress', JSON.stringify(progress));
}

// Load progress from localStorage
function loadProgress() {
    return JSON.parse(localStorage.getItem('progress')) || [];
}

// Example usage
const assessments = [
    { score: 85, weight: 0.4 },
    { score: 90, weight: 0.6 }
];

const domains = [
    { name: 'Math', assessments: assessments },
    { name: 'Science', assessments: assessments }
];

const overallScore = calculateScore(assessments);
const weightedScores = calculateWeightedDomainScores(domains);
const category = determineCategory(overallScore);

trackProgress(overallScore);

console.log('Overall Score:', overallScore);
console.log('Weighted Domain Scores:', weightedScores);
console.log('Category:', category);
console.log('Progress:', loadProgress());