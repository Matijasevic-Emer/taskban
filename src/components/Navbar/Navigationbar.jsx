import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";

const Navigationbar = () => {
  const [open, setOpen] = useState(false);
  
  const navLinks = [
    { title: "Inicio", path: "/", icon: <HomeIcon /> },
    { title: "Tableros", path: "/boards", icon: <DashboardIcon /> },
    { title: "Equipo", path: "/team", icon: <GroupIcon /> },
    { title: "Perfil", path: "/profile", icon: <AccountCircleIcon /> },
  ];

  const appBarStyles = {
    display: { xs: "block", sm: "none" },
  };

  const drawerStyles = {
    display: { xs: "block", sm: "none" },
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            sx={appBarStyles}
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </IconButton>
          <a href="/">
            <img src="/logo-arg.png" width={50} alt="Logo" />
          </a>
          <Typography variant="h6" pl={3} flexGrow={1}>
            ᓚTaskBan
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navLinks.map((item) => (
              <Button
                color="inherit"
                key={item.title}
                component="a"
                href={item.path}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={drawerStyles}
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
};

export default Navigationbar;
