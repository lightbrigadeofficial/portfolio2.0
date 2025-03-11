// Listen for scroll events on the window
window.addEventListener("scroll", () => {
    // Get the current vertical scroll position
    let scrollValue = window.scrollY;
    
    // Calculate the clipping value to create an animation effect
    // The clip value decreases as the user scrolls down
    let clipValue = Math.max(0, 50 - scrollValue / 10);

    // Apply a dynamic clipping effect to the element with ID "cover"
    document.getElementById("cover").style.clipPath = `inset(0 ${clipValue}% 0 ${clipValue}%)`;
});

// Set the scroll speed resistance factor (lower value = more resistance)
let scrollSpeed = 0.9; 

// Listen for mouse wheel scroll events
window.addEventListener("wheel", function (event) {
    // Prevent the default scrolling behavior
    event.preventDefault();
    
    // Manually control the scrolling behavior with reduced speed
    window.scrollBy({
        top: event.deltaY * scrollSpeed, // Adjusts the scroll movement based on speed factor
        behavior: "smooth" // Enables smooth scrolling
    });
}, { passive: false }); // Ensures preventDefault() works on some browsers

// Customizing cursor to be transclucent and round
document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");
    document.body.appendChild(cursor);

    let posX = 0, posY = 0; // Current cursor position
    let targetX = 0, targetY = 0; // Target cursor position
    const resistance = 0.1; // Adjust for more/less resistance

    document.addEventListener("mousemove", function (e) {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateCursor() {
        posX += (targetX - posX) * resistance;
        posY += (targetY - posY) * resistance;
        cursor.style.left = `${posX}px`;
        cursor.style.top = `${posY}px`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();
});

// Local Timer clock
function updateClock() {
    let now = new Date();
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
    
    document.getElementById("clock").textContent = `Local/${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Call once to prevent delay
updateClock();

// Adding Menu
const middleDot = document.getElementById("middle-dot");
const menuOverlay = document.getElementById("menu-overlay");

middleDot.addEventListener("click", function () {
    menuOverlay.classList.toggle("active");  // Show/hide menu
    middleDot.classList.toggle("active");   // Turn dot into "X"
    middleDot.textContent = middleDot.classList.contains("active") ? "✕" : ""; // Change content
});
