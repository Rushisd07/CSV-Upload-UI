# Quick Start Guide

Get the React UI running in 3 minutes!

---

## Step 1: Install Dependencies

```bash
cd csv-upload-react-ui
npm install
```

This installs all required packages (React, Material-UI, Axios, etc.)

---

## Step 2: Start Backend API

Make sure your Spring Boot backend is running:

```bash
# In the Spring Boot project directory
cd csv-upload-api
mvn spring-boot:run
```

Backend should be running on: `http://localhost:8080`

---

## Step 3: Start React App

```bash
# In the React UI directory
npm start
```

The browser will automatically open: `http://localhost:3000`

---

## Step 4: Upload Your First File

1. **Select Format**: Choose CSV or JSON
2. **Select Data Type**: Choose CUSTOMERS
3. **Choose File**: Click "Choose File" and select `sample-data/customers.csv` from the backend project
4. **Upload**: Click "Upload & Process"
5. **Watch**: See the job appear in "Upload Jobs" with real-time progress

---

## Step 5: View Your Data

1. Scroll down to "View Uploaded Data"
2. Click the "Customers" tab
3. See your uploaded customer records in a beautiful table
4. Use pagination to navigate through pages

---

## Common Issues

### "Cannot connect to backend"
- Make sure Spring Boot is running on port 8080
- Check `http://localhost:8080/actuator/health` in your browser

### "CORS error"
- Add CORS configuration to your Spring Boot app (see main README)

### "File upload fails"
- Check file format (.csv or .json)
- Make sure file is under 2GB
- Check browser console for detailed error

---

## Next Steps

✅ Upload products: `sample-data/products.csv`  
✅ Upload orders: `sample-data/orders.csv`  
✅ Explore the Data Viewer to see all records  
✅ Check the Dashboard Summary for statistics  

---

**That's it! You're ready to go! 🚀**
