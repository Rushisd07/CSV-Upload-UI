import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Alert,
  IconButton,
} from '@mui/material';
import {
  People,
  Inventory,
  ShoppingCart,
  Category,
  Refresh,
} from '@mui/icons-material';
import { getDataSummary } from '../services/api';
import { formatNumber } from '../utils/helpers';

const DataSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getDataSummary();
      if (response.data.success) {
        setSummary(response.data.data);
      }
    } catch (err) {
      setError('Failed to load data summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const summaryCards = [
    {
      title: 'Customers',
      count: summary?.totalCustomers || 0,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      bgColor: '#e3f2fd',
    },
    {
      title: 'Products',
      count: summary?.totalProducts || 0,
      icon: <Inventory sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
      bgColor: '#e8f5e9',
    },
    {
      title: 'Orders',
      count: summary?.totalOrders || 0,
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
      bgColor: '#fff3e0',
    },
    {
      title: 'Categories',
      count: summary?.totalCategories || 0,
      icon: <Category sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
      bgColor: '#f3e5f5',
    },
  ];

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="medium">
            Database Summary
          </Typography>
          <IconButton onClick={fetchSummary} disabled={loading} color="primary">
            <Refresh sx={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          </IconButton>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && (
          <Grid container spacing={3}>
            {summaryCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: card.bgColor,
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3,
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {card.title}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: card.color }}>
                          {formatNumber(card.count)}
                        </Typography>
                      </Box>
                      <Box sx={{ color: card.color, opacity: 0.8 }}>
                        {card.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {!loading && !error && summary && (
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              Database is ready. Upload CSV/JSON files to populate more data.
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

// Add spin animation to global styles
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default DataSummary;
