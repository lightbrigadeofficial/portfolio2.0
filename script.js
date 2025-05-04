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
let scrollSpeed = 0.1; 



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

    const sections = document.querySelectorAll(".section");
    const currentSection = [...sections].findIndex(sec => sec.getBoundingClientRect().top >= 0);

    if (event.deltaY > 0 && currentSection < sections.length - 1) {
        sections[currentSection + 1].scrollIntoView({ behavior: "smooth" });
    } else if (event.deltaY < 0 && currentSection > 0) {
        sections[currentSection - 1].scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => isScrolling = false, 700); // Prevents rapid scroll jumps
}, { passive: false });

// Smooth animation on scroll
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const animatedText = document.querySelector('.animated-text');
    const line1 = document.querySelector('.line1');
    const line2 = document.querySelector('.line2');

    let progress, offset;

    // Phase 1: Gentle effect when scrollY < 100
    if (scrollY < 100) {
        const factor = (100 - scrollY) / 100; // 1 to 0
        const rotation = 10 * factor;         // Reduced rotation
        const translation = 10 * factor;

        animatedText.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        line1.style.transform = `translateX(${translation}px)`;
        line2.style.transform = `translateX(-${translation}px)`;
    }

    // Phase 2: Transition between 100 and 300
    else if (scrollY >= 100 && scrollY < 101) {
        progress = (scrollY - 100) / 200; // Progress: 0 to 1
        const rotation = -25 + (25 * progress);
        offset = progress * 20;

        animatedText.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        line1.style.transform = `translateX(${-offset}px)`;
        line2.style.transform = `translateX(${offset}px)`;
    }

    // Phase 3: Fixed end-state when scrollY >= 300
    else {
        animatedText.style.transform = `translate(-50%, -50%) rotate(0deg)`;
        line1.style.transform = `translateX(-20px)`;
        line2.style.transform = `translateX(20px)`;
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

////
  const tag = document.getElementById("slimeTag");

  document.addEventListener("mousemove", (e) => {
    const rect = tag.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Scale down the movement for a "slimey" lag
    const movementX = deltaX * 0.02;
    const movementY = deltaY * 0.02;

    tag.style.transform = `translate(${movementX}px, ${movementY}px)`;
  });

  document.addEventListener("mouseleave", () => {
    tag.style.transform = `translate(0px, 0px)`;
  });

//Scroll-triggered Sequential Fade-in Animation for boutme//
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) return; // Disable animation on mobile

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const container = entry.target;
            if (entry.isIntersecting) {
                const items = container.querySelectorAll('.animate-item');
                items.forEach((item, i) => {
                    item.classList.remove('show');
                    void item.offsetWidth;
                    item.style.animationDelay = `${i * 0.6}s`;
                    item.classList.add('show');
                });
            } else {
                const items = container.querySelectorAll('.animate-item');
                items.forEach(item => {
                    item.classList.remove('show');
                });
            }
        });
    }, { threshold: 0.5 });

    observer.observe(document.querySelector('#boutme'));
});

//EMAIID//
let originalEmail = "HYEONTEAM23@GMAIL.COM";
let glitchTexts = ["#31/@$f", "$!Q27$#", "B$%@#V23", "!$%gT3", "7f6@w1L"];
let glitchInterval;
let currentGlitchIndex = 0;

function startGlitch() {
    let emailElement = document.getElementById("email");
    emailElement.classList.add("glitch");
    glitchInterval = setInterval(() => {
        emailElement.textContent = glitchTexts[currentGlitchIndex];
        currentGlitchIndex = (currentGlitchIndex + 1) % glitchTexts.length;
    }, 100);
}

function resetText() {
    clearInterval(glitchInterval); // Stop the glitch effect
    let emailElement = document.getElementById("email");
    emailElement.classList.remove("glitch");
    emailElement.textContent = originalEmail; // Return to the original email
}

function copyEmail() {
    const email = "hyeonteam23@gmail.com"; // Store the email in lowercase
    navigator.clipboard.writeText(email).then(() => {
        alert("Email copied: " + email);  // Email copied in lowercase
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}