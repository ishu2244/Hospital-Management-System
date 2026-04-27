import { Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import InfoIcon from "@mui/icons-material/Info";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";

const About = () => {
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
          transition={{ duration: 0.6 }}
        >
        <Typography
  variant="h3"
  fontWeight="bold"
  textAlign="center"
  gutterBottom
  sx={{ color: "#0b3c91" }}   // dark blue
>
  About Our System
</Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary">
            Smart Hospital Management System for better healthcare 🚀
          </Typography>
        </motion.div>

        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Box mt={6}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Who We Are
            </Typography>
            <Typography color="text.secondary">
              We provide a modern hospital management solution that helps manage patients,
              staff, medicines, and appointments efficiently. Our system is designed
              to simplify healthcare operations and improve patient care.
            </Typography>
          </Box>
        </motion.div>

        {/* Cards Section */}
        <Grid container spacing={4} mt={4}>
          
          {/* Mission */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ borderRadius: 4, p: 2 }}>
                <CardContent>
                  <EmojiObjectsIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" fontWeight="bold" mt={2}>
                    Our Mission
                  </Typography>
                  <Typography color="text.secondary">
                    To digitize healthcare systems and make hospital operations faster,
                    smarter, and more efficient.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Vision */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ borderRadius: 4, p: 2 }}>
                <CardContent>
                  <InfoIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" fontWeight="bold" mt={2}>
                    Our Vision
                  </Typography>
                  <Typography color="text.secondary">
                    To build a future where hospitals run seamlessly with technology,
                    reducing workload and improving care.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Team */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card sx={{ borderRadius: 4, p: 2 }}>
                <CardContent>
                  <GroupsIcon color="primary" sx={{ fontSize: 40 }} />
                  <Typography variant="h6" fontWeight="bold" mt={2}>
                    Our Team
                  </Typography>
                  <Typography color="text.secondary">
                    A passionate team of developers focused on delivering
                    high-quality healthcare solutions.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Footer Line */}
        <Box mt={8} textAlign="center">
          <Typography color="text.secondary">
            © 2026 Hospital Management System. All rights reserved.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default About;