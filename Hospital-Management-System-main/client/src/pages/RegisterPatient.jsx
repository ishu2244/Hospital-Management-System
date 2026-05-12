import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Alert,
  Divider,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

// 💙 BLUE THEME
const bg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #e0f2fe, #f8fafc)",
  py: { xs: 2, md: 5 },
};

const card = {
  p: { xs: 2.5, md: 5 },
  borderRadius: "20px",
  backdropFilter: "blur(10px)",
  background: "rgba(255,255,255,0.9)",
  boxShadow: "0 10px 40px rgba(59,130,246,0.15)",
};

const input = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    background: "#f8fafc",
  },
};

const primaryBtn = {
  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
  color: "#fff",
  borderRadius: "12px",
  px: 4,
  py: 1.4,
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 6px 20px rgba(59,130,246,0.4)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(59,130,246,0.5)",
  },
};

// 🎬 Animation
const containerAnim = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const RegisterPatient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    address: "",
    bloodGroup: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        dob: formData.dob,
        gender: formData.gender,
        phone: formData.phone.trim(),
        address: formData.address.trim() || undefined,
        bloodGroup: formData.bloodGroup.trim().toUpperCase() || undefined,
        emergencyContact: {
          name: formData.emergencyContactName.trim() || undefined,
          phone: formData.emergencyContactPhone.trim() || undefined,
        },
      };

      if (!payload.emergencyContact.name && !payload.emergencyContact.phone) {
        payload.emergencyContact = undefined;
      }

      const res = await api.post("/patients", payload);

      if (res.data.success) {
        toast.success(`Patient ID: ${res.data.data.patientId}`);
        navigate(-1); // auto back after success
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registration failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={bg}>
 <Container
  maxWidth="md"
  sx={{
    mt: {
      xs: 8,   // mobile
      sm: 8,   // tablet
      md: 5,   // desktop
    },
  }}
>

        <motion.div variants={containerAnim} initial="hidden" animate="show">
          <Paper sx={card}>

            {/* 🔙 HEADER */}
            <motion.div variants={itemAnim}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton
                  onClick={() => navigate(-1)}
                  sx={{
                    mr: 1,
                    background: "#e0f2fe",
                    "&:hover": { background: "#bae6fd" },
                  }}
                >
                  <ArrowBack />
                </IconButton>

                <Typography variant="h4" fontWeight={700}>
                  New Patient
                </Typography>
              </Box>

              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Enter patient details
              </Typography>
            </motion.div>

            {error && (
              <motion.div variants={itemAnim}>
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>

                {["firstName", "lastName"].map((field) => (
                  <Grid item xs={12} sm={6} key={field}>
                    <motion.div variants={itemAnim}>
                      <TextField
                        fullWidth
                        label={field === "firstName" ? "First Name" : "Last Name"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        sx={input}
                      />
                    </motion.div>
                  </Grid>
                ))}

                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemAnim}>
                    <TextField
                      fullWidth
                      type="date"
                      label="DOB"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                      required
                      sx={input}
                    />
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemAnim}>
                    <TextField
                      fullWidth
                      select
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      sx={input}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemAnim}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      sx={input}
                    />
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemAnim}>
                    <TextField
                      fullWidth
                      label="Blood Group"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      sx={input}
                    />
                  </motion.div>
                </Grid>

                <Grid item xs={12}>
                  <motion.div variants={itemAnim}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      sx={input}
                    />
                  </motion.div>
                </Grid>

                <Grid item xs={12}>
                  <motion.div variants={itemAnim}>
                    <Divider sx={{ my: 2 }} />
                    <Typography fontWeight={600}>
                      Emergency Contact
                    </Typography>
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemAnim}>
                    <TextField
                      fullWidth
                      label="Contact Name"
                      name="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={handleChange}
                      sx={input}
                    />
                  </motion.div>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <motion.div variants={itemAnim}>
                    <TextField
                      fullWidth
                      label="Contact Phone"
                      name="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={handleChange}
                      sx={input}
                    />
                  </motion.div>
                </Grid>

                <Grid item xs={12}>
                  <motion.div variants={itemAnim}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 3,
                      }}
                    >
                      <Button
                        type="submit"
                        sx={primaryBtn}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Register Patient"}
                      </Button>
                    </Box>
                  </motion.div>
                </Grid>

              </Grid>
            </form>

          </Paper>
        </motion.div>

      </Container>
    </Box>
  );
};

export default RegisterPatient;