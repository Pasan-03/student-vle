// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/students/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            document.getElementById('loginMessage').textContent = result.message;
            if (response.ok) {
                window.location.href = 'login-success.html'; // Redirect on successful login
            }
        } else {
            const text = await response.text();
            document.getElementById('loginMessage').textContent = 'Unexpected response format: ' + text;
        }
    } catch (error) {
        document.getElementById('loginMessage').textContent = 'Error: ' + error.message;
    }
});

// Handle registration form submission
document.getElementById('registerForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('registerName').value;
    const grade = document.getElementById('registerGrade').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/api/students/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, grade, email, password })
        });

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
            document.getElementById('registerMessage').textContent = result.message;
            if (response.ok) {
                window.location.href = 'index.html'; // Redirect to index.html on successful registration
            }
        } else {
            const text = await response.text();
            document.getElementById('registerMessage').textContent = 'Unexpected response format: ' + text;
        }
    } catch (error) {
        document.getElementById('registerMessage').textContent = 'Error: ' + error.message;
    }
});
