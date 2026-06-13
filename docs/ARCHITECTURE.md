# Architecture Overview

## Project Structure

```
ai-digital-marketing-assistant/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── common/
│   │   │   ├── analytics/
│   │   │   ├── campaign/
│   │   │   ├── content/
│   │   │   ├── dashboard/
│   │   │   ├── leads/
│   │   │   └── seo/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── docs/
    ├── SETUP.md
    ├── API.md
    └── ARCHITECTURE.md
```

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

### Layer Structure

#### 1. Controllers
Handles HTTP requests and responses
- `authController.js` - User authentication
- `campaignController.js` - Campaign management
- `contentController.js` - Content operations
- `leadController.js` - Lead management
- `analyticsController.js` - Analytics data
- `seoController.js` - SEO tools

#### 2. Services
Business logic and data operations
- `authService.js` - Authentication logic
- `campaignService.js` - Campaign operations
- `contentService.js` - Content generation
- `leadService.js` - Lead operations
- `analyticsService.js` - Analytics calculations
- `seoService.js` - SEO recommendations

#### 3. Models
Database schemas
- `User.js` - User accounts
- `Campaign.js` - Marketing campaigns
- `Content.js` - Generated content
- `Lead.js` - Customer leads
- `Analytics.js` - Tracking data
- `SEOAnalysis.js` - SEO metrics

#### 4. Middleware
- `auth.js` - JWT verification
- `errorHandler.js` - Error handling

#### 5. Routes
API endpoints
- `authRoutes.js`
- `campaignRoutes.js`
- `contentRoutes.js`
- `leadRoutes.js`
- `analyticsRoutes.js`
- `seoRoutes.js`

### Authentication Flow

```
1. User registers/logs in
   ↓
2. Server validates credentials
   ↓
3. Server generates JWT tokens
   ↓
4. Client stores tokens in localStorage
   ↓
5. Client includes token in Authorization header
   ↓
6. Server validates token for protected routes
   ↓
7. If valid, process request; if invalid, return 401
```

## Frontend Architecture

### Technology Stack
- **Library**: React 18
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Icons**: React Icons
- **Charts**: Chart.js & Recharts

### Component Structure

#### Common Components
- `Button.jsx` - Reusable button
- `Card.jsx` - Card wrapper
- `Input.jsx` - Form input
- `Navigation.jsx` - Sidebar navigation
- `Spinner.jsx` - Loading indicator
- `Toast.jsx` - Notifications

#### Feature Components
- **Auth**: Login, Register
- **Dashboard**: Overview cards, statistics
- **Campaign**: List, Create, Edit
- **Content**: Generator, List
- **Leads**: Management, Filtering
- **SEO**: Keyword research, Meta suggestions
- **Analytics**: Metrics, Charts

### State Management

#### Context API
- `AuthContext.jsx` - Global auth state
  - User data
  - Authentication status
  - Login/Logout functions

#### Custom Hooks
- `useAuth()` - Access auth context
- `useToast()` - Toast notifications

### Data Flow

```
Component
   ↓
Hook (useAuth, useToast)
   ↓
Context/State
   ↓
API Service
   ↓
Backend
   ↓
Database
```

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  businessName: String,
  businessType: String,
  subscription: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Campaign
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  description: String,
  type: String,
  status: String,
  goal: String,
  budget: Number,
  spent: Number,
  startDate: Date,
  endDate: Date,
  metrics: {
    impressions: Number,
    clicks: Number,
    conversions: Number,
    roi: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Content
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  campaignId: ObjectId (ref: Campaign),
  title: String,
  type: String,
  platform: String,
  content: String,
  status: String,
  performance: {
    views: Number,
    engagement: Number,
    conversions: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

## API Design

### RESTful Principles
- GET - Retrieve resources
- POST - Create resources
- PUT - Update entire resource
- PATCH - Partial update
- DELETE - Remove resources

### Request/Response Format
```javascript
// Request
{
  method: 'POST',
  url: '/api/campaigns',
  headers: {
    'Authorization': 'Bearer token',
    'Content-Type': 'application/json'
  },
  body: { campaignData }
}

// Response
{
  success: true,
  message: 'Campaign created successfully',
  data: { campaignObject }
}
```

## Security Implementation

### Authentication
- JWT tokens for stateless auth
- Tokens expire after 7 days
- Refresh tokens for token rotation
- Passwords hashed with bcryptjs

### Authorization
- Protected routes with middleware
- User can only access own data
- MongoDB queries filtered by userId

### Input Validation
- Express validator for inputs
- Email format validation
- Password strength requirements
- Type checking on models

### Error Handling
- Centralized error handler middleware
- Validation error responses
- Database error handling
- JWT error handling

## Scalability Considerations

### Database
- Indexes on frequently queried fields
- Pagination for large result sets
- Connection pooling with Mongoose

### Backend
- Horizontal scaling with load balancer
- Environment-based configuration
- Error logging and monitoring

### Frontend
- Code splitting with React
- Lazy loading components
- Caching strategies

## Future Enhancements

1. **AI Integration**
   - OpenAI API for content generation
   - NLP for sentiment analysis

2. **Advanced Features**
   - Social media scheduling
   - Email campaign automation
   - Advanced analytics

3. **Integrations**
   - Stripe for payments
   - SendGrid for email
   - Slack notifications

4. **Scalability**
   - Redis caching
   - Message queues
   - Microservices architecture
