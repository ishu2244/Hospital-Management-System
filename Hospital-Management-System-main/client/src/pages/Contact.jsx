import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import MessageIcon from "@mui/icons-material/Message";
import { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_ihgbnjj",
        "template_jv2piti", // 👈 confirm correct ID
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "OF81zYcjIZQXRDlwL",
      )
      .then(() => {
        toast.success("Message sent successfully 🚀");
        setForm({ name: "", email: "", message: "" });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to send ❌");
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #e3f2fd 0%, #f8fbff 50%, #bbdefb 100%)",
        py: 12,
      }}
    >
      <Container maxWidth="lg">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Typography
            variant="h3"
            fontWeight="900"
            textAlign="center"
            sx={{ color: "#0b3c91" }}
          >
            Contact Us
          </Typography>

          <Typography textAlign="center" color="text.secondary" mt={1}>
            Let’s build something amazing together ✨
          </Typography>
        </motion.div>

        <Grid container spacing={6} mt={1}>
          {/* FORM */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card
                sx={{
                  p: 4,
                  borderRadius: 5,
                  background: "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 15px 50px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={3}>
                    Send Message
                  </Typography>

                  <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2.5}>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        label="Your Message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MessageIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <Button
                        type="submit"
                        disabled={loading}
                        sx={{
                          mt: 2,
                          py: 1.4,
                          borderRadius: "30px",
                          fontWeight: 700,
                          fontSize: "15px",
                          color: "#fff",
                          background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                          boxShadow: "0 10px 30px rgba(0,114,255,0.4)",
                          transition: "0.3s",

                          "&:hover": {
                            transform: "translateY(-3px) scale(1.02)",
                            boxShadow: "0 15px 40px rgba(0,114,255,0.6)",
                          },
                        }}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* INFO */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Box display="flex" flexDirection="column" gap={3}>
                {[
                  {
                    icon: <EmailIcon />,
                    title: "Email",
                    value: "support@hms.com",
                  },
                  {
                    icon: <PhoneIcon />,
                    title: "Phone",
                    value: "+91 9876543210",
                  },
                  {
                    icon: <LocationOnIcon />,
                    title: "Location",
                    value: "Mumbai, India",
                  },
                ].map((item, i) => (
                  <Card
                    key={i}
                    sx={{
                      borderRadius: 4,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          width: 45,
                          height: 45,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "linear-gradient(45deg,#00c6ff,#0072ff)",
                          color: "#fff",
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Box>
                        <Typography fontWeight="bold">{item.title}</Typography>
                        <Typography color="text.secondary">
                          {item.value}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
