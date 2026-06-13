# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format
All responses follow this format:
```json
{
  "success": true/false,
  "message": "Operation description",
  "data": {}
}
```

## Error Handling
Error responses include:
```json
{
  "success": false,
  "error": "Error message",
  "status": 400
}
```

## Endpoints

### Authentication

#### Register User
```
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "businessName": "My Business"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { user object },
    "accessToken": "token",
    "refreshToken": "token"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { user object },
    "accessToken": "token",
    "refreshToken": "token"
  }
}
```

#### Get Profile
```
GET /auth/profile
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": { user object }
}
```

#### Update Profile
```
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "businessName": "Updated Business"
}

Response:
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { updated user object }
}
```

### Campaigns

#### Create Campaign
```
POST /campaigns
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Summer Campaign 2024",
  "description": "Summer marketing campaign",
  "type": "Social Media",
  "goal": "Increase brand awareness",
  "budget": 5000,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "channels": ["Facebook", "Instagram"]
}

Response:
{
  "success": true,
  "message": "Campaign created successfully",
  "data": { campaign object }
}
```

#### Get All Campaigns
```
GET /campaigns?status=Active&type=Social Media
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 5,
  "data": [{ campaign objects }]
}
```

#### Get Single Campaign
```
GET /campaigns/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": { campaign object }
}
```

#### Update Campaign
```
PUT /campaigns/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Campaign Name",
  "budget": 6000
}

Response:
{
  "success": true,
  "message": "Campaign updated successfully",
  "data": { updated campaign object }
}
```

#### Update Campaign Status
```
PATCH /campaigns/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Active"
}

Status values: "Planning", "Active", "Paused", "Completed", "Archived"

Response:
{
  "success": true,
  "message": "Campaign status updated",
  "data": { updated campaign object }
}
```

#### Update Campaign Metrics
```
PATCH /campaigns/:id/metrics
Authorization: Bearer <token>
Content-Type: application/json

{
  "impressions": 10000,
  "clicks": 500,
  "conversions": 50,
  "revenue": 2500
}

Response:
{
  "success": true,
  "message": "Metrics updated successfully",
  "data": { updated campaign object }
}
```

#### Delete Campaign
```
DELETE /campaigns/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Campaign deleted successfully"
}
```

### Content

#### Create Content
```
POST /content
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Marketing Tips",
  "type": "Social Media Post",
  "platform": "LinkedIn",
  "content": "Content text here...",
  "tone": "Professional"
}

Response:
{
  "success": true,
  "message": "Content created successfully",
  "data": { content object }
}
```

#### Generate AI Content
```
POST /content/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "Social Media Post",
  "platform": "Instagram",
  "topic": "Digital Marketing",
  "tone": "Casual"
}

Response:
{
  "success": true,
  "message": "Content generated successfully",
  "data": { generated content object }
}
```

### Leads

#### Create Lead
```
POST /leads
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "jobTitle": "CEO",
  "source": "Website"
}

Response:
{
  "success": true,
  "message": "Lead created successfully",
  "data": { lead object }
}
```

#### Get All Leads
```
GET /leads?status=New&search=john
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 10,
  "data": [{ lead objects }]
}
```

#### Update Lead Status
```
PATCH /leads/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Qualified"
}

Status values: "New", "Contacted", "Qualified", "Negotiating", "Won", "Lost"

Response:
{
  "success": true,
  "message": "Lead status updated",
  "data": { updated lead object }
}
```

### Analytics

#### Get Analytics Summary
```
GET /analytics/summary?days=30
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "period": "Last 30 days",
    "traffic": {
      "totalVisitors": 5000,
      "totalPageViews": 15000,
      "averageSessionDuration": 180
    },
    "conversions": {
      "total": 250,
      "rate": 5.2,
      "value": 12500
    },
    "roi": {
      "totalRevenue": 25000,
      "totalCost": 5000,
      "percentage": 400
    }
  }
}
```

### SEO

#### Get Keyword Suggestions
```
GET /seo/keywords?keyword=digital marketing
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    "digital marketing tips",
    "digital marketing guide",
    "digital marketing strategies"
  ]
}
```

#### Get Meta Title Suggestions
```
GET /seo/meta-titles?keyword=digital marketing
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    "Digital Marketing | Complete Guide for 2024",
    "Best Practices for Digital Marketing",
    "Ultimate Guide to Digital Marketing"
  ]
}
```

## Status Codes

| Code | Meaning |
|------|----------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting

Currently no rate limiting is implemented. For production, implement rate limiting:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```
