// Main Application Logic

console.log('BALANCE+ App Loaded');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    checkFirstTime();
});

function checkFirstTime() {
    const userData = getUserData();
    if (userData.checkIns.length === 0) {
        console.log('First time user');
    }
}

function navigateTo(page) {
    window.location.href = page;
}

function showNotification(message) {
    // Simple notification
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #51cf66;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Format date
function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Export data as JSON
function exportData() {
    const userData = getUserData();
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'balance-plus-data.json';
    link.click();
}
