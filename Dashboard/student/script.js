let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
})


document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Unauthorized access! Redirecting to login.");
        window.location.href = "index.html"; // Redirect to login page
        return;
    }

    try {
        // Fetch user data from backend
        const response = await fetch("http://localhost:5000/dashboard", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
            throw new Error("Invalid token");
        }

        const data = await response.json();

        // Display user name in the dashboard
        document.querySelector(".message h4").textContent = `Welcome, ${data.user.name}!`;

    } catch (error) {
        alert("Session expired or invalid token. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "index.html";
    }
});

// Logout function
document.querySelector(".logout").addEventListener("click", function () {
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    window.location.href = "index.html";
});
