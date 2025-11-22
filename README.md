# 🚀 Job Portal - Full Stack MERN Application

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, full-featured job portal application built with the MERN stack. Connect job seekers with employers through an intuitive, responsive platform featuring advanced search, real-time updates, and seamless user experience.

You can see the full website at : https://jobportal-059k.onrender.com/

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### For Job Seekers
- 🔐 **Secure Authentication** - Register and login with role-based access
- 👤 **Profile Management** - Upload resume, add skills, and manage personal information
- 🔍 **Advanced Job Search** - Search by title, location, company, or keywords
- 📊 **Job Filtering** - Filter by location, industry, salary range
- 💼 **Job Applications** - Apply to jobs and track application status
- 📱 **Responsive Design** - Seamless experience across all devices
- 🎨 **Multiple Themes** - Choose from Light, Dark, Aqua, and Retro themes
- 🌟 **Featured Jobs** - Discover top opportunities on the homepage
- 📄 **Resume Management** - Upload and manage your resume with Cloudinary integration

### For Recruiters
- 🏢 **Company Management** - Create and manage company profiles
- 📝 **Job Posting** - Post jobs with detailed descriptions and requirements
- 👥 **Applicant Tracking** - View and manage job applications
- 📈 **Dashboard** - Track job postings and applicant statistics
- ✉️ **Application Management** - Review applicants and update application status

### General Features
- 🚀 **3D Animations** - Interactive hero section with 3D models and particle effects
- ⚡ **Fast Performance** - Optimized loading and smooth transitions
- 🔒 **Protected Routes** - Secure access to authenticated pages
- 🎯 **Smart Navigation** - Active link highlighting and keyboard accessibility
- 📱 **Mobile-First** - Fully responsive design with mobile hamburger menu
- 🔗 **Shareable Search** - URL-based search results for easy sharing

---

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **React Router v6** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **Shadcn/ui** - Reusable component library
- **Lucide React** - Icon library
- **Three.js** - 3D graphics library
- **Sonner** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud-based image and file storage
- **Cookie Parser** - Cookie handling
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESLint** - Code linting
- **Nodemon** - Auto-restart server on changes

---

## 🏗 Architecture

```
jobportal/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── admin/       # Admin/recruiter components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── shared/      # Shared components (Navbar, Footer)
│   │   │   └── ui/          # UI components (buttons, cards, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── redux/           # Redux store and slices
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node.js backend application
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Custom middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── index.js             # Server entry point
│   └── package.json
│
└── README.md
```

### Application Flow

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Client    │─────▶│   Express   │─────▶│   MongoDB   │
│  (React)    │◀─────│   Server    │◀─────│  Database   │
└─────────────┘      └─────────────┘      └─────────────┘
       │                     │
       │                     │
       ▼                     ▼
┌─────────────┐      ┌─────────────┐
│  Cloudinary │      │     JWT     │
│   Storage   │      │    Auth     │
└─────────────┘      └─────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/job-portal.git
   cd job-portal
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables**
   
   Create `.env` file in the `backend` directory:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```

   Create `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:8000/api/v1
   ```

5. **Run the Application**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start on `http://localhost:8000`

   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will open on `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `8000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/jobportal` |
| `SECRET_KEY` | JWT secret key | `your_secret_key_here` |
| `CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `API_KEY` | Cloudinary API key | `your_api_key` |
| `API_SECRET` | Cloudinary API secret | `your_api_secret` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000/api/v1` |

---

## 📡 API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /user/register
Content-Type: multipart/form-data

Body:
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "password": "password123",
  "role": "student",
  "file": <profile_photo>
}
```

#### Login User
```http
POST /user/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

#### Logout User
```http
GET /user/logout
```

#### Update Profile
```http
POST /user/profile/update
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body:
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "1234567890",
  "bio": "Software Developer",
  "skills": "JavaScript,React,Node.js",
  "file": <resume_pdf>
}
```

### Job Endpoints

#### Get All Jobs
```http
GET /job/get
Authorization: Bearer <token>
```

#### Get Job by ID
```http
GET /job/get/:id
Authorization: Bearer <token>
```

#### Post Job (Recruiter)
```http
POST /job/post
Content-Type: application/json
Authorization: Bearer <token>

Body:
{
  "title": "Frontend Developer",
  "description": "Job description here",
  "requirements": ["React", "JavaScript"],
  "salary": "10-15 LPA",
  "location": "Bangalore",
  "jobType": "Full-time",
  "position": 3,
  "companyId": "company_id_here"
}
```

### Company Endpoints

#### Register Company
```http
POST /company/register
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body:
{
  "name": "Tech Corp",
  "description": "Leading tech company",
  "website": "https://techcorp.com",
  "location": "Bangalore",
  "file": <company_logo>
}
```

#### Get All Companies
```http
GET /company/get
Authorization: Bearer <token>
```

### Application Endpoints

#### Apply for Job
```http
POST /application/apply/:id
Authorization: Bearer <token>
```

#### Get Applied Jobs
```http
GET /application/get
Authorization: Bearer <token>
```

#### Get Applicants (Recruiter)
```http
GET /application/:id/applicants
Authorization: Bearer <token>
```

#### Update Application Status
```http
POST /application/status/:id/update
Content-Type: application/json
Authorization: Bearer <token>

Body:
{
  "status": "accepted"
}
```

---

## 🗄 Database Schema

### User Model
```javascript
{
  fullname: String (required),
  email: String (required, unique),
  phoneNumber: Number (required),
  password: String (required),
  role: String (enum: ['student', 'recruiter'], required),
  profile: {
    bio: String,
    skills: [String],
    resume: String,              // Cloudinary URL
    resumeOriginalName: String,
    company: ObjectId (ref: 'Company'),
    profilePhoto: String         // Cloudinary URL
  },
  timestamps: true
}
```

### Company Model
```javascript
{
  name: String (required, unique),
  description: String,
  website: String,
  location: String,
  logo: String,                  // Cloudinary URL
  userId: ObjectId (ref: 'User', required),
  timestamps: true
}
```

### Job Model
```javascript
{
  title: String (required),
  description: String (required),
  requirements: [String],
  salary: String (required),
  experienceLevel: Number,
  location: String (required),
  jobType: String (required),
  position: Number (required),
  company: ObjectId (ref: 'Company', required),
  created_by: ObjectId (ref: 'User', required),
  applications: [ObjectId (ref: 'Application')],
  timestamps: true
}
```

### Application Model
```javascript
{
  job: ObjectId (ref: 'Job', required),
  applicant: ObjectId (ref: 'User', required),
  status: String (enum: ['pending', 'accepted', 'rejected'], default: 'pending'),
  timestamps: true
}
```

---

## 🌐 Deployment

### Deploy on Render

#### Backend Deployment

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Select the `backend` directory as root

2. **Configure Build Settings**
   ```
   Build Command: npm install
   Start Command: npm start
   ```

3. **Add Environment Variables**
   - Add all variables from your `.env` file
   - Set `NODE_ENV=production`

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

#### Frontend Deployment

1. **Update API URL**
   - In `frontend/.env`, update `VITE_API_URL` to your backend URL

2. **Create a new Static Site on Render**
   - Connect your GitHub repository
   - Select the `frontend` directory as root

3. **Configure Build Settings**
   ```
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Wait for deployment to complete

### Deploy on Vercel (Frontend)

```bash
cd frontend
npm install -g vercel
vercel
```

### Deploy on Heroku (Backend)

```bash
cd backend
heroku create your-app-name
git push heroku main
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set SECRET_KEY=your_secret_key
# Add other environment variables
```

---

## 📸 Screenshots

### Landing Page
![Landing Page](./screenshots/landing-page.png)
*Modern landing page with 3D animations and particle effects*

### Home Page (After Login)
![Home Page](./screenshots/home-page.png)
*Personalized dashboard with featured jobs and search functionality*

### Job Search & Filtering
![Job Search](./screenshots/job-search.png)
*Advanced search with filters for location, industry, and salary*

### Job Details
![Job Details](./screenshots/job-details.png)
*Detailed job information with apply functionality*

### Profile Management
![Profile](./screenshots/profile.png)
*User profile with resume upload and skills management*

### Recruiter Dashboard
![Recruiter Dashboard](./screenshots/recruiter-dashboard.png)
*Company and job management for recruiters*

### Theme Options
![Themes](./screenshots/themes.png)
*Multiple theme options: Light, Dark, Aqua, and Retro*

### Mobile Responsive
![Mobile View](./screenshots/mobile-view.png)
*Fully responsive design for mobile devices*

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow ESLint rules
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting PR
- Update documentation if needed

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Cloudinary](https://cloudinary.com/)

---

## 📞 Support

For support, email your.email@example.com or open an issue in the GitHub repository.

---

## 🔄 Version History

- **v1.0.0** (2024-01-XX)
  - Initial release
  - Basic job search and application features
  - User authentication and profile management
  - Recruiter dashboard
  - Multiple theme support
  - 3D animations and modern UI
  - Resume upload with Cloudinary
  - Advanced search with URL parameters
  - Mobile-responsive design

---

<div align="center">
  <p>Made with ❤️ by Your Name</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
