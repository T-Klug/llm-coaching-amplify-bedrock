import { ArrowLeftOutlined } from '@mui/icons-material';
import { Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Details() {
  const navigate = useNavigate();
  return (
    <Paper style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Typography>Details</Typography>
      <Button
        variant="contained"
        startIcon={<ArrowLeftOutlined />}
        onClick={() => navigate('/home')}
      >
        Back
      </Button>
    </Paper>
  );
}
