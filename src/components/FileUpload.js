import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress,
  Chip,
  Stack,
  Paper,
} from '@mui/material';
import {
  CloudUpload,
  InsertDriveFile,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { uploadCsvFile, uploadJsonFile } from '../services/api';
import { formatFileSize, validateFile } from '../utils/helpers';

const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataType, setDataType] = useState('CUSTOMERS');
  const [fileType, setFileType] = useState('CSV');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = fileType === 'CSV' ? ['csv'] : ['json'];
      const validation = validateFile(file, allowedExtensions);
      
      if (!validation.valid) {
        setError(validation.error);
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
      setError('');
      setSuccess('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');
    setUploadProgress(0);

    try {
      const uploadFn = fileType === 'CSV' ? uploadCsvFile : uploadJsonFile;
      const response = await uploadFn(selectedFile, dataType, setUploadProgress);
      
      if (response.data.success) {
        setSuccess(`Upload started! Job ID: ${response.data.data.jobId}`);
        setSelectedFile(null);
        setUploadProgress(0);
        
        // Notify parent component
        if (onUploadSuccess) {
          onUploadSuccess(response.data.data);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CloudUpload color="primary" />
          Upload Data File
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Upload CSV or JSON files to populate the database. Files are processed asynchronously.
        </Typography>

        <Stack spacing={3}>
          {/* File Type Selection */}
          <FormControl fullWidth>
            <InputLabel>File Format</InputLabel>
            <Select
              value={fileType}
              label="File Format"
              onChange={(e) => {
                setFileType(e.target.value);
                setSelectedFile(null);
              }}
              disabled={uploading}
            >
              <MenuItem value="CSV">CSV (.csv)</MenuItem>
              <MenuItem value="JSON">JSON (.json)</MenuItem>
            </Select>
          </FormControl>

          {/* Data Type Selection */}
          <FormControl fullWidth>
            <InputLabel>Data Type</InputLabel>
            <Select
              value={dataType}
              label="Data Type"
              onChange={(e) => setDataType(e.target.value)}
              disabled={uploading}
            >
              <MenuItem value="CUSTOMERS">Customers</MenuItem>
              <MenuItem value="PRODUCTS">Products</MenuItem>
              <MenuItem value="ORDERS">Orders (requires Customers & Products first)</MenuItem>
            </Select>
          </FormControl>

          {/* File Selector */}
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 3, 
              textAlign: 'center',
              bgcolor: selectedFile ? 'action.hover' : 'background.paper',
              border: '2px dashed',
              borderColor: selectedFile ? 'primary.main' : 'divider',
            }}
          >
            <input
              accept={fileType === 'CSV' ? '.csv' : '.json'}
              style={{ display: 'none' }}
              id="file-upload-input"
              type="file"
              onChange={handleFileChange}
              disabled={uploading}
            />
            <label htmlFor="file-upload-input">
              <Button
                variant="outlined"
                component="span"
                startIcon={<InsertDriveFile />}
                disabled={uploading}
                size="large"
              >
                Choose File
              </Button>
            </label>

            {selectedFile && (
              <Box sx={{ mt: 2 }}>
                <Chip 
                  icon={<CheckCircle />}
                  label={`${selectedFile.name} (${formatFileSize(selectedFile.size)})`}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            )}
          </Paper>

          {/* Upload Progress */}
          {uploading && (
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Uploading... {uploadProgress}%
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}

          {/* Error/Success Messages */}
          {error && (
            <Alert severity="error" icon={<Error />}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert severity="success" icon={<CheckCircle />}>
              {success}
            </Alert>
          )}

          {/* Upload Button */}
          <Button
            variant="contained"
            size="large"
            startIcon={<CloudUpload />}
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            fullWidth
          >
            {uploading ? 'Uploading...' : 'Upload & Process'}
          </Button>

          {/* Instructions */}
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              Upload Order:
            </Typography>
            <Typography variant="body2">
              1. Upload <strong>Customers</strong> first<br/>
              2. Upload <strong>Products</strong> second<br/>
              3. Upload <strong>Orders</strong> last (references Customers & Products)
            </Typography>
          </Alert>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
