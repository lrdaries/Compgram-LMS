const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


document.addEventListener("DOMContentLoaded", function () {
    const signUpForm = document.querySelector(".sign-up form");
    const signInForm = document.querySelector(".sign-in form");

    // Function to hash password using SHA-256
    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer))
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");
    }

    // Sign-Up Form Submission
    signUpForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = signUpForm.querySelector("input[placeholder='Name']").value;
        const email = signUpForm.querySelector("input[placeholder='Email']").value;
        const password = signUpForm.querySelector("input[placeholder='Password']").value;

        if (name && email && password) {
            const hashedPassword = await hashPassword(password); // Hash password before storing
            localStorage.setItem(email, JSON.stringify({ name, email, password: hashedPassword }));
            alert("Account created successfully! You can now sign in.");
            signUpForm.reset();
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Sign-In Form Submission
    signInForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = signInForm.querySelector("input[placeholder='Email']").value;
        const password = signInForm.querySelector("input[placeholder='Password']").value;

        const storedUser = localStorage.getItem(email);
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            const hashedInputPassword = await hashPassword(password); // Hash input password

            if (userData.password === hashedInputPassword) {
                alert("Login successful! Redirecting to dashboard...");
                localStorage.setItem("loggedInUser", email);
                window.location.href = "/dashboard/student/dashboard.html"; // Redirect to dashboard
            } else {
                alert("Incorrect password.");
            }
        } else {
            alert("User not found. Please sign up.");
        }
    });
});
