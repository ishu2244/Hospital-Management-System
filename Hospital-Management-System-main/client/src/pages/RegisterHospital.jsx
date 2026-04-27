import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Divider,
  CssBaseline,
} from "@mui/material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api/axios";

const RegisterHospital = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hospitalName: "",
    licenseNumber: "",
    address: "",
    adminName: "",
    adminEmail: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successDialog, setSuccessDialog] = useState(false);
  const [registeredTenantId, setRegisteredTenantId] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res1 = await api.post("/tenants/register", formData);

      if (res1.data.success) {
        setRegisteredTenantId(res1.data.data.tenantId);
        setSuccessDialog(true);
        toast.success("Hospital registered successfully!");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setSuccessDialog(false);
    navigate(`/login?tenantId=${registeredTenantId}`);
  };

  return (
    <>
      <CssBaseline />

      {/* 🔵 Light Background */}
      <Box
        sx={{
          
          minHeight: "100vh",
          background: "#f5f7fb",
          display: "flex",
          alignItems: "center",
            pt: 8,
        }}
      >
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Card
              sx={{
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* TITLE */}
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    fontWeight: 700,
                    mb: 1,
                    color: "#556cd6",
                  }}
                >
                  Register Hospital
                </Typography>

                <Typography
                  sx={{
                    textAlign: "center",
                    color: "gray",
                    mb: 4,
                  }}
                >
                  Create your hospital account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                  <Typography sx={{ mb: 2, fontWeight: 600 }}>
                    Hospital Info
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Hospital Name" name="hospitalName" onChange={handleChange} required size="small" />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField fullWidth label="License Number" name="licenseNumber" onChange={handleChange} required size="small" />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField fullWidth label="Address" name="address" onChange={handleChange} required size="small" />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 4 }} />

                  <Typography sx={{ mb: 2, fontWeight: 600 }}>
                    Admin Info
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth label="Full Name" name="adminName" onChange={handleChange} required size="small" />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField fullWidth label="Email" name="adminEmail" onChange={handleChange} required size="small" />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField fullWidth label="Password" type="password" name="password" onChange={handleChange} required size="small" />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => navigate("/")}
                      sx={{
                        borderColor: "#556cd6",
                        color: "#556cd6",
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        background: "#556cd6",
                        "&:hover": {
                          background: "#4455b5",
                        },
                      }}
                    >
                      {loading ? "Registering..." : "Register"}
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </Box>

      <Dialog open={successDialog} onClose={handleDialogClose}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your Hospital ID:
            <br />
            <b>{registeredTenantId}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Go to Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterHospital;