// Tab Switching (Login/Signup)
document.getElementById('show-signup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('signup-form').classList.remove('hidden');
});

// Simulate Google Login (optional for now)
document.querySelector('.btn-google').addEventListener('click', (e) => {
    e.preventDefault();
    alert("Google login will work after backend setup");
});

// Handle Email Login Form
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const message = await res.text();
        if (res.ok) {
            alert("✅ " + message);
            // You can redirect to dashboard if needed:
            // window.location.href = "dashboard.html";
        } else {
            alert("❌ " + message);
        }
    } catch (err) {
        alert("❌ Login error: " + err.message);
    }
});

// Handle Signup Form
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const message = await res.text();
        if (res.ok) {
            alert("✅ " + message);
            document.getElementById('login-form').classList.remove('hidden');
            document.getElementById('signup-form').classList.add('hidden');
        } else {
            alert("❌ " + message);
        }
    } catch (err) {
        alert("❌ Signup error: " + err.message);
    }
});
