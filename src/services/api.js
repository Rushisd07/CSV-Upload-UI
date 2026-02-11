import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// FILE UPLOAD SERVICES
// ============================================

export const uploadCsvFile = async (file, dataType, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('dataType', dataType);

  return api.post('/upload/csv', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });
};

export const uploadJsonFile = async (file, dataType, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('dataType', dataType);

  return api.post('/upload/json', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });
};

export const getJobStatus = async (jobId) => {
  return api.get(`/upload/jobs/${jobId}`);
};

// ============================================
// DATA QUERY SERVICES
// ============================================

export const getDataSummary = async () => {
  return api.get('/data/summary');
};

export const getCustomers = async (page = 0, size = 20) => {
  return api.get(`/data/customers?page=${page}&size=${size}`);
};

export const getProducts = async (page = 0, size = 20) => {
  return api.get(`/data/products?page=${page}&size=${size}`);
};

export const getOrders = async (page = 0, size = 20) => {
  return api.get(`/data/orders?page=${page}&size=${size}`);
};

export const getCategories = async () => {
  return api.get('/data/categories');
};

export default api;
