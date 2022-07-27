import { Drawer, IconButton, List, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import asset from "../../assets";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const sidebarWidth = 250;
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100%",
        "& > div": { borderRight: "none" },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: asset.colors.secondary,
          color: "white",
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "20px",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: "10px" }}>
          <ListItem>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                Favourites
              </Typography>
            </Box>
          </ListItem>
        </Box>
        <Box sx={{ paddingTop: "10px" }}>
          <ListItem>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                Private
              </Typography>
              <IconButton>
                <AddBoxOutlinedIcon />
              </IconButton>
            </Box>
          </ListItem>
        </Box>
      </List>
    </Drawer>
  );
};

export default Sidebar;
