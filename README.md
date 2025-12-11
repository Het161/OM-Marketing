text
# OM Marketing - Weighing Scale & Note Counting Machines

Professional business website for OM Marketing, Gujarat's leading supplier of industrial weighing scales, platform scales, and currency note counting machines.

## 🚀 Tech Stack

### Frontend
- **Framework:** Next.js 15 (React 18, TypeScript)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** React Icons
- **Deployment:** Vercel

### Backend
- **Framework:** FastAPI (Python)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Email:** SMTP (Gmail)
- **Deployment:** Render

## ✨ Features

- 📦 **Product Catalog** - Dynamic product showcase with categories
- 🔐 **Admin Dashboard** - CRUD operations for products
- 📧 **Contact System** - Automated email notifications with HTML templates
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Glassmorphism effects and smooth animations
- 🔍 **SEO Optimized** - Meta tags and structured data

## 🛠️ Installation

### Frontend Setup

cd frontend
npm install
npm run dev

text

Open http://localhost:3000

### Backend Setup

cd backend
python -m venv myenv
source myenv/bin/activate # On Windows: myenv\Scripts\activate
pip install -r requirements.txt

Create .env file
cp .env.example .env

Edit .env with your database and SMTP credentials
Run server
uvicorn app.main:app --reload

text

API runs at http://localhost:8000

## 📝 Environment Variables

### Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000

text

### Backend (.env)
DATABASE_URL=postgresql://user:password@localhost/ommarketing
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
RECEIVER_EMAIL=your-email@gmail.com

text

## 📂 Project Structure

OM-Marketing/
├── frontend/ # Next.js frontend
│ ├── src/
│ │ ├── app/ # App router pages
│ │ └── components/
│ └── public/ # Static assets
└── backend/ # FastAPI backend
├── app/
│ ├── routes/ # API endpoints
│ ├── models/ # Database models
│ └── main.py
└── requirements.txt

text

## 🌐 Live Demo

- **Website:** [Coming Soon]
- **Admin:** [Coming Soon]

## 📞 Contact

**OM Marketing**
- 📧 Email: ommarketing.weighingscale1@gmail.com
- 📱 Phone: +91 98252 47312
- 📍 Location: Shop 15, JB Plaza, Kathal, District- Kheda, Gujarat

## 📄 License

© 2025 OM Marketing. All rights reserved.

## 👨‍💻 Developer

Built with ❤️ by [Het Patel](https://buildbyhet.me)