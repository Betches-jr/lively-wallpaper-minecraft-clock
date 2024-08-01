const clock = document.getElementById('clock');
const clockImage = document.getElementById('clockImage');
const timeDisplay = document.getElementById('time');

// Array of clock image URLs (assuming you have 64 frames)
const clockImages = Array.from({ length: 64 }, (_, i) => `clock_images/clock_${i}.png`);

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const milliseconds = now.getMilliseconds();

    // Calculate the number of 22.5-minute intervals (1440 minutes / 64 frames = 22.5 minutes per frame)
    const totalMinutesSinceNoon = ((hours - 12) * 60 + minutes + 1440) % 1440;
    const frameIndex = Math.floor(totalMinutesSinceNoon / 22.5) % 64; // Ensure frame index is within range

    // Set the clock image source
    clockImage.src = clockImages[frameIndex];

    // Update the rotation of the clock
    const totalSeconds = hours * 3600 + minutes * 60 + milliseconds / 1000;
    const angle = (totalSeconds / 86400) * 360;
    clock.style.transform = `rotateY(${angle}deg) translateZ(50px)`;

    // Format the time as HH:MM without seconds and AM/PM
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    timeDisplay.textContent = formattedTime;

    requestAnimationFrame(updateClock);
}

updateClock();
