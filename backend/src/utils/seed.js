/**
 * Sample Data Seeding Script
 * Run with: node src/utils/seed.js
 */

const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User');
const Campaign = require('../models/Campaign');
const Content = require('../models/Content');
const Lead = require('../models/Lead');
const Analytics = require('../models/Analytics');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Campaign.deleteMany({});
    await Content.deleteMany({});
    await Lead.deleteMany({});
    await Analytics.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create sample user
    const user = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123',
      businessName: 'Tech Startup Inc',
      businessType: 'SaaS',
      website: 'https://techstartup.com',
      subscription: 'professional',
    });
    console.log('👤 Sample user created');

    // Create sample campaigns
    const campaigns = await Campaign.create([
      {
        userId: user._id,
        name: 'Summer Marketing Campaign 2024',
        description: 'Focused on increasing brand awareness during summer',
        type: 'Social Media',
        status: 'Active',
        goal: 'Increase brand awareness by 50%',
        budget: 5000,
        spent: 2500,
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        targetAudience: 'Tech enthusiasts aged 25-45',
        channels: ['Facebook', 'Instagram', 'LinkedIn'],
        metrics: {
          impressions: 50000,
          clicks: 2500,
          conversions: 150,
          revenue: 7500,
          roi: 200,
        },
      },
      {
        userId: user._id,
        name: 'Email Nurture Campaign',
        description: 'Lead nurturing email series',
        type: 'Email',
        status: 'Active',
        goal: 'Increase email engagement',
        budget: 1000,
        spent: 500,
        startDate: new Date('2024-05-01'),
        endDate: new Date('2024-12-31'),
        targetAudience: 'Existing customers',
        channels: ['Email'],
        metrics: {
          impressions: 10000,
          clicks: 800,
          conversions: 100,
          revenue: 5000,
          roi: 900,
        },
      },
      {
        userId: user._id,
        name: 'SEO Optimization Campaign',
        description: 'Organic search visibility improvement',
        type: 'SEO',
        status: 'Planning',
        goal: 'Rank #1 for target keywords',
        budget: 3000,
        spent: 0,
        startDate: new Date('2024-07-15'),
        endDate: new Date('2024-12-15'),
        targetAudience: 'Search engine users',
        channels: ['Blog'],
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          revenue: 0,
          roi: 0,
        },
      },
    ]);
    console.log('📊 Sample campaigns created');

    // Create sample content
    const contents = await Content.create([
      {
        userId: user._id,
        campaignId: campaigns[0]._id,
        title: 'Digital Marketing Trends 2024',
        type: 'Social Media Post',
        platform: 'LinkedIn',
        content: 'Discover the top 5 digital marketing trends that will dominate 2024!\n\n1. AI-Powered Personalization\n2. Video Marketing Dominance\n3. Voice Search Optimization\n4. Influencer Marketing Evolution\n5. Sustainability Focus\n\nWhich trend are you most excited about?\n\n#DigitalMarketing #MarketingTrends #2024',
        tone: 'Professional',
        status: 'Published',
        publishedAt: new Date(),
        performance: {
          views: 5000,
          engagement: 250,
          conversions: 15,
          shares: 100,
        },
      },
      {
        userId: user._id,
        campaignId: campaigns[0]._id,
        title: 'Instagram Story Series',
        type: 'Social Media Post',
        platform: 'Instagram',
        content: 'Check out our latest behind-the-scenes stories! 📸\n\n#BehindTheScenes #TeamWork #MarketingLife',
        tone: 'Casual',
        status: 'Published',
        publishedAt: new Date(),
        performance: {
          views: 3000,
          engagement: 450,
          conversions: 30,
          shares: 50,
        },
      },
      {
        userId: user._id,
        campaignId: campaigns[1]._id,
        title: 'Welcome Email Template',
        type: 'Email',
        platform: 'Email',
        content: 'Subject: Welcome to Our Community!\n\nDear Subscriber,\n\nThank you for joining our community. We\'re excited to share exclusive insights, tips, and updates with you.\n\nGet ready for amazing content!\n\nBest regards,\nThe Team',
        tone: 'Professional',
        status: 'Published',
        publishedAt: new Date(),
        performance: {
          views: 8000,
          engagement: 400,
          conversions: 80,
          shares: 0,
        },
      },
      {
        userId: user._id,
        title: 'Product Description Draft',
        type: 'Product Description',
        platform: 'Website',
        content: 'Our cutting-edge software solution helps businesses streamline their digital marketing operations. With AI-powered insights and intuitive dashboards, manage campaigns, content, and analytics all in one place.',
        tone: 'Professional',
        status: 'Draft',
      },
    ]);
    console.log('📝 Sample content created');

    // Create sample leads
    const leads = await Lead.create([
      {
        userId: user._id,
        campaign: campaigns[0]._id,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1-555-0101',
        company: 'Digital Agency Co',
        jobTitle: 'Marketing Manager',
        status: 'Qualified',
        source: 'Website',
        interests: ['Marketing', 'Automation', 'Analytics'],
        budget: 'High',
        timeline: 'Short-term',
        leadValue: 5000,
        lastContactedAt: new Date(),
      },
      {
        userId: user._id,
        campaign: campaigns[0]._id,
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.j@example.com',
        phone: '+1-555-0102',
        company: 'E-Commerce Solutions',
        jobTitle: 'CEO',
        status: 'Contacted',
        source: 'LinkedIn',
        interests: ['E-commerce', 'Growth'],
        budget: 'High',
        timeline: 'Medium',
        leadValue: 8000,
      },
      {
        userId: user._id,
        firstName: 'Sarah',
        lastName: 'Williams',
        email: 'sarah.w@example.com',
        phone: '+1-555-0103',
        company: 'Small Business Pro',
        jobTitle: 'Owner',
        status: 'New',
        source: 'Social Media',
        interests: ['Small Business', 'Marketing'],
        budget: 'Medium',
        timeline: 'Long-term',
        leadValue: 3000,
      },
      {
        userId: user._id,
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.b@example.com',
        phone: '+1-555-0104',
        company: 'Tech Startup XYZ',
        jobTitle: 'Marketing Director',
        status: 'Won',
        source: 'Referral',
        interests: ['SaaS', 'Marketing', 'Growth'],
        budget: 'High',
        timeline: 'Immediate',
        leadValue: 12000,
      },
    ]);
    console.log('👥 Sample leads created');

    // Create sample analytics data
    const analyticsData = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      analyticsData.push({
        userId: user._id,
        campaignId: campaigns[0]._id,
        date,
        traffic: {
          visitors: Math.floor(Math.random() * 2000) + 500,
          pageViews: Math.floor(Math.random() * 5000) + 1000,
          sessions: Math.floor(Math.random() * 1500) + 300,
          sessionDuration: Math.floor(Math.random() * 300) + 60,
          bounceRate: Math.floor(Math.random() * 40) + 20,
        },
        conversions: {
          total: Math.floor(Math.random() * 50) + 5,
          rate: Math.floor(Math.random() * 10) + 1,
          value: Math.floor(Math.random() * 5000) + 500,
          byType: {
            signups: Math.floor(Math.random() * 20),
            purchases: Math.floor(Math.random() * 30),
            downloads: Math.floor(Math.random() * 15),
            inquiries: Math.floor(Math.random() * 10),
          },
        },
        sources: {
          direct: Math.floor(Math.random() * 500),
          organic: Math.floor(Math.random() * 1000),
          social: Math.floor(Math.random() * 800),
          referral: Math.floor(Math.random() * 300),
          paid: Math.floor(Math.random() * 600),
          email: Math.floor(Math.random() * 400),
        },
        devices: {
          desktop: Math.floor(Math.random() * 1000) + 300,
          mobile: Math.floor(Math.random() * 1200) + 400,
          tablet: Math.floor(Math.random() * 300) + 100,
        },
        roi: {
          revenue: Math.floor(Math.random() * 10000) + 2000,
          cost: Math.floor(Math.random() * 3000) + 500,
          percentage: Math.floor(Math.random() * 400) + 50,
        },
      });
    }
    
    await Analytics.create(analyticsData);
    console.log('📈 Sample analytics data created');

    console.log('\n✅ Database seeding completed successfully!');
    console.log(`\n📝 Test Credentials:`);
    console.log(`   Email: john@example.com`);
    console.log(`   Password: Password123`);
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
};

// Run seed
connectDB().then(seedData);
