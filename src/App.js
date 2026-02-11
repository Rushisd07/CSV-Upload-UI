import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  CloudUpload,
  Dashboard,
} from '@mui/icons-material';
import FileUpload from './components/FileUpload';
import JobTracker from './components/JobTracker';
import DataSummary from './components/DataSummary';
import DataViewer from './components/DataViewer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
});

function App() {
  const [uploadJobs, setUploadJobs] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const handleUploadSuccess = (jobData) => {
    setUploadJobs(prev => [jobData, ...prev]);
    setSnackbar({
      open: true,
      message: `Upload started successfully! Job ID: ${jobData.jobId}`,
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* App Bar */}
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Dashboard sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Data Loader - CSV/JSON Upload System
            </Typography>
            <Typography variant="body2">
              Spring Boot + React
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          {/* Welcome Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <CloudUpload sx={{ fontSize: 48 }} />
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Welcome to Data Loader
                </Typography>
                <Typography variant="body1">
                  Upload large CSV or JSON files to populate your database efficiently. 
                  Track upload progress in real-time and view your data instantly.
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Dashboard Summary */}
          <Box sx={{ mb: 4 }}>
            <DataSummary />
          </Box>

          {/* Upload Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <FileUpload onUploadSuccess={handleUploadSuccess} />
            </Grid>
            <Grid item xs={12} md={6}>
              <JobTracker jobs={uploadJobs} />
            </Grid>
          </Grid>

          {/* Data Viewer */}
          <Box sx={{ mb: 4 }}>
            <DataViewer />
          </Box>

          {/* Instructions */}
          <Alert severity="info" icon={<CloudUpload />}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              How to Use:
            </Typography>
            <Typography variant="body2">
              1. Select file format (CSV or JSON) and data type<br/>
              2. Choose your file from your computer<br/>
              3. Click "Upload & Process" to start the import<br/>
              4. Track progress in the "Upload Jobs" panel<br/>
              5. View imported data in the "View Uploaded Data" section below
            </Typography>
          </Alert>
        </Container>

        {/* Footer */}
        <Paper 
          component="footer" 
          elevation={3}
          sx={{ 
            py: 2, 
            px: 3, 
            mt: 'auto',
            bgcolor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider'
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            © 2025 Data Loader System | Built with Spring Boot & React Material-UI
          </Typography>
        </Paper>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default App;
