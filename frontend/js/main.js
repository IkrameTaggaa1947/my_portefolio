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
                <a href="${project.demo_url}" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
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
        {
            id: 1,
            title: 'BCI - Brain-Computer Interface',
            description: 'Used LDA unsupervised learning model and signal processing on brain-computer interface (BCI) to predict user intentions and enable real-time control of assistive devices for disabled people.',
            tags: ['Python', 'LDA', 'Signal Processing', 'BCI'],
            icon: 'fa-brain',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 2,
            title: 'House Price Prediction',
            description: 'Developed a U.S. housing price prediction model using XGBoost after applying LDA. The model was deployed with MLflow and integrated into a Streamlit web application for interactive real-time inference.',
            tags: ['Python', 'XGBoost', 'MLflow', 'Streamlit'],
            icon: 'fa-home',
            demo_url: '#',
            github_url: 'https://github.com/IkrameTaggaa1947/House-Prediction-Model'
        },
        {
            id: 3,
            title: 'AI-Driven Solutions for Robots',
            description: 'Built an AI-based inverse kinematics module for a SCARA robot, testing multiple models (linear regression, KNN, neural networks). Additionally, developed both an object detection and instance segmentation system for a bottle shredder to identify and process plastic bottles using YOLOv8.',
            tags: ['Python', 'YOLOv8', 'Neural Networks', 'Robotics'],
            icon: 'fa-robot',
            demo_url: '#',
            github_url: 'https://github.com/IkrameTaggaa1947/Double_Segementation_Water_Level'
        },
        {
            id: 4,
            title: 'Hand Gesture Recognition',
            description: 'Worked on a project that built an interface to control a laptop using real-time hand gestures, using MediaPipe for hand landmark detection and a TensorFlow Lite classifier to map gestures to system actions.',
            tags: ['Python', 'MediaPipe', 'TensorFlow Lite', 'Computer Vision'],
            icon: 'fa-hand-paper',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 5,
            title: 'Accounting Closing Process - OCP Group',
            description: 'Developed a web application for OCP to digitalize the accounting closing process, making it easy for the team manager to track task completion, receive automated reminders, and ensure all steps are completed before month-end.',
            tags: ['Web Development', 'Task Management', 'Automation'],
            icon: 'fa-calculator',
            demo_url: '#',
            github_url: 'https://github.com/IkrameTaggaa1947/Accounting-Management-Web-App'
        },
        {
            id: 6,
            title: 'Palm Trace - DomSeeds',
            description: 'Contributed temporarily to the development of a web-based traceability system for date palm trees to enhance the use of existing agricultural data for yield prediction models to help in decision-making.',
            tags: ['Web Development', 'Agriculture', 'Traceability', 'Prediction'],
            icon: 'fa-tree',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 7,
            title: 'Medical Chatbot',
            description: 'Provides health-related answers by combining large language models with trusted medical encyclopedia data.',
            tags: ['Python', 'RAG', 'Streamlit', 'LLM'],
            icon: 'fa-heartbeat',
            demo_url: '#',
            github_url: 'https://github.com/IkrameTaggaa1947/Medical-Chatbot-Using-LLM-'
        },
        {
            id: 8,
            title: 'AI Trip Planner',
            description: 'A travel assistant that integrates Streamlit and LangGraph to deliver dynamic itinerary planning.',
            tags: ['Python', 'Streamlit', 'LangGraph', 'Gen AI'],
            icon: 'fa-plane',
            demo_url: '#',
            github_url: 'https://github.com/IkrameTaggaa1947/AI_Trip_Planner'
        },
        {
            id: 9,
            title: 'Book Recommendation',
            description: 'Finds your next read based on the specific story you want to experience, not just genres.',
            tags: ['Python', 'RAG', 'Streamlit', 'NLP'],
            icon: 'fa-book',
            demo_url: '#',
            github_url: 'https://github.com/IkrameTaggaa1947/Book_Recommendation_application-'
        }
    ];

    const projectsGrid = document.getElementById('projectsGrid');
    staticProjects.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsGrid.appendChild(projectCard);
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessage = contactForm.querySelector('.form-message');

    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
    formMessage.style.display = 'none';

    try {
        const data = await apiCall(API_CONFIG.ENDPOINTS.CONTACT, {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        if (data.success) {
            formMessage.textContent = data.message;
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            contactForm.reset();
        }
    } catch (error) {
        formMessage.textContent = error.message || 'An error occurred. Please try again later.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
    } finally {
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
    }
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

function toggleChatbot() {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
    }
}

chatbotToggle.addEventListener('click', toggleChatbot);
chatbotClose.addEventListener('click', toggleChatbot);

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function sendMessage() {
    const userMessage = chatbotInput.value.trim();

    if (userMessage) {
        // Add user message
        addMessage(userMessage, true);

        // Clear input
        chatbotInput.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing';
        typingDiv.innerHTML = '<i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i>';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        try {
            const data = await apiCall(API_CONFIG.ENDPOINTS.CHATBOT, {
                method: 'POST',
                body: JSON.stringify({ message: userMessage })
            });

            // Remove typing indicator
            typingDiv.remove();

            if (data.success) {
                addMessage(data.response);
            }
        } catch (error) {
            // Remove typing indicator
            typingDiv.remove();
            addMessage('Sorry, I encountered an error. Please try again.');
        }
    }
}

chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

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
