import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NavListDrawer = ({ navLinks }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          <ListItem
            sx={{
              justifyContent: "center",
              bgcolor: theme.palette.primary.main,
            }}
          >
            <img src="/logo-arg.png" width={50} alt="Logo" />
          </ListItem>
          {navLinks.map((item) => (
            <ListItem key={item.title}>
              <ListItemButton component="a" href={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};

export default NavListDrawer;
