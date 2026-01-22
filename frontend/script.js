// --- FINAL: Central API URL Configuration for Deployment ---
// This now points to your live backend server on Render.
const API_BASE_URL = 'https://portfolio-fullstack-1-5bvh.onrender.com';


// This code executes after the window loads, ensuring all HTML elements are available.
window.onload = function () {

    // =================================================================
    // SECTION 1: INITIAL SETUP & VARIABLE DECLARATIONS
    // =================================================================

    // --- Typed.js Setup ---
    new Typed(".role", {
        strings: [
            "Full Stack Developer", "Web Developer", "UI/UX Designer", "Backend Developer", "Coder"
        ],
        loop: true,
        typeSpeed: 100,
        backSpeed: 80,
        backDelay: 1000
    });

    // --- Three.js Setup ---
    const canvasContainer = document.querySelector('.hero-section-right');
    const canvas = document.getElementById('threeJsCanvas');
    let width = canvasContainer ? canvasContainer.clientWidth : 0;
    let height = canvasContainer ? canvasContainer.clientHeight : 0;
    
    let scene, camera, renderer, pointCloud;

    if (canvas) {
        canvas.width = width;
        canvas.height = height;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        camera.position.z = 200;

        // --- Particle Creation ---
        const particleCount = 2000;
        const particles = new THREE.BufferGeometry();
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
        
        pointCloud = new THREE.Points(particles, particleMaterial);
        scene.add(pointCloud);
    }


    // =================================================================
    // SECTION 2: FUNCTION DEFINITIONS
    // =================================================================

    // --- Animation Loop Function ---
    function animate() {
        if (pointCloud) {
            requestAnimationFrame(animate);
            pointCloud.rotation.y += 0.0005;
            pointCloud.rotation.x += 0.0002;
            camera.position.z -= 0.1;
            if (camera.position.z < -1000) {
                camera.position.z = 2000;
            }
            renderer.render(scene, camera);
        }
    }

    // --- Window Resize Function ---
    function onWindowResize() {
        if (canvasContainer && renderer) {
            width = canvasContainer.clientWidth;
            height = canvasContainer.clientHeight;
            renderer.setSize(width, height);
            canvas.width = width;
            canvas.height = height;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        }
    }

 // --- Contact Form Submission Handler ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // 1. Get the elements
        const nameEl = document.getElementById('contactName');
        const emailEl = document.getElementById('contactEmail');
        const subjectEl = document.getElementById('contactSubject');
        const messageEl = document.getElementById('contactMessage');
        const statusEl = document.getElementById('contact-form-message');

        // 2. CHECK: Ensure all required elements were found in the DOM
        if (!nameEl || !emailEl || !subjectEl || !messageEl || !statusEl) {
            console.error("Critical Error: One or more contact form elements are missing from the HTML.");
            // OPTIONAL: Add a visual message if statusEl exists
            if (statusEl) {
                statusEl.textContent = 'Setup error: Could not find all necessary form fields.';
                statusEl.style.color = 'red';
            }
            return; // Stop execution if elements are missing
        }

        // 3. Extract the values (now safe to access .value)
        const name = nameEl.value;
        const email = emailEl.value;
        const subject = subjectEl.value;
        const message = messageEl.value;

        // ... rest of your existing fetch and error handling logic ...

        try {
            // UPDATED: Now uses the live API URL
            const response = await fetch(`${API_BASE_URL}/api/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message }),
            });

            if (!response.ok) {
                throw new Error(`Server error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            statusEl.textContent = "Message sent successfully!";
            statusEl.style.color = 'lightgreen';
            console.log('Message sent:', result);
            contactForm.reset();

        } catch (error) {
            statusEl.textContent = 'Error sending message. Please try again.';
            statusEl.style.color = 'red';
            console.error('Error sending message:', error);
        }
    });
}

    // =================================================================
    // SECTION 3: EVENT LISTENERS & INITIAL CALLS
    // =================================================================

    window.addEventListener('resize', onWindowResize, false);
    
    const downloadButton = document.getElementById('button');
    if(downloadButton) {
        downloadButton.addEventListener('click', function() {
            console.log("Download CV button clicked.");
        });
    }

    // --- Start the App ---
    if (canvas) {
        animate(); // Start the animation only if the canvas exists
    }
};

document.getElementById("button").addEventListener("click", function () {
    const link = document.createElement("a");
    link.href = "./webdev.pdf";
    link.download = "Sonu_Saw_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
