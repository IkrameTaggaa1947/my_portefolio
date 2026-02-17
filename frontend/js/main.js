// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Particles Animation - Space Stars Effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    // Create twinkling stars
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';

        // Random size for stars
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        particlesContainer.appendChild(star);
    }

    // Create shooting stars
    const shootingStarCount = 5;

    for (let i = 0; i < shootingStarCount; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'star shooting';
        shootingStar.style.left = Math.random() * 50 + '%';
        shootingStar.style.top = Math.random() * 50 + '%';
        shootingStar.style.animationDelay = Math.random() * 5 + 's';
        shootingStar.style.animationDuration = (Math.random() * 2 + 2) + 's';

        particlesContainer.appendChild(shootingStar);
    }
}

// Call on page load
createParticles();

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Load Projects from API
async function loadProjects() {
    // For static deployment, use static projects directly
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        loadStaticProjects();
        return;
    }

    try {
        const data = await apiCall(API_CONFIG.ENDPOINTS.PROJECTS);

        if (data.success && data.projects) {
            const projectsGrid = document.getElementById('projectsGrid');
            projectsGrid.innerHTML = '';

            data.projects.forEach((project, index) => {
                const projectCard = createProjectCard(project, index);
                projectsGrid.appendChild(projectCard);
            });
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to static projects if API fails
        loadStaticProjects();
    }
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index % 3) * 100);

    // Project image mapping
    const projectImages = {
        'BCI - Brain-Computer Interface': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop',
        'House Price Prediction': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
        'AI-Driven Solutions for Robots': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop',
        'Hand Gesture Recognition': 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=400&h=250&fit=crop',
        'Accounting Closing Process - OCP Group': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
        'Palm Trace - DomSeeds': 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=400&h=250&fit=crop',
        'Medical Chatbot': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop',
        'AI Trip Planner': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
        'Book Recommendation': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop'
    };

    const imageUrl = projectImages[project.title] || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop';

    card.innerHTML = `
        <div class="project-image">
            <img src="${imageUrl}" alt="${project.title}" class="project-img">
            <div class="project-overlay">
                <i class="fas ${project.icon}"></i>
            </div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github_url}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
            </div>
        </div>
    `;
    return card;
}

function loadStaticProjects() {
    const staticProjects = [
        // Bioinformatics & Healthcare Projects
        {
            id: 1,
            title: 'ECG-Based Heart Disease Detection Platform',
            description: 'Developed an end-to-end web platform for cardiac anomaly detection where doctors upload ECG signals and patient clinical data (age, sex, weight, etc.) to receive automated diagnostic insights. Implemented a machine-learning pipeline using Random Forest for initial clustering followed by Random Forest classification on embedded ECG features, and explored a deep learning approach based on Transformers. Integrated a patient-facing chatbot to provide real-time, personalized health information.',
            tags: ['Python', 'ECG', 'Random Forest', 'Transformers', 'Chatbot'],
            icon: 'fa-heartbeat',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 2,
            title: 'NeuraTech – Brain-Computer Interface (BCI) Healthcare Startup',
            description: 'Developed under the supervision of a multidisciplinary research team and mentored through the MIT Sandbox Explorer Program, NeuraTech focused on decoding motor intent from EEG signals for assistive communication. Implemented an LDA-based model to classify left- vs right-hand motor imagery using µ- and β-band filtering, ICA-based artifact removal, and CSP feature extraction, enabling a real-time adaptive interface for paralyzed, non-verbal patients.',
            tags: ['Python', 'EEG', 'LDA', 'CSP', 'Healthcare'],
            icon: 'fa-brain',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 3,
            title: 'Medical Chatbot',
            description: 'Provides health-related answers by combining LLMs with a medical encyclopedia data. Solved hallucinations with recursive chunking and strict RAG constraints, improved accuracy with R.I.S.E. prompting, and implemented safety checks for sensitive queries.',
            tags: ['Python', 'LLM', 'RAG', 'Prompt Engineering'],
            icon: 'fa-comments-medical',
            demo_url: '#',
            github_url: 'https://github.com/IkrameTaggaa1947/Medical-Chatbot-Using-LLM-'
        },
        // Robotics & Computer Vision
        {
            id: 4,
            title: 'Automated Plastic Waste Sorting – Computer Vision & Robotics',
            description: 'Developed a pipeline to detect water bottles, verify they are uncapped and empty, and trigger their delivery to a robotic shredder. Applied instance segmentation (YOLOv8) for bottle detection and classification (ResNet) to identify water brands, enabling real-time statistical tracking of shredded bottles.',
            tags: ['Python', 'YOLOv8', 'ResNet', 'Robotics', 'Computer Vision'],
            icon: 'fa-recycle',
            demo_url: '#',
            github_url: '#'
        },
        // Other Projects
        {
            id: 5,
            title: 'Secure AI Platform for Safran – Chatbot & Training Evaluation Analytics',
            description: 'Developed a secure internal chatbot using a RAG architecture to answer general employee queries from internal documentation, with anonymization, authentication, Dockerized deployment, and Apache Airflow for automatic data ingestion and embedding. In parallel, built an application for training evaluation tracking, displaying anonymized employee feedback and applying clustering models to group qualitative returns into actionable themes.',
            tags: ['Python', 'RAG', 'Docker', 'Airflow', 'Clustering'],
            icon: 'fa-shield-alt',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 6,
            title: 'Accounting Closing Process – OCP Group',
            description: 'A web application for OCP to digitalize the accounting closing process, to track task completion, receive automated reminders, and ensure all steps are completed before month-end. Used HTML, CSS, and PHP.',
            tags: ['HTML', 'CSS', 'PHP', 'Web App'],
            icon: 'fa-calculator',
            github_url: 'https://github.com/IkrameTaggaa1947/Accounting-Management-Web-App'
        },
        {
            id: 7,
            title: 'Palm Trace - DomSeeds',
            description: 'A traceability web application for date palm trees that leverages agricultural data to analyze yield and monitor farm health. Used React and PostgreSQL (inside Lovable) to build an interactive map showing regions, tree blocks, and individual trees, alongside dashboards displaying KPIs.',
            tags: ['React', 'PostgreSQL', 'Traceability', 'Dashboard'],
            icon: 'fa-tree',
            github_url: '#'
        }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    staticProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });
}

// Contact Form removed - using direct contact info instead

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});
