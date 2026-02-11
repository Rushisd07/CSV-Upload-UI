# CSV/JSON Data Loader - Full Stack Application

A complete full-stack application for uploading and processing large CSV/JSON files with a beautiful React UI.

---

## 📦 What You Have

You've received **2 ZIP files**:

1. **csv-upload-api.zip** - Spring Boot REST API (Backend)
2. **csv-upload-react-ui.zip** - React Material-UI Frontend

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│         React Material-UI Frontend          │
│        (http://localhost:3000)              │
│  - File Upload Interface                    │
│  - Real-time Job Tracking                   │
│  - Data Dashboard & Viewer                  │
└──────────────┬──────────────────────────────┘
               │ REST API calls
               │
┌──────────────▼──────────────────────────────┐
│         Spring Boot REST API                │
│        (http://localhost:8080)              │
│  - Streaming CSV/JSON Parser                │
│  - Async Job Processing                     │
│  - JDBC Batch Inserts                       │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│            PostgreSQL Database              │
│  - Categories, Customers, Products          │
│  - Orders, Order Items, Upload Jobs         │
└─────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (5 Minutes)

### 1. Setup PostgreSQL Database

```sql
CREATE DATABASE dataloader_db;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE dataloader_db TO postgres;
```

### 2. Start Backend API

```bash
# Extract csv-upload-api.zip
cd csv-upload-api

# Build and run
mvn clean package -DskipTests
java -jar target/csv-upload-api-1.0.0.jar

# Or use Maven directly
mvn spring-boot:run
```

Backend runs on: **http://localhost:8080**

### 3. Start React Frontend

```bash
# Extract csv-upload-react-ui.zip
cd csv-upload-react-ui

# Install dependencies (first time only)
npm install

# Start development server
npm start
```

Frontend opens automatically at: **http://localhost:3000**

### 4. Upload Sample Data

1. Go to **http://localhost:3000**
2. Select "CSV" format and "CUSTOMERS" data type
3. Choose file: `csv-upload-api/sample-data/customers.csv`
4. Click "Upload & Process"
5. Watch real-time progress!

---

## 📂 Project Structure

```
csv-upload-api/                    # Backend (Spring Boot)
├── src/main/java/
│   └── com/dataloader/
│       ├── controller/            # REST endpoints
│       ├── service/              # Business logic
│       ├── repository/           # Data access
│       ├── model/                # JPA entities
│       └── util/                 # Streaming parsers
├── sample-data/                  # Test CSV/JSON files
│   ├── customers.csv
│   ├── products.csv
│   └── orders.csv
└── README.md

csv-upload-react-ui/              # Frontend (React)
├── src/
│   ├── components/               # React components
│   │   ├── FileUpload.js        # Upload interface
│   │   ├── JobTracker.js        # Job monitoring
│   │   ├── DataSummary.js       # Dashboard
│   │   └── DataViewer.js        # Data tables
│   ├── services/
│   │   └── api.js               # API service layer
│   └── App.js                   # Main app
├── public/
└── README.md
```

---

## ✨ Features

### Backend (Spring Boot)
- ✅ Streaming file processing (no full in-memory load)
- ✅ Async job processing with progress tracking
- ✅ JDBC batch inserts for high performance
- ✅ Schema validation and data quality checks
- ✅ Multi-table relationships (orders → customers + products)
- ✅ PostgreSQL with Flyway migrations
- ✅ RESTful API with proper error handling

### Frontend (React)
- ✅ Beautiful Material-UI design
- ✅ File drag-and-drop upload
- ✅ Real-time job progress tracking (auto-refresh)
- ✅ Interactive data dashboard
- ✅ Paginated data tables
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ User-friendly error messages

---

## 📊 Sample Data Included

### customers.csv (20 records)
- Global customers from USA, UK, Spain, Korea, etc.
- Includes email, phone, loyalty points, addresses

### products.csv (20 records)
- Real products: laptops, phones, books, furniture
- Prices, stock quantities, brands, SKUs

### orders.csv (15 orders, 26 line items)
- Multi-item orders
- Different statuses: pending, shipped, delivered
- References customers and products

---

## 🔧 Configuration

### Backend API

Edit: `csv-upload-api/src/main/resources/application.properties`

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/dataloader_db
spring.datasource.username=postgres
spring.datasource.password=postgres

# File size limits
spring.servlet.multipart.max-file-size=2GB

# Batch processing
app.batch.size=500
```

### Frontend React App

Create: `csv-upload-react-ui/.env`

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
```

---

## 🌐 API Endpoints

### Upload Endpoints
```
POST /api/v1/upload/csv       - Upload CSV file
POST /api/v1/upload/json      - Upload JSON file
GET  /api/v1/upload/jobs/{id} - Get job status
```

### Data Query Endpoints
```
GET /api/v1/data/summary      - Database statistics
GET /api/v1/data/customers    - List customers (paginated)
GET /api/v1/data/products     - List products (paginated)
GET /api/v1/data/orders       - List orders (paginated)
```

---

## 🛠️ Troubleshooting

### CORS Errors

Add this file to backend: `src/main/java/com/dataloader/config/CorsConfig.java`

(Example file included in React UI zip: `CorsConfig.java.example`)

### Backend Won't Start

1. Check PostgreSQL is running
2. Verify database credentials in `application.properties`
3. Make sure port 8080 is free

### Frontend Can't Connect

1. Verify backend is running: `http://localhost:8080/actuator/health`
2. Check browser console for CORS errors
3. Verify `.env` file has correct API URL

### File Upload Fails

1. Check file format (.csv or .json)
2. Verify file size < 2GB
3. Check backend logs for validation errors

---

## 📝 Development Notes

### Backend Tech Stack
- Java 17, Spring Boot 3.2
- PostgreSQL 14+, Flyway
- Apache Commons CSV, Jackson
- JPA/Hibernate, JDBC batch

### Frontend Tech Stack
- React 18, Material-UI v5
- Axios for HTTP
- React Scripts (create-react-app)

---

## 🚢 Deployment

### Backend (Spring Boot)

**Option 1: JAR file**
```bash
mvn clean package
java -jar target/csv-upload-api-1.0.0.jar
```

**Option 2: Docker**
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Frontend (React)

**Option 1: Static hosting (Netlify, Vercel)**
```bash
npm run build
# Deploy the 'build' folder
```

**Option 2: Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
```

---

## 📄 Upload Order (Important!)

Always upload in this order:

1. **Customers** first
2. **Products** second
3. **Orders** last (references customers & products)

---

## 🎯 Use Cases

Perfect for:
- Data migration projects
- Bulk import from legacy systems
- E-commerce product catalogs
- Customer data onboarding
- Order history imports
- Any large CSV/JSON dataset

---

## 📧 Support

### Backend Issues
- Check `csv-upload-api/README.md`
- Review backend logs
- Test endpoints with Postman/curl

### Frontend Issues
- Check `csv-upload-react-ui/README.md`
- Review browser console
- Check `csv-upload-react-ui/QUICK_START.md`

---

## 🎉 You're All Set!

Start both servers and visit **http://localhost:3000** to see your beautiful data loader in action!

**Happy uploading! 🚀**
