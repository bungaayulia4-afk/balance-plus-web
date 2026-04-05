# balance-plus-web
BALANCE+ - Alat Pengukuran Keseimbangan Kesehatan &amp; Obesitas  Aplikasi web modern dan interaktif untuk mengukur keseimbangan kesehatan dan risiko obesitas dengan rekomendasi yang dipersonalisasi
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BALANCE+ - Health Balance Dashboard</title>
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/screens.css">
</head>
<body>
    <div class="app-container">
        <!-- SCREEN 1: HOME DASHBOARD -->
        <div id="screen-home" class="screen active">
            <header class="header">
                <h1 class="logo">BALANCE+</h1>
                <div class="header-icon">⚙️</div>
            </header>

            <div class="card-main">
                <h2>Body Balance Status</h2>
                <div class="status-badge unstable">🟡 Unstable</div>
                <p class="status-desc">Your health metrics need attention</p>
            </div>

            <div class="energy-section">
                <p class="energy-label">Energy Level</p>
                <div class="energy-bar">
                    <div class="energy-fill" style="width: 40%;"></div>
                </div>
                <p class="energy-text">Energy: ▓▓▓░░ (40%)</p>
            </div>

            <div class="button-group">
                <button class="btn btn-primary" onclick="goToScreen('screen-daily')">
                    👉 Start Daily Check
                </button>
                <button class="btn btn-secondary" onclick="goToScreen('screen-smart')">
                    💡 Smart Guidance
                </button>
                <button class="btn btn-secondary" onclick="goToScreen('screen-progress')">
                    📊 My Progress
                </button>
            </div>
        </div>

        <!-- SCREEN 2: DAILY INPUT -->
        <div id="screen-daily" class="screen">
            <header class="header">
                <button class="btn-back" onclick="goToScreen('screen-home')">← Back</button>
                <h1>BALANCE+</h1>
            </header>

            <h2 class="screen-title">Tell us your today's habit</h2>

            <div class="input-section">
                <!-- Sleep Input -->
                <div class="input-card">
                    <label class="input-label">💤 Sleep</label>
                    <input type="range" id="sleep" min="0" max="12" value="6" class="slider">
                    <p class="slider-value"><span id="sleep-value">6</span> hours</p>
                </div>

                <!-- Screen Time Input -->
                <div class="input-card">
                    <label class="input-label">📱 Screen Time</label>
                    <div class="option-group">
                        <button class="option-btn" data-value="low" onclick="selectOption('screenTime', 'low', this)">Low</button>
                        <button class="option-btn" data-value="medium" onclick="selectOption('screenTime', 'medium', this)">Medium</button>
                        <button class="option-btn" data-value="high" onclick="selectOption('screenTime', 'high', this)">High</button>
                    </div>
                </div>

                <!-- Meals Input -->
                <div class="input-card">
                    <label class="input-label">🍽️ Meals Quality</label>
                    <div class="option-group">
                        <button class="option-btn" data-value="healthy" onclick="selectOption('meals', 'healthy', this)">🥗 Healthy</button>
                        <button class="option-btn" data-value="mixed" onclick="selectOption('meals', 'mixed', this)">🍲 Mixed</button>
                        <button class="option-btn" data-value="fastfood" onclick="selectOption('meals', 'fastfood', this)">🍔 Fast Food</button>
                    </div>
                </div>

                <!-- Activity Input -->
                <div class="input-card">
                    <label class="input-label">🚶 Physical Activity</label>
                    <div class="option-group">
                        <button class="option-btn" data-value="low" onclick="selectOption('activity', 'low', this)">Low</button>
                        <button class="option-btn" data-value="medium" onclick="selectOption('activity', 'medium', this)">Medium</button>
                        <button class="option-btn" data-value="high" onclick="selectOption('activity', 'high', this)">High</button>
                    </div>
                </div>

                <!-- Water Intake Input -->
                <div class="input-card">
                    <label class="input-label">💧 Water Intake</label>
                    <input type="range" id="water" min="0" max="10" value="5" class="slider">
                    <p class="slider-value"><span id="water-value">5</span> cups</p>
                </div>
            </div>

            <button class="btn btn-primary btn-full" onclick="analyzeBalance()">
                👉 Analyze My Balance
            </button>
        </div>

        <!-- SCREEN 3: RESULT PAGE -->
        <div id="screen-result" class="screen">
            <header class="header">
                <button class="btn-back" onclick="goToScreen('screen-daily')">← Back</button>
                <h1>BALANCE+</h1>
            </header>

            <div class="result-card">
                <h2>🧠 Body Status</h2>
                <div id="status-badge-result" class="status-badge unstable">🟡 Unstable</div>
            </div>

            <div class="insight-card">
                <h3>📉 Health Insights</h3>
                <ul id="insights-list">
                    <li>⚠️ Energy may drop in afternoon</li>
                    <li>⚠️ Low movement detected</li>
                    <li>⚠️ High screen exposure</li>
                </ul>
            </div>

            <div class="risk-card">
                <h3>⚠️ Risk Indicators</h3>
                <div class="risk-item">
                    <p>Fatigue Risk</p>
                    <div class="risk-bar">
                        <div class="risk-fill high" id="fatigue-risk"></div>
                    </div>
                    <p class="risk-label" id="fatigue-label">HIGH</p>
                </div>
                <div class="risk-item">
                    <p>Obesity Risk</p>
                    <div class="risk-bar">
                        <div class="risk-fill" id="obesity-risk"></div>
                    </div>
                    <p class="risk-label" id="obesity-label">MEDIUM</p>
                </div>
            </div>

            <button class="btn btn-primary btn-full" onclick="goToScreen('screen-smart')">
                👉 See Smart Actions
            </button>
        </div>

        <!-- SCREEN 4: SMART ACTIONS -->
        <div id="screen-smart" class="screen">
            <header class="header">
                <button class="btn-back" onclick="goToScreen('screen-result')">← Back</button>
                <h1>BALANCE+</h1>
            </header>

            <h2 class="screen-title">🎯 Your Personalized Actions</h2>

            <div class="action-section">
                <h3>🥗 Food Action</h3>
                <div class="action-card">
                    <p>✅ Add vegetables today</p>
                    <p>✅ Reduce sugary drinks</p>
                    <p>✅ Drink more water</p>
                </div>
            </div>

            <div class="action-section">
                <h3>🚶 Movement Action</h3>
                <div class="action-card">
                    <p>✅ Stand up every 2 minutes</p>
                    <p>✅ Do shoulder stretches</p>
                    <p>✅ Take a 10-min walk</p>
                </div>
            </div>

            <div class="action-section">
                <h3>📱 Digital Wellness</h3>
                <div class="action-card">
                    <p>✅ Take screen break every 30 min</p>
                    <p>✅ Reduce evening screen time</p>
                    <p>✅ Enable blue light filter</p>
                </div>
            </div>

            <button class="btn btn-primary btn-full" onclick="goToScreen('screen-plate')">
                👉 View Smart Plate
            </button>
        </div>

        <!-- SCREEN 5: SMART PLATE -->
        <div id="screen-plate" class="screen">
            <header class="header">
                <button class="btn-back" onclick="goToScreen('screen-smart')">← Back</button>
                <h1>BALANCE+</h1>
            </header>

            <h2 class="screen-title">🍽️ Your Smart Plate</h2>

            <div class="plate-container">
                <svg class="plate" viewBox="0 0 200 200">
                    <!-- Vegetables (50%) - Green -->
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#4CAF50" stroke-width="50" 
                            stroke-dasharray="251.2 502.4" stroke-dashoffset="0" opacity="0.8"></circle>
                    <!-- Carbs (25%) - Yellow -->
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#FFC107" stroke-width="50" 
                            stroke-dasharray="125.6 502.4" stroke-dashoffset="-251.2" opacity="0.8"></circle>
                    <!-- Protein (25%) - Red -->
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#FF6B6B" stroke-width="50" 
                            stroke-dasharray="125.6 502.4" stroke-dashoffset="-376.8" opacity="0.8"></circle>
                </svg>
            </div>

            <div class="plate-legend">
                <div class="legend-item">
                    <span class="legend-color vegetables"></span>
                    <p>🟢 50% Vegetables</p>
                </div>
                <div class="legend-item">
                    <span class="legend-color carbs"></span>
                    <p>🟡 25% Carbs</p>
                </div>
                <div class="legend-item">
                    <span class="legend-color protein"></span>
                    <p>🔴 25% Protein</p>
                </div>
            </div>

            <button class="btn btn-secondary btn-full" onclick="goToScreen('screen-simulation')">
                📊 Generate Meal Guide
            </button>
        </div>

        <!-- SCREEN 6: FUTURE SIMULATION -->
        <div id="screen-simulation" class="screen">
            <header class="header">
                <button class="btn-back" onclick="goToScreen('screen-plate')">← Back</button>
                <h1>BALANCE+</h1>
            </header>

            <h2 class="screen-title">🔮 Future Health Simulation</h2>
            <p class="subtitle">If you continue this habit...</p>

            <div class="simulation-container">
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-marker">📅 1 Week</div>
                        <div class="timeline-content">
                            <p>⚡ Energy: Stable</p>
                            <p>😴 Sleep: Important</p>
                        </div>
                    </div>
                    <div class="timeline-item warning">
                        <div class="timeline-marker">📅 2 Weeks</div>
                        <div class="timeline-content">
                            <p>⬇️ Energy: Declining</p>
                            <p>😩 Fatigue: Increasing</p>
                        </div>
                    </div>
                    <div class="timeline-item danger">
                        <div class="timeline-marker">📅 1 Month</div>
                        <div class="timeline-content">
                            <p>⚠️ Energy: Critical</p>
                            <p>🚨 Risk: High</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="warning-box">
                <p>⚠️ <strong>Warning:</strong> Continuing unhealthy habits may lead to increased obesity risk and health complications.</p>
            </div>

            <button class="btn btn-primary btn-full" onclick="resetHabits()">
                🔁 Reset My Habit Path
            </button>
        </div>

        <!-- SCREEN 7: PROGRESS TRACKING -->
        <div id="screen-progress" class="screen">
            <header class="header">
                <button class="btn-back" onclick="goToScreen('screen-home')">← Back</button>
                <h1>BALANCE+</h1>
            </header>

            <h2 class="screen-title">📊 Your Progress</h2>

            <div class="progress-card">
                <h3>Weekly Improvements</h3>
                <div class="progress-item">
                    <p>Sleep Quality</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 75%;"></div>
                    </div>
                    <p class="progress-label">75%</p>
                </div>
                <div class="progress-item">
                    <p>Activity Level</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 60%;"></div>
                    </div>
                    <p class="progress-label">60%</p>
                </div>
                <div class="progress-item">
                    <p>Nutrition Balance</p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 80%;"></div>
                    </div>
                    <p class="progress-label">80%</p>
                </div>
            </div>

            <button class="btn btn-secondary btn-full" onclick="goToScreen('screen-home')">
                🔄 Back to Dashboard
            </button>
        </div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
