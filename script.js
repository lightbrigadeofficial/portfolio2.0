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
    let atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight;
    let atTop = window.scrollY === 0;
    
    // Only prevent default scrolling when not at the top or bottom
    if (!atBottom && !atTop) {
        event.preventDefault();
        window.scrollBy({
            top: event.deltaY * scrollSpeed, // Adjusts the scroll movement based on speed factor
            behavior: "smooth" // Enables smooth scrolling
        });
    }
}, { passive: false }); // Ensures preventDefault() works on some browsers

// Customizing cursor to be translucent and round
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
    
    document.getElementById("clock").textContent = `Local/ ${hours}:${minutes}:${seconds}`;
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

//
let isScrolling = false;
window.addEventListener("wheel", (event) => {
    if (isScrolling) return;
    isScrolling = true;

    let sections = document.querySelectorAll(".section");
    let currentSection = [...sections].findIndex(sec => sec.getBoundingClientRect().top >= 0);
    
    if (event.deltaY > 0 && currentSection < sections.length - 1) {
        sections[currentSection + 1].scrollIntoView({ behavior: "smooth" });
    } else if (event.deltaY < 0 && currentSection > 0) {
        sections[currentSection - 1].scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => isScrolling = false, 700); // Adds a small delay to make it feel "resistant"
}, { passive: false });

// Smooth scrolling animation
window.addEventListener("scroll", function() {
    const scrollY = window.scrollY;
    const animatedText = document.querySelector('.animated-text');
    const line1 = document.querySelector('.line1');
    const line2 = document.querySelector('.line2');

    let progress, offset;

    // Phase 1: Delayed Resistance Effect (scroll < 100)
    if (scrollY < 100) {
        // Exponential Decay Effect for Delay
        let resistance = Math.exp(-scrollY / 50); // Decay factor
        let rotation = 10 * resistance; // Delayed easing effect
        let translation = 10 * resistance; // Slight movement delay

        animatedText.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        line1.style.transform = `translateX(${translation}px)`;
        line2.style.transform = `translateX(-${translation}px)`;
    }
    // Phase 2: Middle transition (100 - 300)
    else if (scrollY >= 100 && scrollY < 300) {
        progress = (scrollY - 100) / 200; // Normalized progress (0 to 1)
        animatedText.style.transform = `translate(-50%, -50%) rotate(${ -25 + (25 * progress) }deg)`;

        offset = progress * 20;
        line1.style.transform = `translateX(${-offset}px)`;
        line2.style.transform = `translateX(${offset}px)`;
    }
    // Phase 3: Final state (scroll >= 300)
    else {
        progress = Math.min((scrollY - 300) / 200, 1);
        offset = 20 + progress * 20;

        animatedText.style.transform = 'translate(-50%, -50%) rotate(-10deg)';
        line1.style.transform = `translateX(${-offset}px)`;
        line2.style.transform = `translateX(${offset}px)`;
    }
});

// To warn the user about zoom aspect
window.onload = function() {
    detectZoom();
};

function detectZoom() {
    let zoomLevel = Math.round(window.devicePixelRatio * 100);
    let screenWidth = window.innerWidth;

    console.log("Current Zoom: " + zoomLevel + "%");
    
    // Exclude mobile devices (adjust width threshold if needed)
    if (screenWidth > 768 && zoomLevel !== 100) { 
        alert("For the best experience, set your browser zoom to 100%");
    }
}

//To prevent horizontal scrolling
window.addEventListener("resize", function() {
    document.body.style.width = window.innerWidth + "px";
});
