// This code executes after the window loads, ensuring the canvas element is available.
window.onload = function () {
    // --- 1. Typed.js for Role Animation ---
    // Initializes the text typing and backspacing effect in the hero section.
    var typeData = new Typed(".role", {
        strings: [
            "Full Stack Developer",
            "Web Developer",
            "UI/UX Designer",
            "Backend Developer",
            "Coder"
        ],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 1000
    });

    // --- 2. Three.js for Particle Background ---
    const canvasContainer = document.querySelector('.hero-section-right');
    const canvas = document.getElementById('threeJsCanvas');
    
    // Initial size setup
    let width = canvasContainer.clientWidth;
    let height = canvasContainer.clientHeight;
    
    // Set initial canvas size based on container
    canvas.width = width;
    canvas.height = height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Camera position for particle system (pushed back into the scene)
    camera.position.z = 200;

    // --- Particle Setup ---
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const color1 = new THREE.Color(0x1d3557); // Dark Blue
    const color2 = new THREE.Color(0xe63946); // Accent Orange

    for (let i = 0; i < particleCount; i++) {
        // Random position for particles in a large 3D volume
        positions.push(Math.random() * 4000 - 2000); // X
        positions.push(Math.random() * 4000 - 2000); // Y
        positions.push(Math.random() * 4000 - 2000); // Z
        
        // Assign color (blended between the two main theme colors)
        const color = color1.clone().lerp(color2, Math.random());
        colors.push(color.r, color.g, color.b);
    }

    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8
    });
    
    const pointCloud = new THREE.Points(particles, particleMaterial);
    scene.add(pointCloud);

    // --- Animation Loop ---
    function animate() {
        requestAnimationFrame(animate);

        // Subtle rotation for a dynamic background effect
        pointCloud.rotation.y += 0.0005;
        pointCloud.rotation.x += 0.0002;
        
        // Camera movement to create a slow, floating effect
        camera.position.z -= 0.1;
        if (camera.position.z < -1000) {
            camera.position.z = 2000; // Reset camera position when it moves too far
        }
        
        renderer.render(scene, camera);
    }

    // Handle window resize for responsiveness
    function onWindowResize() {
        // Get new dimensions from the container
        width = canvasContainer.clientWidth;
        height = canvasContainer.clientHeight;

        // Update canvas and renderer size
        renderer.setSize(width, height);
        canvas.width = width;
        canvas.height = height;

        // Update camera aspect ratio
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', onWindowResize, false);
    
    // Start the animation loop
    animate();

    // --- 3. Simple Button Logic ---
    document.getElementById('button').addEventListener('click', function() {
        // In a real application, you would trigger a file download here.
        console.log("Download CV button clicked. Please implement actual file download logic.");
    });
};
// This code executes after the window loads, ensuring all HTML elements are available.
window.onload = function () {

    // =================================================================
    // SECTION 1: INITIAL SETUP & VARIABLE DECLARATIONS
    // =================================================================

    // --- Typed.js Setup ---
    new Typed(".role", {
        strings: [
            "Full Stack Developer",
            "Web Developer",
            "UI/UX Designer",
            "Backend Developer",
            "Coder"
        ],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 1000
    });

    // --- Three.js Setup ---
    const canvasContainer = document.querySelector('.hero-section-right');
    const canvas = document.getElementById('threeJsCanvas');
    let width = canvasContainer.clientWidth;
    let height = canvasContainer.clientHeight;
    
    canvas.width = width;
    canvas.height = height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 200;

    // --- Particle Creation (Ensure this comes BEFORE pointCloud) ---
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry(); // 'particles' is DEFINED here
    const positions = [];
    const colors = [];
    const color1 = new THREE.Color(0x1d3557);
    const color2 = new THREE.Color(0xe63946);

    for (let i = 0; i < particleCount; i++) {
        positions.push(Math.random() * 4000 - 2000, Math.random() * 4000 - 2000, Math.random() * 4000 - 2000);
        const color = color1.clone().lerp(color2, Math.random());
        colors.push(color.r, color.g, color.b);
    }

    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8
    });
    
    const pointCloud = new THREE.Points(particles, particleMaterial); // 'particles' is USED here
    scene.add(pointCloud);


    // =================================================================
    // SECTION 2: FUNCTION DEFINITIONS
    // (We define all our functions here before we use them)
    // =================================================================

    // --- Animation Loop Function ---
    function animate() {
        requestAnimationFrame(animate);
        pointCloud.rotation.y += 0.0005;
        pointCloud.rotation.x += 0.0002;
        camera.position.z -= 0.1;
        if (camera.position.z < -1000) {
            camera.position.z = 2000;
        }
        renderer.render(scene, camera);
    }

    // --- Window Resize Function ---
    function onWindowResize() {
        width = canvasContainer.clientWidth;
        height = canvasContainer.clientHeight;
        renderer.setSize(width, height);
        canvas.width = width;
        canvas.height = height;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    }

    // --- Backend Data Fetching Function ---
    async function getUsers() {
        try {
            const response = await fetch('http://localhost:3000/api/users');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const users = await response.json();
            console.log('Successfully fetched users from backend:', users);
        } catch (error) {
            console.error('Could not fetch users from the backend:', error);
        }
    }

    // --- Contact Form Submission Handler ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Stop the form from reloading the page

            // Get values from the form inputs
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;
            const statusEl = document.getElementById('form-status');

            try {
                // Send data to the /api/messages endpoint
                const response = await fetch('http://localhost:3000/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message }),
                });

                if (!response.ok) {
                    // If server responds with an error, show it
                    throw new Error(`Server error! Status: ${response.status}`);
                }
                
                const result = await response.json();
                statusEl.textContent = "Message sent successfully!";
                statusEl.style.color = 'lightgreen'; // Use a visible color
                console.log('Message sent:', result);
                contactForm.reset(); // Clear the form fields

            } catch (error) {
                statusEl.textContent = 'Error sending message. Please try again.';
                statusEl.style.color = 'red';
                console.error('Error sending message:', error);
            }
        });
    }


    // =================================================================
    // SECTION 3: EVENT LISTENERS & INITIAL CALLS
    // (This is the last step, where we start everything)
    // =================================================================

    window.addEventListener('resize', onWindowResize, false);
    
    document.getElementById('button').addEventListener('click', function() {
        console.log("Download CV button clicked.");
    });


    // --- Start the App ---
    animate(); // Start the animation
    getUsers(); // Fetch initial data (for admin testing, not shown to users)

};



