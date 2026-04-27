import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
const LandingNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

const links = [
  {
    label: "Home",
    action: () => {
      setActive("Home");
      navigate("/");
    },
  },
  {
    label: "Features",
    action: () => {
      setActive("Features");
      navigate("/features");
    },
  },
  {
    label: "About",
    action: () => {
      setActive("About");
      navigate("/about");
    },
  },
  {
    label: "Contact",
    action: () => {
      setActive("Contact");
      navigate("/contact");
    },
  },
];
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "#ffffff",
        }}
      >
        <Toolbar
          sx={{
            py: 1.5,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT SIDE (LOGO ONLY) */}
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <MonitorHeartIcon sx={{ color: "#0072ff", fontSize: 28 }} />

            <Typography
              sx={{
                fontWeight: 900,
                fontSize: "20px",
                background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HMS
            </Typography>
          </Box>
          {/* RIGHT SIDE (LINKS + REGISTER) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {/* LINKS */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 6 }}>
              {links.map((item) => (
                <Button
                  key={item.label}
                  onClick={item.action}
                  sx={{
                    color: active === item.label ? "#0072ff" : "#2467b8",
                    textTransform: "none",
                    fontWeight: 600,
                    position: "relative",

                    "&::after":
                      active === item.label
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: -4,
                            left: 0,
                            width: "100%",
                            height: "2px",
                            background:
                              "linear-gradient(45deg,#00c6ff,#0072ff)",
                          }
                        : {},

                    "&:hover": {
                      color: "#0072ff",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* REGISTER BUTTON */}
            <Button
              variant="contained"
              onClick={() => navigate("/register-hospital")}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "30px",
                fontWeight: 600,
                textTransform: "none",
                background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                boxShadow: "0 4px 15px ",
                "&:hover": {},
                display: { xs: "none", md: "inline-flex" },
              }}
            >
              Register
            </Button>

            {/* MOBILE MENU */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" }, color: "#0072ff" }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 280,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(180deg,#f8fbff,#eef5ff)",
          }}
        >
          {/* HEADER */}
          <Box
            sx={{
              p: 3,
              pb: 2,
              borderBottom: "1px solid #e6ecf5",
            }}
          >
              <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            <MonitorHeartIcon sx={{ color: "#0072ff", fontSize: 28 }} />

            <Typography
              sx={{
                fontWeight: 900,
                fontSize: "20px",
                background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HMS
            </Typography>
          </Box>

            <Typography
              sx={{
                fontSize: "12px",
                color: "#6b7280",
                mt: 0.5,
              }}
            >
              Welcome 👋
            </Typography>
          </Box>

          {/* LINKS */}
          <List sx={{ px: 2, mt: 1 }}>
            {links.map((item) => (
              <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                  sx={{
                    borderRadius: "12px",
                    px: 2,
                    py: 1.2,
                    transition: "0.2s",

                    "&:hover": {
                      background: "#e6f0ff",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: "#1e3a8a",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* SPACER */}
          <Box sx={{ flexGrow: 1 }} />

          {/* REGISTER BUTTON (BOTTOM FIXED STYLE) */}
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/register-hospital")}
              sx={{
                py: 1.3,
                borderRadius: "30px",
                fontWeight: 600,
                fontSize: "15px",
                background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                boxShadow: "0 10px 25px rgba(0,114,255,0.3)",

                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default LandingNavbar;
