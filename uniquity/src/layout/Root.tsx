import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { AppBar, Box, Container, styled } from '@mui/material';
import Logo from '../assets/logo-no-back.svg';
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Root() {
  return (
    <Container>
      <AppBar position="fixed">
        <Box
          component="img"
          sx={{
            height: 60,
          }}
          alt="Your logo."
          src={Logo}
        />
      </AppBar>
      <Offset />
      <Offset />
      <Outlet />
      <Offset />
      <BottomNav />
    </Container>
  );
}
