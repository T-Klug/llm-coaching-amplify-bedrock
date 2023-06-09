import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

export default function Root() {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}
