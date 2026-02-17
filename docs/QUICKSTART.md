# 🚀 Quick Start Guide

## Getting Started in 3 Easy Steps

### Step 1: Setup the Project

Open PowerShell in the project directory and run:

```powershell
.\scripts\setup.ps1
```

This will:
- Create a Python virtual environment
- Install all backend dependencies
- Create the `.env` configuration file

### Step 2: Configure Email (Optional)

Edit `backend\.env` file to enable the contact form:

```env
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=ikrame.taggaa@example.com
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the generated password in `.env`

### Step 3: Start the Application

Run both frontend and backend servers:

```powershell
.\scripts\start-all.ps1
```

This will open two terminal windows:
- **Backend** running on `http://localhost:5000`
- **Frontend** running on `http://localhost:3000`

### 🌐 Access Your Portfolio

Open your web browser and navigate to:
```
http://localhost:3000
```

---

## 📝 Port Information

| Service | Port | URL |
|---------|------|-----|
| **Frontend** | 3000 | http://localhost:3000 |
| **Backend API** | 5000 | http://localhost:5000 |

---

## 🛠️ Manual Setup (Alternative)

If you prefer to start servers individually:

### Start Backend Only:
```powershell
.\scripts\start-backend.ps1
```

### Start Frontend Only:
```powershell
.\scripts\start-frontend.ps1
```

---

## 🐳 Using Docker (Advanced)

If you have Docker installed:

```powershell
docker-compose up
```

This will:
- Build and run both frontend and backend in containers
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 📂 Project Structure Overview

```
my_portfolio/
├── backend/           # Flask API server (Port 5000)
│   ├── app.py        # Main backend application
│   ├── requirements.txt
│   └── .env          # Configuration file
│
├── frontend/         # Static website (Port 3000)
│   ├── index.html    # Main HTML file
│   ├── css/          # Stylesheets
│   └── js/           # JavaScript files
│
├── scripts/          # Automation scripts
│   ├── setup.ps1     # Initial setup
│   ├── start-all.ps1 # Start both servers
│   ├── start-backend.ps1
│   └── start-frontend.ps1
│
└── README.md         # Full documentation
```

---

## ✨ Features Available

✅ **Modern Portfolio Design** - Clean, professional layout
✅ **Interactive AI Chatbot** - Answers questions about your skills
✅ **Project Showcase** - Grid display with tech stack tags
✅ **Contact Form** - Functional email integration
✅ **Certifications** - Professional credentials display
✅ **Testimonials** - Auto-rotating client feedback
✅ **Fully Responsive** - Works on all devices

---

## 🎨 Customization

### Update Personal Information:

1. **Contact details**: Edit `frontend/index.html` (contact section)
2. **Projects**: Edit `backend/app.py` (projects endpoint)
3. **Chatbot responses**: Edit `backend/app.py` (CHATBOT_KNOWLEDGE dict)
4. **Social media links**: Edit `frontend/index.html` (social-links section)

---

## 🐛 Troubleshooting

### Python not found:
Install Python 3.8+ from https://www.python.org/downloads/

### Port already in use:
- Change ports in `backend/.env` (PORT=5000)
- Or stop the application using that port

### Virtual environment issues:
```powershell
cd backend
Remove-Item -Recurse -Force venv
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
```

### Email not working:
- Verify Gmail App Password is correct
- Check that 2FA is enabled on your Google account
- Make sure `.env` file is in the `backend` directory

---

## 📚 Additional Help

For detailed documentation, see [README.md](README.md)

For issues, check the logs in the terminal windows.

---

**Happy Coding! 🎉**
