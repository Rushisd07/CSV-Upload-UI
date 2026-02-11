import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { getCustomers, getProducts, getOrders } from '../services/api';
import { formatDate, formatNumber } from '../utils/helpers';

const DataViewer = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const tabs = ['Customers', 'Products', 'Orders'];

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      switch (activeTab) {
        case 0:
          response = await getCustomers(page, rowsPerPage);
          break;
        case 1:
          response = await getProducts(page, rowsPerPage);
          break;
        case 2:
          response = await getOrders(page, rowsPerPage);
          break;
        default:
          return;
      }

      if (response.data.success) {
        setData(response.data.data.content || []);
        setTotalElements(response.data.data.totalElements || 0);
      }
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab, page, rowsPerPage]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderCustomersTable = () => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Code</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Country</strong></TableCell>
            <TableCell><strong>Loyalty Points</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((customer) => (
            <TableRow key={customer.id} hover>
              <TableCell>{customer.customerCode}</TableCell>
              <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.country || 'N/A'}</TableCell>
              <TableCell>{formatNumber(customer.loyaltyPoints)}</TableCell>
              <TableCell>
                <Chip 
                  label={customer.isActive ? 'Active' : 'Inactive'} 
                  color={customer.isActive ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderProductsTable = () => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Code</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Brand</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
            <TableCell><strong>Stock</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id} hover>
              <TableCell>{product.productCode}</TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.brand || 'N/A'}</TableCell>
              <TableCell>${product.unitPrice}</TableCell>
              <TableCell>{formatNumber(product.stockQuantity)}</TableCell>
              <TableCell>
                <Chip 
                  label={product.isActive ? 'Active' : 'Inactive'} 
                  color={product.isActive ? 'success' : 'default'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderOrdersTable = () => (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Order #</strong></TableCell>
            <TableCell><strong>Customer</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Total</strong></TableCell>
            <TableCell><strong>Currency</strong></TableCell>
            <TableCell><strong>Ordered At</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((order) => (
            <TableRow key={order.id} hover>
              <TableCell>{order.orderNumber}</TableCell>
              <TableCell>{order.customer?.customerCode || 'N/A'}</TableCell>
              <TableCell>
                <Chip 
                  label={order.status} 
                  color={
                    order.status === 'DELIVERED' ? 'success' :
                    order.status === 'SHIPPED' ? 'info' :
                    order.status === 'CANCELLED' ? 'error' : 'warning'
                  }
                  size="small"
                />
              </TableCell>
              <TableCell>${order.totalAmount}</TableCell>
              <TableCell>{order.currency}</TableCell>
              <TableCell>{formatDate(order.orderedAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom fontWeight="medium">
          View Uploaded Data
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} />
            ))}
          </Tabs>
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

        {!loading && !error && data.length === 0 && (
          <Alert severity="info">
            No data available. Upload files to see data here.
          </Alert>
        )}

        {!loading && !error && data.length > 0 && (
          <>
            <Paper elevation={0} variant="outlined">
              {activeTab === 0 && renderCustomersTable()}
              {activeTab === 1 && renderProductsTable()}
              {activeTab === 2 && renderOrdersTable()}
            </Paper>

            <TablePagination
              component="div"
              count={totalElements}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DataViewer;
