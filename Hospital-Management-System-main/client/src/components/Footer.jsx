import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { Facebook, Instagram, LinkedIn, Email } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        pt: 8,
        pb: 4,
        background: "linear-gradient(180deg,#f8fbff,#eef5ff)",
        position: "relative",
      }}
    >
      {/* Glow */}
      <Box
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          background: "rgba(0,114,255,0.1)",
          filter: "blur(100px)",
          top: 0,
          left: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={5}>
          {/* BRAND */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Box
                onClick={() => navigate("/")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  mb: 2,
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

              <Typography sx={{ color: "#6b7280", mb: 2 }}>
                Smart hospital management system designed to simplify healthcare
                operations with modern technology.
              </Typography>

              {/* MINI CTA */}
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  mt: 1,
                  px: 3,
                  py: 1,
                  borderRadius: "30px",
                  background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "13px",

                  "&:hover": {
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </Grid>

          {/* LINKS */}
          <Grid item xs={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "#1e3a8a", fontWeight: 700 }}
              >
                Quick Links
              </Typography>

           {[
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
].map((item, i) => (
  <Typography
    key={i}
    onClick={() => navigate(item.path)}
    sx={{
      mb: 1,
      color: "#6b7280",
      cursor: "pointer",
      transition: "0.3s",

      "&:hover": {
        color: "#0072ff",
        transform: "translateX(6px)",
      },
    }}
  >
    {item.label}
  </Typography>
))}
            </motion.div>
          </Grid>

          {/* CONTACT */}
          <Grid item xs={6} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "#1e3a8a", fontWeight: 700 }}
              >
                Contact
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Email sx={{ mr: 1, color: "#0072ff" }} />
                <Typography sx={{ color: "#6b7280" }}>
                  support@hms.com
                </Typography>
              </Box>

              {/* SOCIAL */}
              <Box sx={{ mt: 2 }}>
                {[Facebook, Instagram, LinkedIn].map((Icon, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      color: "#0072ff",
                      background: "#eaf2ff",
                      mx: 0.5,
                      transition: "0.3s",

                      "&:hover": {
                        background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                        color: "#fff",
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    <Icon />
                  </IconButton>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* BOTTOM */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: "1px solid #e5eaf2",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography sx={{ color: "#9ca3af", fontSize: "14px" }}>
            © {new Date().getFullYear()} HMS
          </Typography>

          <Typography sx={{ color: "#9ca3af", fontSize: "14px" }}>
            Privacy • Terms • Support
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
