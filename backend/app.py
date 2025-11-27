from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
import logging
from datetime import datetime

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Email configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')

mail = Mail(app)

# Chatbot knowledge base
CHATBOT_KNOWLEDGE = {
    'skills': {
        'keywords': ['skills', 'expertise', 'technologies', 'know', 'proficient', 'good at'],
        'response': "Ikrame is proficient in Python, R, SQL, Machine Learning, Deep Learning, Data Visualization (Tableau, Power BI), Statistical Analysis, and various ML frameworks like TensorFlow, PyTorch, and Scikit-learn."
    },
    'experience': {
        'keywords': ['experience', 'years', 'work', 'background', 'career'],
        'response': "Ikrame has over 3 years of experience in data science and analytics, working on projects ranging from predictive modeling to computer vision and NLP applications."
    },
    'projects': {
        'keywords': ['projects', 'portfolio', 'work samples', 'built', 'created', 'developed'],
        'response': "Ikrame has worked on diverse projects including healthcare predictive analytics, customer segmentation dashboards, sentiment analysis engines, financial forecasting systems, and computer vision classification models. Check out the Projects section for more details!"
    },
    'certifications': {
        'keywords': ['certifications', 'certified', 'credentials', 'certificates'],
        'response': "Ikrame holds certifications from DataCamp (Professional Data Scientist), Google (Data Analytics), AWS (Machine Learning), IBM (Python for Data Science), HackerRank (SQL Advanced), and Tableau (Desktop Specialist)."
    },
    'contact': {
        'keywords': ['contact', 'email', 'reach', 'phone', 'message', 'hire', 'available'],
        'response': "You can reach Ikrame at ikrame.taggaa@example.com or call +212 6XX XXX XXX. You can also use the contact form on this website or connect on LinkedIn and GitHub!"
    },
    'education': {
        'keywords': ['education', 'university', 'degree', 'study', 'studied'],
        'response': "Ikrame studied at Université Mohammed VI Polytechnique, specializing in Data Science and Analytics."
    },
    'tools': {
        'keywords': ['tools', 'software', 'platforms', 'use'],
        'response': "Ikrame uses a variety of tools including Python (Pandas, NumPy, Scikit-learn), R, SQL, Tableau, Power BI, TensorFlow, PyTorch, Jupyter, Git, and cloud platforms like AWS."
    },
    'greeting': {
        'keywords': ['hello', 'hi', 'hey', 'greetings'],
        'response': "Hello! How can I help you learn more about Ikrame's data science expertise?"
    }
}


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat()
    }), 200


@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()

        # Validate input
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message_text = data.get('message', '').strip()

        if not all([name, email, message_text]):
            return jsonify({
                'success': False,
                'message': 'All fields are required'
            }), 400

        # Create email message
        msg = Message(
            subject=f'Portfolio Contact: Message from {name}',
            recipients=[
                os.getenv('RECIPIENT_EMAIL', 'ikrame.taggaa@example.com')],
            body=f"""
New message from portfolio website:

Name: {name}
Email: {email}

Message:
{message_text}

---
Sent at: {datetime.utcnow().isoformat()}
            """
        )

        # Send email
        try:
            if app.config['MAIL_USERNAME'] and app.config['MAIL_USERNAME'] != 'your-email@gmail.com':
                mail.send(msg)
                logger.info(f"Email sent for contact from {name} ({email})")
            else:
                logger.info(
                    f"Email not configured. Contact form submitted by {name} ({email})")
        except Exception as mail_error:
            logger.warning(
                f"Failed to send email: {str(mail_error)}. Contact form data logged.")
            logger.info(f"Contact from {name} ({email}): {message_text}")

        return jsonify({
            'success': True,
            'message': 'Thank you for your message! I will get back to you soon.'
        }), 200

    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred. Please try again later.'
        }), 500


@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """Handle chatbot queries"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip().lower()

        if not user_message:
            return jsonify({
                'success': False,
                'message': 'Message is required'
            }), 400

        # Find matching response
        response = get_bot_response(user_message)

        return jsonify({
            'success': True,
            'response': response
        }), 200

    except Exception as e:
        logger.error(f"Error processing chatbot query: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'An error occurred. Please try again.'
        }), 500


def get_bot_response(user_message):
    """Get chatbot response based on user message"""
    # Check each knowledge category
    for category, data in CHATBOT_KNOWLEDGE.items():
        if any(keyword in user_message for keyword in data['keywords']):
            return data['response']

    # Default response
    return "I can help you with questions about Ikrame's skills, experience, projects, certifications, education, and how to contact her. What would you like to know?"


@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Get list of projects"""
    projects = [
        {
            'id': 1,
            'title': 'BCI - Brain-Computer Interface',
            'description': 'Used LDA unsupervised learning model and signal processing on brain-computer interface (BCI) to predict user intentions and enable real-time control of assistive devices for disabled people.',
            'tags': ['Python', 'LDA', 'Signal Processing', 'BCI'],
            'icon': 'fa-brain',
            'demo_url': '#',
            'github_url': '#'
        },
        {
            'id': 2,
            'title': 'House Price Prediction',
            'description': 'Developed a U.S. housing price prediction model using XGBoost after applying LDA. The model was deployed with MLflow and integrated into a Streamlit web application for interactive real-time inference.',
            'tags': ['Python', 'XGBoost', 'MLflow', 'Streamlit'],
            'icon': 'fa-home',
            'demo_url': '#',
            'github_url': 'https://github.com/IkrameTaggaa1947/House-Prediction-Model'
        },
        {
            'id': 3,
            'title': 'AI-Driven Solutions for Robots',
            'description': 'Built an AI-based inverse kinematics module for a SCARA robot, testing multiple models (linear regression, KNN, neural networks). Additionally, developed both an object detection and instance segmentation system for a bottle shredder to identify and process plastic bottles using YOLOv8.',
            'tags': ['Python', 'YOLOv8', 'Neural Networks', 'Robotics'],
            'icon': 'fa-robot',
            'demo_url': '#',
            'github_url': 'https://github.com/IkrameTaggaa1947/Double_Segementation_Water_Level'
        },
        {
            'id': 4,
            'title': 'Hand Gesture Recognition',
            'description': 'Worked on a project that built an interface to control a laptop using real-time hand gestures, using MediaPipe for hand landmark detection and a TensorFlow Lite classifier to map gestures to system actions.',
            'tags': ['Python', 'MediaPipe', 'TensorFlow Lite', 'Computer Vision'],
            'icon': 'fa-hand-paper',
            'demo_url': '#',
            'github_url': '#'
        },
        {
            'id': 5,
            'title': 'Accounting Closing Process - OCP Group',
            'description': 'Developed a web application for OCP to digitalize the accounting closing process, making it easy for the team manager to track task completion, receive automated reminders, and ensure all steps are completed before month-end.',
            'tags': ['Web Development', 'Task Management', 'Automation'],
            'icon': 'fa-calculator',
            'demo_url': '#',
            'github_url': 'https://github.com/IkrameTaggaa1947/Accounting-Management-Web-App'
        },
        {
            'id': 6,
            'title': 'Palm Trace - DomSeeds',
            'description': 'Contributed temporarily to the development of a web-based traceability system for date palm trees to enhance the use of existing agricultural data for yield prediction models to help in decision-making.',
            'tags': ['Web Development', 'Agriculture', 'Traceability', 'Prediction'],
            'icon': 'fa-tree',
            'demo_url': '#',
            'github_url': '#'
        },
        {
            'id': 7,
            'title': 'Medical Chatbot',
            'description': 'Provides health-related answers by combining large language models with trusted medical encyclopedia data.',
            'tags': ['Python', 'RAG', 'Streamlit', 'LLM'],
            'icon': 'fa-heartbeat',
            'demo_url': '#',
            'github_url': 'https://github.com/IkrameTaggaa1947/Medical-Chatbot-Using-LLM-'
        },
        {
            'id': 8,
            'title': 'AI Trip Planner',
            'description': 'A travel assistant that integrates Streamlit and LangGraph to deliver dynamic itinerary planning.',
            'tags': ['Python', 'Streamlit', 'LangGraph', 'Gen AI'],
            'icon': 'fa-plane',
            'demo_url': '#',
            'github_url': 'https://github.com/IkrameTaggaa1947/AI_Trip_Planner'
        },
        {
            'id': 9,
            'title': 'Book Recommendation',
            'description': 'Finds your next read based on the specific story you want to experience, not just genres.',
            'tags': ['Python', 'RAG', 'Streamlit', 'NLP'],
            'icon': 'fa-book',
            'demo_url': '#',
            'github_url': 'https://github.com/IkrameTaggaa1947/Book_Recommendation_application-'
        }
    ]

    return jsonify({
        'success': True,
        'projects': projects
    }), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'message': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'message': 'Internal server error'
    }), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'

    logger.info(f"Starting Flask server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)
