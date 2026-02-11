import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  IconButton,
  Stack,
  Alert,
  Divider,
  Grid,
} from '@mui/material';
import {
  Refresh,
  CheckCircle,
  Error as ErrorIcon,
  HourglassEmpty,
  PlayArrow,
} from '@mui/icons-material';
import { getJobStatus } from '../services/api';
import { formatDate, getStatusColor, formatNumber } from '../utils/helpers';

const JobTracker = ({ jobs }) => {
  const [jobStatuses, setJobStatuses] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchJobStatus = async (jobId) => {
    try {
      const response = await getJobStatus(jobId);
      if (response.data.success) {
        setJobStatuses(prev => ({
          ...prev,
          [jobId]: response.data.data
        }));
      }
    } catch (error) {
      console.error(`Failed to fetch status for job ${jobId}`, error);
    }
  };

  const refreshAllJobs = async () => {
    setLoading(true);
    const promises = jobs.map(job => fetchJobStatus(job.jobId));
    await Promise.all(promises);
    setLoading(false);
  };

  useEffect(() => {
    // Auto-refresh every 3 seconds for processing jobs
    const interval = setInterval(() => {
      jobs.forEach(job => {
        const status = jobStatuses[job.jobId]?.status;
        if (status === 'PROCESSING' || status === 'PENDING') {
          fetchJobStatus(job.jobId);
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [jobs, jobStatuses]);

  useEffect(() => {
    // Initial fetch
    jobs.forEach(job => fetchJobStatus(job.jobId));
  }, [jobs]);

  const getStatusIcon = (status) => {
    const icons = {
      PENDING: <HourglassEmpty />,
      PROCESSING: <PlayArrow />,
      COMPLETED: <CheckCircle />,
      PARTIAL: <ErrorIcon />,
      FAILED: <ErrorIcon />,
    };
    return icons[status] || <HourglassEmpty />;
  };

  if (jobs.length === 0) {
    return (
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload Jobs
          </Typography>
          <Alert severity="info">
            No upload jobs yet. Upload a file to see job tracking here.
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Upload Jobs ({jobs.length})
          </Typography>
          <IconButton onClick={refreshAllJobs} disabled={loading} color="primary">
            <Refresh sx={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          </IconButton>
        </Box>

        <Stack spacing={2}>
          {jobs.map((job, index) => {
            const status = jobStatuses[job.jobId] || job;
            const isProcessing = status.status === 'PROCESSING' || status.status === 'PENDING';

            return (
              <Box key={job.jobId}>
                {index > 0 && <Divider sx={{ my: 2 }} />}
                
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {status.fileName}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(status.status)}
                      label={status.status}
                      color={getStatusColor(status.status)}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Job ID: {job.jobId}
                  </Typography>

                  {/* Progress Bar */}
                  {isProcessing && (
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption">
                          Progress: {status.processedRows || 0} / {status.totalRows || 0} rows
                        </Typography>
                        <Typography variant="caption">
                          {status.progressPercent?.toFixed(1) || 0}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={status.progressPercent || 0}
                        sx={{ height: 8, borderRadius: 1 }}
                      />
                    </Box>
                  )}

                  {/* Stats Grid */}
                  <Grid container spacing={1} sx={{ mt: 1 }}>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="text.secondary">
                        Total Rows
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {formatNumber(status.totalRows)}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="success.main">
                        Processed
                      </Typography>
                      <Typography variant="body2" fontWeight="medium" color="success.main">
                        {formatNumber(status.processedRows)}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="caption" color="error.main">
                        Failed
                      </Typography>
                      <Typography variant="body2" fontWeight="medium" color="error.main">
                        {formatNumber(status.failedRows)}
                      </Typography>
                    </Grid>
                  </Grid>

                  {/* Timestamps */}
                  <Box sx={{ mt: 1 }}>
                    {status.startedAt && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        Started: {formatDate(status.startedAt)}
                      </Typography>
                    )}
                    {status.completedAt && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        Completed: {formatDate(status.completedAt)}
                      </Typography>
                    )}
                  </Box>

                  {/* Error Message */}
                  {status.errorMessage && (
                    <Alert severity="error" sx={{ mt: 1 }}>
                      {status.errorMessage}
                    </Alert>
                  )}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default JobTracker;
