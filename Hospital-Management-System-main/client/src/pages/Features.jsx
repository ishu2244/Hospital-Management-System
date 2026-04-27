import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import PeopleIcon from "@mui/icons-material/People";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SecurityIcon from "@mui/icons-material/Security";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const features = [
  {
    title: "Patient Management",
    desc: "Easily register, update, and track patient records in one place.",
    icon: <PeopleIcon sx={{ fontSize: 40, color: "#0072ff" }} />,
  },
  {
    title: "Medicine Tracking",
    desc: "Manage medicines, stock, and prescriptions efficiently.",
    icon: <LocalPharmacyIcon sx={{ fontSize: 40, color: "#0072ff" }} />,
  },
  {
    title: "Health Monitoring",
    desc: "Track patient vitals and health data in real-time.",
    icon: <MonitorHeartIcon sx={{ fontSize: 40, color: "#0072ff" }} />,
  },
  {
    title: "Appointments",
    desc: "Schedule and manage patient appointments smoothly.",
    icon: <EventNoteIcon sx={{ fontSize: 40, color: "#0072ff" }} />,
  },
  {
    title: "Secure Data",
    desc: "Advanced security ensures patient data is always protected.",
    icon: <SecurityIcon sx={{ fontSize: 40, color: "#0072ff" }} />,
  },
  {
    title: "Analytics Dashboard",
    desc: "Get insights with reports and analytics for better decisions.",
    icon: <AnalyticsIcon sx={{ fontSize: 40, color: "#0072ff" }} />,
  },
];

const Features = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      background:
          "linear-gradient(135deg, #e3f2fd 0%, #f8fbff 50%, #bbdefb 100%)",
        py: 8,
        pt:14
    }}
    >
      <Container maxWidth="lg">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
         <Typography
  variant="h3"
  fontWeight="bold"
  textAlign="center"
  sx={{ color: "#0b3c91" }}
>
  Our Features
</Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            mt={1}
          >
            Powerful tools to manage your hospital efficiently 🚀
          </Typography>
        </motion.div>

        {/* Features Grid */}
        <Grid container spacing={4} mt={4}>
          {features.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    p: 2,
                    height: "100%",
                    background: "#ffffffcc",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <CardContent>
                    {item.icon}

                    <Typography variant="h6" fontWeight="bold" mt={2}>
                      {item.title}
                    </Typography>

                    <Typography color="text.secondary" mt={1}>
                      {item.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Footer */}
        <Box mt={8} textAlign="center">
          <Typography color="text.secondary">
            © 2026 Hospital Management System
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default Features;