import { Box, Container, Grid, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import {
  People,
  LocalPharmacy,
  MonitorHeart,
  ReceiptLong,
  Bed,
  EventNote,
} from "@mui/icons-material";
const features = [
  {
    icon: <People />,
    title: "Add & Manage Patients",
    desc: "Quickly register new patients and manage their complete history.",
  },
  {
    icon: <People />,
    title: "Staff Management",
    desc: "Add doctors, nurses, and staff with roles & permissions.",
  },
  {
    icon: <EventNote />,
    title: "Appointment Booking",
    desc: "Schedule and manage patient appointments easily.",
  },
  {
    icon: <MonitorHeart />,
    title: "Patient Records (EMR)",
    desc: "Track vitals, diagnoses, and treatment records digitally.",
  },
  {
    icon: <ReceiptLong />,
    title: "Billing & Payments",
    desc: "Generate invoices and manage payments efficiently.",
  },
  {
    icon: <Bed />,
    title: "Bed & Room Allocation",
    desc: "Track room availability and assign beds in real-time.",
  },
];

export default function FeaturesSection() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        background: "linear-gradient(180deg,#f8fbff,#eef5ff)",
      }}
    >
      <Container maxWidth="lg">
        {/* HEADER */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            fontSize: { xs: "26px", md: "34px" },
          }}
        >
          Powerful Features
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#6b7280",
            mt: 1,
            fontSize: { xs: "14px", md: "16px" },
          }}
        >
          Everything you need to run a modern hospital
        </Typography>

        {/* CARDS */}
        <Grid container spacing={{ xs: 2.5, md: 4 }} sx={{ mt: 4 }}>
          {features.map((f, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: "20px",
                    p: 2.5,
                    height: "100%",
                    background: "rgba(255,255,255,0.7)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 30px rgba(0,114,255,0.08)",
                    transition: "0.3s",

                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 20px 50px rgba(0,114,255,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    {/* ICON CIRCLE */}
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background:
                          "linear-gradient(135deg,#00c6ff,#0072ff)",
                        color: "#fff",
                        mb: 2,
                      }}
                    >
                      {f.icon}
                    </Box>

                    {/* TITLE */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: "17px",
                        mb: 0.5,
                        color: "#1e3a8a",
                      }}
                    >
                      {f.title}
                    </Typography>

                    {/* DESC */}
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "14px",
                        lineHeight: 1.6,
                      }}
                    >
                      {f.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}