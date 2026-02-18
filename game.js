const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const hud = document.getElementById('hud');

// Game State
const player = { x: 50, y: 200, size: 20, color: '#00ffcc' };
const goal = { x: 550, y: 200, size: 30, color: '#ff00ff' };
let beatIntensity = 0;
let lastBeatTime = 0;
const beatInterval = 1000; // 1 second per beat

function update() {
    const now = Date.now();
    
    // Calculate the "Pulse" (0 to 1)
    beatIntensity = Math.max(0, 1 - (now % beatInterval) / 400);

    // Render loop
    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Pulse Background Effect
    ctx.strokeStyle = `rgba(0, 255, 204, ${beatIntensity * 0.3})`;
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

    // Draw Goal
    ctx.fillStyle = goal.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = goal.color;
    ctx.fillRect(goal.x - 15, goal.y - 15, goal.size, goal.size);

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.shadowBlur = beatIntensity * 20;
    ctx.shadowColor = player.color;
    ctx.fillRect(player.x - 10, player.y - 10, player.size, player.size);
    
    // HUD Update
    if (beatIntensity > 0.5) {
        hud.innerText = "MOVE NOW!";
        hud.style.color = "#00ffcc";
    } else {
        hud.innerText = "STAY STILL...";
        hud.style.color = "#ff4444";
    }
}

// Input Handling
window.addEventListener('keydown', (e) => {
    const moveStep = 20;
    
    // Check if player moved off-beat
    if (beatIntensity < 0.5) {
        player.x = 50; // Reset to start if they fail
        alert("Alerted the guards! Stay in sync with the pulse.");
        return;
    }

    if (e.key === 'ArrowRight') player.x += moveStep;
    if (e.key === 'ArrowLeft') player.x -= moveStep;
    if (e.key === 'ArrowUp') player.y -= moveStep;
    if (e.key === 'ArrowDown') player.y += moveStep;

    // Win condition
    if (player.x >= goal.x - 20) {
        alert("Extraction Complete. Well done, Agent.");
        player.x = 50;
    }
});

update();
