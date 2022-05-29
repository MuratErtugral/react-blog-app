
import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';  
import MenuItem from '@mui/material/MenuItem';
import Icon from '../assets/blogicon.jpg'
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logOut } from '../helpers/firebase';
import { AuthContext } from '../contexts/AuthContext';




const Navbar = () => {
  const navigate = useNavigate();
  const {currentUser}= useContext(AuthContext)
  
  // const currentUser = true
  
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <Link to={"/"}>
              <img src= {Icon} alt="logo" width= "50px" height="50px" style={{borderRadius: "50px"}} />
            </Link>
          </Typography>
          
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Link to={"/"}>
              <img src= {Icon} alt="logo" width= "25px" height="25px" style={{borderRadius: "25px"}}/>
            </Link>
          </Typography>
          
          <Box  sx={{ flexGrow: 11, display: { md: 'flex'} ,  justifyContent:"center"  }}>
            <h2>Stravska Blog</h2>
          </Box>
          

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 , color: "white" }}>
                {currentUser ? <p></p> : "" }
                <AccountCircleIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {currentUser ? (<div> 
              <MenuItem onClick={() => {navigate("/profil"); setAnchorElUser(false)}}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={() => {navigate("/newblog"); setAnchorElUser(null)}}>
                <Typography textAlign="center">New</Typography>
              </MenuItem> 
              <MenuItem onClick={() => {logOut() ;navigate("/"); setAnchorElUser(null)}}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem> </div>) : 
              <div><MenuItem onClick={() => {navigate("/login");setAnchorElUser(null)}}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem onClick={() => {navigate("/register");setAnchorElUser(null)}}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem></div>
                }
              
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;