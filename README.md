# Data Science Portfolio Website

A modern, professional portfolio website for showcasing data science and analytics projects, built with a clean architecture separating frontend and backend concerns.

## 🚀 Features

- **Modern Design**: Clean, responsive UI with smooth animations
- **Interactive AI Chatbot**: Personalized assistant to answer questions about skills and experience
- **Project Showcase**: Grid layout for displaying data science projects with tech stack tags
- **Contact Form**: Functional contact form with email integration
- **Professional Certifications**: Display of credentials and certifications
- **Testimonials Slider**: Auto-rotating carousel for client feedback
- **Responsive**: Fully responsive design for desktop and mobile devices

## 📁 Project Structure

```
my_portfolio/
├── backend/                # Flask backend server
│   ├── app.py             # Main application file
│   ├── requirements.txt   # Python dependencies
│   └── .env.example       # Environment variables template
├── frontend/              # Static frontend files
│   ├── index.html         # Main HTML file
│   ├── css/
│   │   └── style.css      # Styles
│   └── js/
│       ├── config.js      # API configuration
│       └── main.js        # Main JavaScript logic
├── .gitignore             # Git ignore file
└── README.md              # This file
```

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- AOS (Animate On Scroll) library
- Font Awesome icons
- Google Fonts (Poppins, Open Sans)

### Backend
- Python 3.8+
- Flask (Web framework)
- Flask-CORS (Cross-origin resource sharing)
- Flask-Mail (Email functionality)
- python-dotenv (Environment variables)

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```powershell
   cd backend
   ```

2. **Create a virtual environment:**
   ```powershell
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   ```powershell
   .\venv\Scripts\Activate
   ```

4. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

5. **Configure environment variables:**
   ```powershell
   Copy-Item .env.example .env
   ```
   
   Then edit `.env` file with your actual values:
   ```env
   FLASK_ENV=development
   PORT=5000
   
   # Email Configuration (Optional - for contact form)
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   RECIPIENT_EMAIL=ikrame.taggaa@example.com
   ```

6. **Run the backend server:**
   ```powershell
   python app.py
   ```

   The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```powershell
   cd frontend
   ```

2. **Serve the frontend** (choose one method):

   **Option A: Using Python's HTTP server:**
   ```powershell
   python -m http.server 3000
   ```

   **Option B: Using Live Server in VS Code:**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"

   The frontend will be available at `http://localhost:3000`

## 🌐 Running the Application

### Development Mode

1. **Start the backend server** (Terminal 1):
   ```powershell
   cd backend
   .\venv\Scripts\Activate
   python app.py
   ```
   Backend runs on: **http://localhost:5000**

2. **Start the frontend server** (Terminal 2):
   ```powershell
   cd frontend
   python -m http.server 3000
   ```
   Frontend runs on: **http://localhost:3000**

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## 📡 API Endpoints

### Backend API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check endpoint |
| `/api/contact` | POST | Submit contact form |
| `/api/chatbot` | POST | Chat with AI assistant |
| `/api/projects` | GET | Get list of projects |

### Example API Calls

**Contact Form:**
```javascript
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Your message here"
}
```

**Chatbot:**
```javascript
POST /api/chatbot
Content-Type: application/json

{
  "message": "What are your skills?"
}
```

## 🎨 Customization

### Update Personal Information

1. **Contact Details** (`frontend/index.html`):
   - Email, phone, location in the contact section
   - Social media links (LinkedIn, GitHub, Twitter, Kaggle)

2. **Projects** (`backend/app.py`):
   - Edit the `projects` array in the `/api/projects` endpoint
   - Add your actual project URLs

3. **Chatbot Knowledge** (`backend/app.py`):
   - Update the `CHATBOT_KNOWLEDGE` dictionary with your information

### Styling

- **Colors**: Modify CSS variables in `frontend/css/style.css`
- **Fonts**: Change Google Fonts imports in `frontend/index.html`
- **Layout**: Adjust grid and flexbox properties in the CSS file

## 📧 Email Configuration

To enable the contact form email functionality:

1. **For Gmail:**
   - Enable 2-Factor Authentication
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Use the app password in your `.env` file

2. **For other providers:**
   - Update `MAIL_SERVER` and `MAIL_PORT` in `.env`
   - Provide credentials

## 🐳 Docker Support (Optional)

Create `Dockerfile` in backend directory:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

Build and run:
```powershell
docker build -t portfolio-backend .
docker run -p 5000:5000 --env-file .env portfolio-backend
```

## 🚀 Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Add `Procfile`:
   ```
   web: gunicorn app:app
   ```

2. Set environment variables on your hosting platform

3. Deploy following platform-specific instructions

### Frontend Deployment (Netlify, Vercel, GitHub Pages)

1. Update `API_CONFIG.BASE_URL` in `frontend/js/config.js` to your backend URL

2. Deploy the `frontend` directory

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Ikrame Taggaa**
- Email: ikrame.taggaa@example.com
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

**Built with ❤️ for data science professionals**
