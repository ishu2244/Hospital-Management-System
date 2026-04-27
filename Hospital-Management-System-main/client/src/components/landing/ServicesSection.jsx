import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import {
  Dashboard,
  People,
  PersonAdd,
  Event,
  ReceiptLong,
  Bed,
} from "@mui/icons-material";

import dashboardImg from "../../public/images/doctor.png";

const services = [
  { title: "Login & Dashboard", icon: <Dashboard /> },
  { title: "Add & Manage Staff", icon: <People /> },
  { title: "Register Patients", icon: <PersonAdd /> },
  { title: "Appointments", icon: <Event /> },
  { title: "Billing & Payments", icon: <ReceiptLong /> },
  { title: "Beds & Rooms", icon: <Bed /> },
];

export default function ServicesSection() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "linear-gradient(180deg,#ffffff,#eef5ff)",
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            textAlign: "center",
            fontSize: { xs: "26px", md: "36px" },
          }}
        >
          How It Works
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#6b7280",
            mt: 1,
          }}
        >
          Manage your hospital in a few simple steps
        </Typography>

        <Grid container spacing={6} sx={{ mt: 5 }} alignItems="center">
          
          {/* LEFT */}
          <Grid item xs={12} md={6}>
            {services.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3,
                    p: 2,
                    borderRadius: "12px",
                    transition: "0.3s",

                    "&:hover": {
                      background: "#f1f6ff",
                    },
                  }}
                >
                  {/* ICON */}
                  <Box
                    sx={{
                      width: 45,
                      height: 45,
                      borderRadius: "12px",
                      background:
                        "linear-gradient(135deg,#00c6ff,#0072ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      mr: 2,
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* TEXT */}
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: "#1e3a8a",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "#6b7280",
                      }}
                    >
                      Manage efficiently with real-time updates
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Grid>

          {/* RIGHT IMAGE */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
                }}
              >
                <Box
                  component="img"
                  src={dashboardImg}
                  alt="doctor"
                  sx={{
                    width: "100%",
  height: { xs: "260px", md: "600px" },
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: "20px",
                  }}
                />

                {/* OVERLAY CARD */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    px: 3,
                    py: 1.5,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }}>
                    3000+ Patients Managed
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#6b7280" }}>
                    Trusted by hospitals
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}