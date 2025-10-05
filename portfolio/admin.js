document.addEventListener('DOMContentLoaded', () => {

    const loginSection = document.getElementById('login-section');
    const messagesSection = document.getElementById('messages-section');
    const loginForm = document.getElementById('loginForm');
    const statusMessage = document.getElementById('status-message');
    const messagesContainer = document.getElementById('messages-container');
    const logoutButton = document.getElementById('logoutButton');

    // --- 1. CHECK IF USER IS ALREADY LOGGED IN ---
    const token = sessionStorage.getItem('authToken');
    if (token) {
        loginSection.style.display = 'none';
        messagesSection.style.display = 'block';
        fetchMessages();
    }

    // --- 2. LOGIN FORM LOGIC ---
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.msg || 'Login failed');
            sessionStorage.setItem('authToken', data.token);
            loginSection.style.display = 'none';
            messagesSection.style.display = 'block';
            fetchMessages();
        } catch (error) {
            statusMessage.textContent = `Error: ${error.message}`;
            statusMessage.style.color = 'red';
        }
    });

    // --- 3. FETCH AND DISPLAY MESSAGES LOGIC ---
    async function fetchMessages() {
        const token = sessionStorage.getItem('authToken');
        if (!token) return;
        try {
            const response = await fetch('http://localhost:3000/api/messages', {
                headers: { 'x-auth-token': token },
            });
            const messages = await response.json();
            if (!response.ok) throw new Error(messages.msg || 'Could not fetch messages.');
            
            messagesContainer.innerHTML = '';
            if (messages.length === 0) {
                messagesContainer.innerHTML = '<p>No messages yet.</p>';
                return;
            }

            messages.forEach(message => {
                const messageCard = document.createElement('div');
                messageCard.className = 'message-card';
                // --- UPDATED: Added the delete button with a data-id attribute ---
                messageCard.innerHTML = `
                    <button class="delete-btn" data-id="${message._id}">Delete</button>
                    <h3>${message.subject}</h3>
                    <div class="message-meta">
                        <p><strong>From:</strong> ${message.name} (${message.email})</p>
                        <p><strong>Received:</strong> ${new Date(message.date).toLocaleString()}</p>
                    </div>
                    <p>${message.message}</p>
                `;
                messagesContainer.appendChild(messageCard);
            });
        } catch (error) {
             if (error.message.includes('not valid') || error.message.includes('denied')) {
                sessionStorage.removeItem('authToken');
                location.reload();
            }
            messagesContainer.innerHTML = `<p style="color: red;">${error.message}</p>`;
        }
    }
    
    // --- 4. NEW: EVENT LISTENER FOR DELETE BUTTONS ---
    messagesContainer.addEventListener('click', async (event) => {
        // We use event delegation to listen for clicks on any delete button
        if (event.target.classList.contains('delete-btn')) {
            const messageId = event.target.dataset.id;
            const token = sessionStorage.getItem('authToken');

            // Use a simple confirm pop-up to prevent accidental deletes
            if (!confirm('Are you sure you want to delete this message forever?')) {
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/messages/${messageId}`, {
                    method: 'DELETE',
                    headers: { 'x-auth-token': token }
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.msg || 'Failed to delete message');

                // If successful, simply remove the message card from the page for instant feedback
                event.target.closest('.message-card').remove();
                
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
    });

    // --- 5. LOGOUT BUTTON LOGIC ---
    logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('authToken');
        location.reload();
    });
});

