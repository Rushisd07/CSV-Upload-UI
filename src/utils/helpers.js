// Format file size to human readable
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// Format date to readable string
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Get status color
export const getStatusColor = (status) => {
  const statusColors = {
    PENDING: 'info',
    PROCESSING: 'warning',
    COMPLETED: 'success',
    PARTIAL: 'warning',
    FAILED: 'error',
  };
  return statusColors[status] || 'default';
};

// Validate file
export const validateFile = (file, allowedExtensions) => {
  if (!file) return { valid: false, error: 'No file selected' };
  
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return { 
      valid: false, 
      error: `Invalid file type. Allowed: ${allowedExtensions.join(', ')}` 
    };
  }
  
  // Max 2GB
  const maxSize = 2 * 1024 * 1024 * 1024;
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: 'File size exceeds 2GB limit' 
    };
  }
  
  return { valid: true };
};

// Format number with commas
export const formatNumber = (num) => {
  return num?.toLocaleString() || '0';
};
