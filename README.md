# Data Loader - React Material-UI Frontend

A modern, responsive React web interface for the CSV/JSON Upload API. Built with Material-UI for a professional look and feel.

---

## Features

✅ **File Upload Interface**
- Drag-and-drop support for CSV and JSON files
- File type validation and size checking (max 2GB)
- Real-time upload progress indicator
- Support for CUSTOMERS, PRODUCTS, and ORDERS data types

✅ **Job Tracking Dashboard**
- Real-time job status monitoring
- Auto-refresh every 3 seconds for active jobs
- Progress bars showing processed/failed rows
- Detailed job statistics and timestamps

✅ **Data Summary Dashboard**
- Live statistics: total customers, products, orders, categories
- Color-coded cards with icons
- One-click refresh

✅ **Data Viewer**
- Tabbed interface to view Customers, Products, and Orders
- Paginated tables with sorting
- Beautiful chip-based status indicators
- Responsive design for mobile/tablet/desktop

---

## Tech Stack

- **React 18** - Modern React with hooks
- **Material-UI v5** - Google's Material Design components
- **Axios** - HTTP client for API calls
- **React Scripts** - Zero-config build setup

---

## Prerequisites

- Node.js 16+ and npm (or yarn)
- Backend API running on `http://localhost:8080`

---

## Installation

```bash
# Navigate to the project directory
cd csv-upload-react-ui

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

---

## Configuration

### API Base URL

The app connects to the backend API at `http://localhost:8080` by default.

To change this, create a `.env` file in the root:

```env
REACT_APP_API_URL=http://your-api-url:8080/api/v1
```

---

## Usage Guide

### 1. **Upload Files**

1. Select file format (CSV or JSON)
2. Choose data type:
   - **CUSTOMERS** - Upload first
   - **PRODUCTS** - Upload second
   - **ORDERS** - Upload last (requires Customers & Products)
3. Click "Choose File" and select your file
4. Click "Upload & Process"
5. A job ID will be generated and tracking begins automatically

### 2. **Track Upload Progress**

- View all active and completed jobs in the "Upload Jobs" panel
- Jobs auto-refresh every 3 seconds while processing
- See real-time progress bars, success/failure counts
- Click refresh icon to manually update all jobs

### 3. **View Data**

- Switch between Customers, Products, and Orders tabs
- Use pagination controls to navigate through records
- Tables show key fields with status indicators
- Data refreshes automatically after successful uploads

### 4. **Monitor Database**

- Top dashboard shows total counts for all entities
- Click refresh icon to update statistics
- Color-coded cards for quick insights

---

## Project Structure

```
csv-upload-react-ui/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── FileUpload.js       # File upload form
│   │   ├── JobTracker.js       # Job monitoring panel
│   │   ├── DataSummary.js      # Statistics dashboard
│   │   └── DataViewer.js       # Data tables
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.js                  # Main app component
│   ├── index.js                # React entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

---

## Available Scripts

### `npm start`
Runs the app in development mode at http://localhost:3000

### `npm run build`
Builds the app for production to the `build/` folder.

### `npm test`
Launches the test runner (if tests are added).

---

## API Integration

The frontend communicates with these backend endpoints:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/upload/csv` | POST | Upload CSV file |
| `/upload/json` | POST | Upload JSON file |
| `/upload/jobs/{jobId}` | GET | Get job status |
| `/data/summary` | GET | Get database counts |
| `/data/customers` | GET | List customers (paginated) |
| `/data/products` | GET | List products (paginated) |
| `/data/orders` | GET | List orders (paginated) |

---

## Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy to Static Hosting

You can deploy the `build/` folder to:
- **Netlify** - Drag & drop the build folder
- **Vercel** - `vercel --prod`
- **AWS S3** - Upload build folder to S3 bucket
- **GitHub Pages** - Use `gh-pages` package

Example (Netlify):
```bash
npm run build
# Drag the 'build' folder to netlify.com/drop
```

### Deploy with Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

Build and run:
```bash
docker build -t csv-upload-ui .
docker run -p 3000:3000 csv-upload-ui
```

---

## Customization

### Theme Colors

Edit theme in `src/App.js`:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Change primary color
    },
    secondary: {
      main: '#dc004e',  // Change secondary color
    },
  },
});
```

### Component Styling

All components use Material-UI's `sx` prop for inline styling. Modify directly in component files.

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Troubleshooting

### CORS Issues

If you get CORS errors, ensure the backend API has CORS enabled for `http://localhost:3000`.

Add to Spring Boot `application.properties`:
```properties
# Allow CORS from React dev server
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
```

Or add a CORS configuration class in Spring Boot.

### API Connection Failed

- Verify backend is running on `http://localhost:8080`
- Check browser console for error messages
- Test API endpoints directly using curl or Postman

### File Upload Fails

- Check file size (max 2GB)
- Verify file extension (.csv or .json)
- Ensure backend is configured to accept multipart files

---

## License

MIT License - feel free to use for your projects!

---

## Support

For issues or questions:
1. Check backend API logs
2. Check browser console for errors
3. Verify all dependencies are installed
4. Ensure Node.js version is 16+

---

**Built with ❤️ using React and Material-UI**
