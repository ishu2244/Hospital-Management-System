import { Box, Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 12 },
        background: "linear-gradient(180deg,#f8fbff,#eef5ff)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle glow blobs */}
      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          background: "rgba(0,114,255,0.15)",
          filter: "blur(100px)",
          top: "-40px",
          left: "-40px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          background: "rgba(0,198,255,0.15)",
          filter: "blur(100px)",
          bottom: "-40px",
          right: "-40px",
        }}
      />

      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              textAlign: "center",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(12px)",
              borderRadius: "24px",
              p: { xs: 3, md: 7 },
              boxShadow: "0 25px 70px rgba(0,0,0,0.08)",
              border: "1px solid #eef2f7",
              position: "relative",
            }}
          >
            {/* badge */}
            <Box
              sx={{
                display: "inline-block",
                px: 2,
                py: 0.5,
                borderRadius: "999px",
                background: "#e6f0ff",
                color: "#0072ff",
                fontSize: "12px",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Trusted by modern clinics
            </Box>

            {/* heading */}
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: { xs: "24px", md: "36px" },
                color: "#1e3a8a",
              }}
            >
              Start Managing Your Hospital Today
            </Typography>

            {/* subtext */}
            <Typography
              sx={{
                mt: 1.5,
                color: "#6b7280",
                fontSize: { xs: "14px", md: "16px" },
                maxWidth: "520px",
                mx: "auto",
              }}
            >
              Add patients, manage staff, track records — all in one powerful
              system designed for hospitals.
            </Typography>

            {/* buttons */}
            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  px: 5,
                  py: 1.6,
                  borderRadius: "30px",
                  background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  boxShadow: "0 12px 30px rgba(0,114,255,0.3)",

                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 18px 40px rgba(0,114,255,0.4)",
                  },
                }}
              >
                Get Started
              </Button>

              <Button
                onClick={() => navigate("/register-hospital")}
                variant="outlined"
                sx={{
                  px: 5,
                  py: 1.6,
                  borderRadius: "30px",
                  fontWeight: 700,
                  borderColor: "#0072ff",
                  color: "#0072ff",

                  "&:hover": {
                    background: "#eef5ff",
                  },
                }}
              >
                Register Hospital
              </Button>
            </Box>

            {/* small trust text */}
            <Typography
              sx={{
                mt: 3,
                fontSize: "12px",
                color: "#9ca3af",
              }}
            >
              No setup hassle • Secure • Easy to use
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}