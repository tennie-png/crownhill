document.addEventListener('DOMContentLoaded', function () {
    var secondaryNavbar = document.querySelector('.secondary-navbar');
    var navbar = document.querySelector('.navbar');

    var scrollThreshold = 140;

    console.log("Scroll Threshold:", scrollThreshold);


    secondaryNavbar.style.display = 'flex';
    secondaryNavbar.style.opacity = '0';
    secondaryNavbar.style.pointerEvents = 'none';

    window.onscroll = function () {
        console.log("Scroll Position:", window.pageYOffset);

        if (window.pageYOffset > scrollThreshold) {
            navbar.style.opacity = '0';
            secondaryNavbar.style.opacity = '1';
            secondaryNavbar.style.pointerEvents = 'auto';
        } else {
            navbar.style.opacity = '0.75';
            secondaryNavbar.style.opacity = '0';
            secondaryNavbar.style.pointerEvents = 'none';
        }
    };
});

window.onload = function () {
    loadSelectedLocation(); // Load the saved location (if any)
    document.getElementById("dropdown").style.display = "none";
};

function toggleDropdown() {
    const dropdown = document.getElementById("dropdown");
    const arrow = document.querySelector(".arrow");

    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    arrow.classList.toggle("rotate");
}

function selectLocation(location) {
    document.getElementById("selected-location").innerHTML = `
        <img class="icon" src="../images/location.svg"/> 
        ${location}
    `;
    toggleDropdown();
}

// Save selected location and update
function selectLocation(location) {
    localStorage.setItem('selectedLocation', location);
    toggleDropdown();

    document.getElementById("selected-location").innerHTML = `
        <img class="icon" src="../images/location.svg"/> 
        ${location}
    `;

    // Update
    updateButton(location);
    toggleDropdown();
}

// Load saved location
function loadSelectedLocation() {
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
        document.getElementById("selected-location").innerHTML = `
            <img class="icon" src="../images/location.svg"/> 
            ${savedLocation}
        `;
        updateButton(savedLocation);
    }
}

// Update Button on Location
function updateButton(location) {
    const button = document.getElementById("location-button");

    if (location === '1865 Tanen Street, Napa, CA 94559') {
        button.innerHTML = `<img src="images/call.svg" class="call">707-255-1225`;
    } else if (location === '1151 Vintage Avenue, St. Helena, CA 94574') {
        button.innerHTML = `<img src="images/call.svg" class="call">707-968-5596`;
    } else if (location === '650 Green Island Road, American Canyon, CA 94503') {
        button.innerHTML = `<img src="images/call.svg" class="call">707-642-6162`;
    }
    toggleDropdown();
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("dropdown");
    const container = document.querySelector(".dropdown-container");

    if (!container.contains(event.target)) {
        dropdown.style.display = "none";
        document.querySelector(".arrow").classList.remove("rotate");
    }
}
);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    });
});
