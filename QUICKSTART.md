/**
 * Quick Start Guide
 */

# Quick Start Guide

## Prerequisites
- Node.js 16+ installed
- MongoDB installed locally OR MongoDB Atlas account
- npm or yarn

## Option 1: Using Docker (Recommended)

### 1. Install Docker
Download and install Docker Desktop from [docker.com](https://www.docker.com)

### 2. Start All Services
```bash
docker-compose up
```

This will:
- Start MongoDB container
- Start Backend API on port 5000
- Start Frontend on port 3000

### 3. Access Application
- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api

### 4. Test Credentials
```
Email: john@example.com
Password: Password123
```

---

## Option 2: Manual Setup

### Backend Setup

#### 1. Navigate to backend
```bash
cd backend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create .env file
```bash
cp .env.example .env
```

#### 4. Configure .env
```env
MONGODB_URI=mongodb://localhost:27017/ai-marketing-assistant
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

#### 5. Start MongoDB
```bash
mongod
```

#### 6. Start backend server
```bash
npm run dev
```

Server will run on http://localhost:5000

### Frontend Setup

#### 1. Navigate to frontend
```bash
cd frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create .env file
```bash
cp .env.example .env
```

#### 4. Start frontend
```bash
npm run dev
```

Application will open at http://localhost:3000

---

## Seed Sample Data

### Option 1: Using npm script
```bash
cd backend
npm run seed
```

### Option 2: Direct node
```bash
cd backend
node src/utils/seed.js
```

Test credentials will be created:
- **Email**: john@example.com
- **Password**: Password123

---

## Verify Installation

### 1. Check Backend
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-06-13T..."
}
```

### 2. Check Frontend
Open http://localhost:3000 in browser

### 3. Login
Use test credentials:
- Email: john@example.com
- Password: Password123

---

## Troubleshooting

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: `npm run dev -- --port 3001`

### MongoDB Connection Error
1. Ensure MongoDB is running: `mongod`
2. Check connection string in .env
3. Try with MongoDB Atlas connection string

### Module Not Found Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Check CLIENT_URL in backend .env matches frontend URL
- Restart backend after changes

### Clear Database
```bash
cd backend
node src/utils/seed.js
```

---

## Project Structure

```
ai-digital-marketing-assistant/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── server.js
├── frontend/             # React application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.js
└── docs/                 # Documentation
```

---

## Next Steps

1. **Explore Dashboard**: View campaign statistics and metrics
2. **Create Campaign**: Test campaign creation workflow
3. **Generate Content**: Try AI content generation
4. **Manage Leads**: Add and track leads
5. **View Analytics**: Check analytics dashboard
6. **Use SEO Tools**: Test keyword research

---

## API Documentation

See [docs/API.md](./docs/API.md) for complete API documentation.

## Architecture

See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for system architecture.

## Setup Details

See [docs/SETUP.md](./docs/SETUP.md) for detailed setup instructions.

---

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Check backend logs for API errors
4. Verify all services are running

---

**Happy Marketing! 🚀**
