# Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Variables
Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ai-marketing-assistant

# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: OpenAI API
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-3.5-turbo
```

### 3. Start MongoDB

If using local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas:
- Create an account at https://www.mongodb.com/cloud/atlas
- Create a cluster and get your connection string
- Replace `MONGODB_URI` in `.env` with your connection string

### 4. Start Backend Server
```bash
npm run dev
```

Server will be running at `http://localhost:5000`

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Variables
Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=AI Digital Marketing Assistant
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

Application will be available at `http://localhost:3000`

## API Documentation

### Authentication
- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Get Profile**: `GET /api/auth/profile`
- **Update Profile**: `PUT /api/auth/profile`
- **Change Password**: `POST /api/auth/change-password`

### Campaigns
- **Create Campaign**: `POST /api/campaigns`
- **Get All Campaigns**: `GET /api/campaigns`
- **Get Campaign**: `GET /api/campaigns/:id`
- **Update Campaign**: `PUT /api/campaigns/:id`
- **Delete Campaign**: `DELETE /api/campaigns/:id`
- **Update Status**: `PATCH /api/campaigns/:id/status`
- **Update Metrics**: `PATCH /api/campaigns/:id/metrics`
- **Get Stats**: `GET /api/campaigns/stats/overview`

### Content
- **Create Content**: `POST /api/content`
- **Get Content**: `GET /api/content`
- **Get Content by ID**: `GET /api/content/:id`
- **Update Content**: `PUT /api/content/:id`
- **Delete Content**: `DELETE /api/content/:id`
- **Update Status**: `PATCH /api/content/:id/status`
- **Generate Content**: `POST /api/content/generate`
- **Get Stats**: `GET /api/content/stats/overview`

### Leads
- **Create Lead**: `POST /api/leads`
- **Get Leads**: `GET /api/leads`
- **Get Lead**: `GET /api/leads/:id`
- **Update Lead**: `PUT /api/leads/:id`
- **Delete Lead**: `DELETE /api/leads/:id`
- **Update Status**: `PATCH /api/leads/:id/status`
- **Get Stats**: `GET /api/leads/stats/overview`
- **Get by Source**: `GET /api/leads/sources/breakdown`

### Analytics
- **Create Analytics**: `POST /api/analytics`
- **Get Summary**: `GET /api/analytics/summary?days=30`
- **Get Traffic**: `GET /api/analytics/traffic?days=30`
- **Get Conversions**: `GET /api/analytics/conversions?days=30`
- **Get ROI**: `GET /api/analytics/roi?days=30`
- **Get Sources**: `GET /api/analytics/sources?days=30`
- **Get Devices**: `GET /api/analytics/devices?days=30`

### SEO
- **Analyze**: `POST /api/seo/analyze`
- **Get Analyses**: `GET /api/seo/analyses`
- **Get by URL**: `GET /api/seo/analyze/:url`
- **Update Analysis**: `PUT /api/seo/analyses/:id`
- **Get Keywords**: `GET /api/seo/keywords?keyword=marketing`
- **Get Meta Titles**: `GET /api/seo/meta-titles?keyword=marketing`
- **Get Meta Descriptions**: `GET /api/seo/meta-descriptions?keyword=marketing`

## Testing the Application

### 1. Create Test User
Register a new account at `http://localhost:3000/register`

### 2. Test Campaigns
- Navigate to Campaigns
- Create a new campaign
- Edit and delete campaigns

### 3. Test Content Generator
- Go to Content Generator
- Enter a topic and generate content
- Save generated content

### 4. Test Lead Management
- Navigate to Leads
- Add new leads
- Update lead status
- Search and filter leads

### 5. Test SEO Toolkit
- Go to SEO Toolkit
- Enter keywords
- Get title and description suggestions

### 6. Test Analytics
- Navigate to Analytics
- View traffic and conversion metrics
- Change date ranges

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB credentials if using Atlas

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: `npm run dev -- --port 3001`

### CORS Errors
- Ensure `CLIENT_URL` in backend `.env` matches frontend URL
- Check browser console for exact error

### API Not Responding
- Check backend server is running on port 5000
- Verify `VITE_API_URL` in frontend `.env`
- Check network tab in browser dev tools

## Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server
```

### Build for Production

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## Database Seeding (Optional)

To add sample data:

1. Create `backend/src/utils/seed.js`
2. Add sample data insertion logic
3. Run: `node src/utils/seed.js`

## Deployment

### Vercel (Frontend)
1. Push code to GitHub
2. Connect Vercel to GitHub
3. Set `VITE_API_URL` environment variable
4. Deploy

### Heroku (Backend)
1. Create Heroku app
2. Set environment variables
3. Deploy: `git push heroku main`

## Support

For issues or questions:
1. Check error messages in console
2. Review API response in network tab
3. Check MongoDB connection
4. Verify all dependencies are installed
