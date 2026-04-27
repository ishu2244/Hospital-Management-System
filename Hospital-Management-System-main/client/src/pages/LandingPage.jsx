import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import LandingNavbar from "../components/Navbar";

import heroBg from "../public/images/medical-bg.png"
import FeaturesSection from "../components/landing/FeaturesSection";
import ServicesSection from "../components/landing/ServicesSection";
import DoctorsSection from "../components/landing/DoctorsSection";
import CTASection from "../components/landing/CTASection";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>

      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",

          //  Background Image
          backgroundImage: {
            xs: "none",
            md: `url(${heroBg})`,
          },
          backgroundSize: " -10px cover",
          backgroundPosition: "calc(100% + 60px) center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#ffff",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        />

        {/*  CONTENT */}
        <Container
          maxWidth="lg"
          sx={{
            py: 8,
            position: "relative",
            zIndex: 2,
          }}
        >
          <Grid container alignItems="center" sx={{ minHeight: "80vh" }}>
            {/* LEFT CONTENT */}

            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                style={{ marginTop: "60px" }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    color: "#295386",
                    lineHeight: 1.1,
                     fontSize: { xs: "40px", md: "54px" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {t("hero_title")}
                </Typography>

                <Typography
                  sx={{
                    mt: 2,
                    color: "#00acc1",
                    fontSize: "18px",
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {t("hero_subtitle")}
                </Typography>

                <Box
                  sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{
                      px: 5,
                      py: 1.6,
                      borderRadius: "30px",
                      fontWeight: 600,
                      fontSize: "16px",

                      background: "#0974f7",
                      "&:hover": {
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {t("login_existing")}
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            <Box
              sx={{
                mt: 6,
                width: "100%",
                maxWidth: "650px",
                borderRadius: "20px",
                backgroundColor: "#0072ff",
                boxShadow: "0 20px 40px rgba(8, 83, 175, 0.3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 4,
                py: 3,
                mx: { xs: "auto", md: "unset" },
              }}
            >
              {/* ITEM 1 */}
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <Typography sx={{ fontWeight: 800, color: "#fff" }}>
                  50+
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}
                >
                  Collaborators
                </Typography>
              </Box>

              {/* Divider */}
              <Box
                sx={{
                  width: "1px",
                  height: "30px",
                  background: "rgba(255,255,255,0.3)",
                }}
              />

              {/* ITEM 2 */}
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <Typography sx={{ fontWeight: 800, color: "#fff" }}>
                  6
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}
                >
                  Centers
                </Typography>
              </Box>

              {/* Divider */}
              <Box
                sx={{
                  width: "1px",
                  height: "30px",
                  background: "rgba(255,255,255,0.3)",
                }}
              />

              {/* ITEM 3 */}
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <Typography sx={{ fontWeight: 800, color: "#fff" }}>
                  3K+
                </Typography>
                <Typography
                  sx={{ color: "rgba(255,255,255,0.8)", fontSize: "12px" }}
                >
                  Patients
                </Typography>
              </Box>
            </Box>
            {/* RIGHT SIDE EMPTY (kyunki image bg me hai already) */}
            <Grid item xs={12} md={6} />
            <Box sx={{ mt: 5 }}></Box>
          </Grid>
        </Container>
      </Box>

      <FeaturesSection />
      <ServicesSection />
      <CTASection />
    </>
  );
};

export default LandingPage;
