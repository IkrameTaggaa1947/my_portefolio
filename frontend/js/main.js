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
            title: 'Healthcare Predictive Analytics',
            description: 'Built a machine learning model to predict patient readmission rates with 92% accuracy, helping hospitals optimize resource allocation.',
            tags: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost'],
            icon: 'fa-heartbeat',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 2,
            title: 'Customer Segmentation Dashboard',
            description: 'Developed an interactive dashboard for e-commerce customer segmentation using clustering algorithms, increasing targeted marketing ROI by 35%.',
            tags: ['Python', 'K-Means', 'Tableau', 'SQL'],
            icon: 'fa-shopping-cart',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 3,
            title: 'Sentiment Analysis Engine',
            description: 'Created a real-time sentiment analysis tool for social media monitoring using NLP techniques and deep learning models.',
            tags: ['Python', 'NLTK', 'TensorFlow', 'BERT'],
            icon: 'fa-comments',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 4,
            title: 'Financial Forecasting System',
            description: 'Implemented time-series forecasting models for stock market prediction using LSTM networks and ensemble methods.',
            tags: ['Python', 'PyTorch', 'LSTM', 'Prophet'],
            icon: 'fa-chart-pie',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 5,
            title: 'Computer Vision Classification',
            description: 'Designed a convolutional neural network for image classification achieving 95% accuracy on custom dataset with data augmentation techniques.',
            tags: ['Python', 'TensorFlow', 'CNN', 'OpenCV'],
            icon: 'fa-image',
            demo_url: '#',
            github_url: '#'
        },
        {
            id: 6,
            title: 'Recommendation System',
            description: 'Built a hybrid recommendation engine combining collaborative and content-based filtering for personalized user experiences.',
            tags: ['Python', 'Surprise', 'Matrix Factorization', 'Flask'],
            icon: 'fa-robot',
            demo_url: '#',
            github_url: '#'
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
