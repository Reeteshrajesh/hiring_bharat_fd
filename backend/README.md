# FAQ Management System

A robust multilingual FAQ management system built with Node.js, Express, MongoDB, and Redis. Supports automatic translation, caching, and WYSIWYG editor integration.

## 🌟 Features

- Multi-language support (English, Hindi, Bengali)
- Automatic translation using Google Translate
- Redis caching for improved performance
- RESTful API endpoints
- Swagger API documentation
- Docker containerization
- JWT Authentication
- Input validation
- Comprehensive error handling
- Automated tests

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **Documentation**: Swagger
- **Testing**: Jest
- **Container**: Docker
- **Deployment**: AWS EC2

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── faqController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── faq.js
│   ├── routes/
│   │   └── faqRoutes.js
│   ├── services/
│   │   ├── cacheService.js
│   │   └── translationService.js
│   ├── validators/
│   │   └── faqValidator.js
│   └── app.js
├── tests/
│   └── faq.test.js
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Redis
- Docker and Docker Compose (optional)

### Option 1: Without Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the server:
```bash
npm run dev
```

### Option 2: Using Docker

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Build and run containers:
```bash
docker-compose up --build
```

## 🌐 AWS EC2 Deployment

### Step 1: Launch EC2 Instance

1. Log in to AWS Console
2. Launch an EC2 instance:
   - Choose Ubuntu Server 20.04 LTS
   - Select t2.micro (or larger based on needs)
   - Configure security group:
     - Allow SSH (Port 22)
     - Allow HTTP (Port 80)
     - Allow HTTPS (Port 443)
     - Allow Custom TCP (Port 3000)

### Step 2: Connect to EC2

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### Step 3: Install Docker and Docker Compose

```bash
# Update system
sudo apt-get update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker ${USER}
newgrp docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 4: Deploy Application

1. Clone repository:
```bash
git clone <repository-url>
cd backend
```

2. Set up environment:
```bash
cp .env.example .env
nano .env  # Edit configuration
```

3. Start application:
```bash
docker-compose up -d
```

## 📡 API Endpoints

### FAQ Endpoints

```bash
# Get all FAQs
GET /api/faqs

# Get FAQ by ID
GET /api/faqs/:id

# Create FAQ (Auth required)
POST /api/faqs

# Update FAQ (Auth required)
PUT /api/faqs/:id

# Delete FAQ (Auth required)
DELETE /api/faqs/:id
```

### Authentication Endpoints

```bash
# Login
POST /api/auth/login

# Register
POST /api/auth/register
```

### Language Support

Add `?lang=` query parameter to specify language:
```bash
# Get FAQs in Hindi
GET /api/faqs?lang=hi

# Get FAQs in Bengali
GET /api/faqs?lang=bn
```

## 🧪 Testing

Run tests:
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

## 📚 API Documentation

Access Swagger documentation at:
```
http://your-domain:3000/api/docs
```

## 🔍 Monitoring

Check logs:
```bash
# View all container logs
docker-compose logs

# View specific service logs
docker-compose logs app
docker-compose logs mongodb
docker-compose logs redis
```

## 🛡️ Security Considerations

1. Set strong passwords in .env
2. Keep MongoDB and Redis ports private
3. Use HTTPS in production
4. Implement rate limiting
5. Regular security updates

## 🔧 Troubleshooting

1. If containers don't start:
```bash
docker-compose down
docker-compose up --build
```

2. If MongoDB connection fails:
```bash
docker-compose exec mongodb mongo
```

3. Check Redis connection:
```bash
docker-compose exec redis redis-cli ping
```

## 📝 Environment Variables

Required variables in .env:
```
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/faq_db
REDIS_URL=redis://redis:6379
JWT_SECRET=your-secret-key
GOOGLE_TRANSLATE_API_KEY=your-api-key
```


### Cloud & DevOps Expertise(I have these also)
- **AWS Integration**
  - EC2 deployment configuration
  - Container orchestration with Docker Compose
  - Experience with AWS services (ECS, ECR, RDS, ElastiCache)
  - Infrastructure as Code capabilities

- **DevOps Practices**
  - Containerization using Docker
  - CI/CD pipeline expertise
  - Infrastructure automation
  - Monitoring and logging setup
  - Security best practices implementation

### Additional Considerations
- Scalable architecture design
- Performance optimization through caching
- Security-first approach
- Production-ready configuration

This solution not only meets the backend development requirements but also demonstrates strong DevOps and cloud infrastructure capabilities, ensuring a robust and scalable production deployment.



## 💼 Additional Portfolio Projects

### Infrastructure & Cloud Projects

#### 1. [Lambda Terraform Project](https://github.com/Reeteshrajesh/Lambda_terraform_project)
- Infrastructure as Code implementation using Terraform
- AWS Lambda function deployment automation
- Demonstrates cloud architecture and serverless expertise
- Showcases infrastructure automation skills

#### 2. [Terraform Infrastructure](https://github.com/Reeteshrajesh/terraform)
- Comprehensive Terraform configurations for AWS infrastructure
- Infrastructure as Code (IaC) best practices
- Resource provisioning and management
- Automated cloud infrastructure setup

### Application Development

#### 3. [Node.js Food Application](https://github.com/Reeteshrajesh/nodejs-food-app)
- Full-featured backend application built with Node.js
- RESTful API implementation
- Database integration and management
- Demonstrates backend development expertise

### DevOps & Deployment

#### 4. [Pre-screening Assignment](https://github.com/Reeteshrajesh/pre-screening-assignment)
- Docker containerization implementation
- AWS cloud deployment
- Linux environment configuration
- Showcases practical DevOps skills

## 🎯 Technical Expertise Summary

### Cloud & Infrastructure
- AWS Services (EC2, Lambda, S3, RDS)
- Infrastructure as Code with Terraform
- Serverless Architecture
- Cloud Resource Management

### DevOps
- Docker & Containerization
- CI/CD Implementation
- Infrastructure Automation
- Linux System Administration

### Development
- Backend Development (Node.js)
- API Development
- Database Management
- System Architecture

This collection of projects demonstrates a comprehensive skill set spanning cloud infrastructure, DevOps practices, and application development, making me well-suited for roles requiring a blend of these technologies.
