# BlogMagic

**BlogMagic** is an AI-powered blogging application that simplifies the process of creating, editing, and managing blogs. The app leverages modern technologies and AI to enable users to craft engaging content effortlessly.

## Features

- User authentication using JWT.
- AI-powered blog content creation with Google Gemini AI.
- Dashboard to manage blogs with filters for tone, length, and content origin (AI/User-generated).
- Responsive design with Tailwind CSS.
- Support for manual edits with change tracking.
- Notifications for actions using React Toastify.
- Integration with Cloudinary for handling media uploads.

## Tech Stack

### Frontend
- **React**: UI library for building interactive interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router**: For managing navigation.
- **React Toastify**: For real-time notifications.
- **Context API**: For state management.

### Backend
- **Django**: Web framework for server-side logic.
- **Django Rest Framework (DRF)**: For building RESTful APIs.
- **SimpleJWT**: For token-based authentication.
- **PostgreSQL**: Relational database for secure data storage.
- **Cloudinary**: Media file management and storage.
- **Google Gemini AI**: For AI-powered blog content generation.

### Deployment
- **Netlify**: Hosting platform for the frontend.
- **Render**: Cloud platform for backend deployment.

## Installation & Setup

Follow these steps to set up the project locally:

### Prerequisites
- Python (>= 3.8)
- Node.js (>= 14.x)
- PostgreSQL

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/Ronit1808/BlogMagic.git
   cd BlogMagic/backend
   
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   
4. Set up the database and apply migrations:
   ```bash
    python manage.py makemigrations
    python manage.py migrate
   
5. Configure environment variables in .env:
    ```env
    SECRET_KEY=your_secret_key
    DEBUG=True
    DATABASE_URL=postgres://username:password@localhost:5432/blogmagic
    CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
    GEMINI_KEY = your gemini api key

6. Run the development server:
   ```bash
   python manage.py runserver


### Frontend
1. Navigate to the frontend folder:
   ```bash
   cd BlogMagic/frontend

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm start

### Deployment
1. Deploy the frontend using Netlify:
- Build the React app: npm run build.
- Upload the build folder to Netlify.

2. Deploy the backend using Render:
- Push the backend code to a GitHub repository.
- Connect Render to your GitHub repo and configure environment variables.

### Screenshots



### Live Demo 
- https://blogmagic.netlify.app



    
