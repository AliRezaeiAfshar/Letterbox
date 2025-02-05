// Function to make authenticated requests
async function makeAuthenticatedRequest(url, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (response.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
    }

    return response;
}

// Example usage
async function fetchDashboardData() {
    try {
        const response = await makeAuthenticatedRequest('/api/dashboard');
        const data = await response.json();
        // Handle the data
    } catch (error) {
        console.error('Error:', error);
    }
}