# Subash Portfolio — Backend API

Node.js + Express backend for [subash-portfolio-upgraded](../subash-portfolio-upgraded).

---

## 📁 Project Structure

```
subash-portfolio-backend/
├── src/
│   ├── server.js                  ← Entry point
│   ├── config/
│   │   └── mailer.js              ← Nodemailer Gmail setup
│   ├── controllers/
│   │   ├── contactController.js   ← Email send logic
│   │   └── portfolioController.js ← Projects, Experience, Testimonials data
│   ├── routes/
│   │   ├── contact.js             ← POST /api/contact
│   │   └── portfolio.js           ← GET /api/projects, /experiences, etc.
│   └── middleware/
│       └── errorHandler.js        ← 404 + global error handler
├── Contact.jsx                    ← Updated frontend component (copy to src/components/)
├── .env.example                   ← Environment variable template
├── .gitignore
└── package.json
```

---

## 🚀 Setup & Run

### 1. Dependencies install பண்ணவும்

```bash
cd subash-portfolio-backend
npm install
```

### 2. Environment variables set பண்ணவும்

```bash
cp .env.example .env
```

`.env` file-ஐ திறந்து fill பண்ணவும்:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

EMAIL_USER=subashardin2001@gmail.com
EMAIL_PASS=your_gmail_app_password   # ← இதை பாருங்கள் ↓
EMAIL_TO=subashardin2001@gmail.com
```

### 3. Gmail App Password எடுப்பது எப்படி?

1. [myaccount.google.com/security](https://myaccount.google.com/security) → **2-Step Verification** ON செய்யவும்
2. **App passwords** → "Mail" + "Other device" → Generate
3. 16-digit password-ஐ `EMAIL_PASS`-க்கு paste பண்ணவும்

### 4. Server start பண்ணவும்

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server `http://localhost:5000`-ல் ஓடும்.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health check |
| `POST` | `/api/contact` | Contact form submit → Email அனுப்பும் |
| `GET` | `/api/projects` | All projects |
| `GET` | `/api/projects/:id` | Single project |
| `GET` | `/api/experiences` | All experiences |
| `GET` | `/api/experiences?type=work` | Filter by type (work/education/freelance) |
| `GET` | `/api/testimonials` | All testimonials |
| `GET` | `/api/services` | All services |

### Contact API Request Body

```json
{
  "name": "Ravi Kumar",
  "email": "ravi@example.com",
  "subject": "Freelance Project",
  "message": "Hi Subash, I have an interesting project to discuss..."
}
```

---

## 🌐 Frontend Connect பண்ணுவது

### 1. Frontend `.env` file-ல் add பண்ணவும்

```env
# subash-portfolio-upgraded/.env
VITE_API_URL=http://localhost:5000
```

### 2. Contact.jsx மாற்றவும்

`subash-portfolio-backend/Contact.jsx`-ஐ copy பண்ணி `subash-portfolio-upgraded/src/components/Contact.jsx`-ஐ replace பண்ணவும்.

---

## 🚢 Production Deploy (Render.com — Free)

1. GitHub-ல் backend folder push பண்ணவும்
2. [render.com](https://render.com) → New Web Service
3. Environment variables add பண்ணவும்
4. `CLIENT_URL`-ஐ Netlify/Vercel URL-க்கு change பண்ணவும்
5. Frontend `VITE_API_URL`-ஐ Render URL-க்கு update பண்ணவும் (e.g. `https://subash-portfolio-api.onrender.com`)
