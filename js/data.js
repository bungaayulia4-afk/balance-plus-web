// Local Storage Management

function getUserData() {
    const data = localStorage.getItem('balancePlusData');
    return data ? JSON.parse(data) : {
        checkIns: [],
        lastAnalysis: null,
        lastReset: null,
        streak: 0
    };
}

function saveUserData(data) {
    const userData = getUserData();
    userData.checkIns.push(data);
    userData.lastReset = new Date().toISOString();
    localStorage.setItem('balancePlusData', JSON.stringify(userData));
}

function getLatestAnalysis() {
    const userData = getUserData();
    return userData.lastAnalysis || null;
}

function saveAnalysis(analysis) {
    const userData = getUserData();
    userData.lastAnalysis = analysis;
    localStorage.setItem('balancePlusData', JSON.stringify(userData));
}

function clearAllData() {
    localStorage.removeItem('balancePlusData');
}
