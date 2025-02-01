# Multilingual FAQ Management System

A robust FAQ management system with multilingual support, caching, and automated translation capabilities.

## 🌟 Features

- Multi-language support (English, Hindi, Bengali)
- Automatic translation using Google Translate
- Redis caching for performance
- Nginx as reverse proxy
- Docker containerization
- Swagger API documentation
- Comprehensive testing
- AWS EC2 deployment ready

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **Proxy**: Nginx
- **Documentation**: Swagger
- **Testing**: Jest
- **Containerization**: Docker
- **Cloud**: AWS EC2

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── faqController.js      # FAQ CRUD operations
│   ├── middleware/
│   │   └── errorHandler.js       # Error handling
│   ├── models/
│   │   └── faq.js               # FAQ MongoDB model
│   ├── routes/
│   │   └── faqRoutes.js         # API routes
│   ├── services/
│   │   ├── cacheService.js      # Redis caching
│   │   └── translationService.js # Translation logic
│   └── app.js                   # Main application
├── nginx/
│   └── nginx.conf               # Nginx configuration
├── tests/
│   └── faq.test.js             # API tests
├── Dockerfile                   # Node.js app container
├── docker-compose.yml          # Multi-container setup
└── package.json
```

## 🚀 Local Development Setup

### Prerequisites
- Docker and Docker Compose
- Node.js (if running locally)
- MongoDB (if running locally)
- Redis (if running locally)

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

3. Start services:
```bash
docker-compose up -d
```

The application will be available at:
- API: http://localhost
- Swagger Docs: http://localhost/api/docs

### Manual Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

3. Start server:
```bash
npm run dev
```

## ⚙️ Configuration

### Environment Variables (.env)
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/faq_db
REDIS_URL=redis://redis:6379
JWT_SECRET=your-secret-key
```

### Nginx Configuration
```nginx
# nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream backend_servers {
        server app:3000;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://backend_servers;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

## 🌐 AWS EC2 Deployment

1. Launch EC2 Instance:
   - Ubuntu Server 20.04 LTS
   - t2.micro or larger
   - Configure security group:
     - HTTP (80)
     - HTTPS (443)
     - SSH (22)

2. Connect to EC2:
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. Install Docker & Docker Compose:
```bash
# Update system
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

4. Deploy Application:
```bash
# Clone repository
git clone <repository-url>
cd backend

# Configure environment
cp .env.example .env
nano .env  # Edit settings

# Start application
docker-compose up -d
```

## 📡 API Endpoints

### FAQ Endpoints
```bash
# Get all FAQs
GET /api/faqs

# Get FAQs in specific language
GET /api/faqs?lang=hi

# Create FAQ (Auth required)
POST /api/faqs

# Update FAQ (Auth required)
PUT /api/faqs/:id

# Delete FAQ (Auth required)
DELETE /api/faqs/:id
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

## 📊 Monitoring & Logs

### Docker Logs
```bash
# All containers
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f nginx
```

### Nginx Logs
```bash
# Access logs
docker-compose exec nginx tail -f /var/log/nginx/access.log

# Error logs
docker-compose exec nginx tail -f /var/log/nginx/error.log
```

## 🛡️ Security Best Practices

1. SSL/TLS Configuration:
```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
}
```

2. Security Headers:
```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";
```

3. Rate Limiting:
```nginx
limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;
```

## 💼 Additional Portfolio Projects

### Infrastructure & Cloud Projects
1. [Lambda Terraform Project](https://github.com/Reeteshrajesh/Lambda_terraform_project)
   - AWS Lambda automation
   - Infrastructure as Code

2. [Terraform Infrastructure](https://github.com/Reeteshrajesh/terraform)
   - AWS infrastructure setup
   - Resource management

### Application Development
3. [Node.js Food Application](https://github.com/Reeteshrajesh/nodejs-food-app)
   - Backend API development
   - Database integration

### DevOps Implementation
4. [Pre-screening Assignment](https://github.com/Reeteshrajesh/pre-screening-assignment)
   - Docker containerization
   - AWS deployment

## 🎯 Technical Expertise

- **Cloud & Infrastructure**
  - AWS Services (EC2, Lambda, S3)
  - Terraform
  - Infrastructure as Code

- **DevOps**
  - Docker & Containerization
  - Nginx Configuration
  - CI/CD Implementation
  - Linux Administration

- **Development**
  - Node.js/Express
  - API Development
  - Database Management
