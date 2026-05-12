import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  CssBaseline,
  Alert,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    tenantId: "",
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const tenantIdFromUrl = searchParams.get("tenantId");
    if (tenantIdFromUrl) {
      setFormData((prev) => ({
        ...prev,
        tenantId: tenantIdFromUrl,
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.tenantId) {
        setError("Hospital ID is required");
        setLoading(false);
        return;
      }

      localStorage.setItem("tenantId", formData.tenantId);

      const response = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));

        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          background: "#f5f7fb",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            zIndex: 0,
          }}
        >
          <svg viewBox="0 0 1440 320">
            <path
              fill="#0763d3"
              d="M0,192L120,181.3C240,171,480,149,720,154.7C960,160,1200,192,1320,208L1440,224V320H0Z"
            ></path>
          </svg>
        </Box>

        <Container maxWidth="xs">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                borderRadius: "6px",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* TITLE */}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "#0072ff",
                }}
              >
         Hospital Management System
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPass(!showPass)}>
                          {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="Hospital ID"
                  name="tenantId"
                  value={formData.tenantId}
                  onChange={handleChange}
                  margin="dense"
                  size="small"
                />

                

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    mt: 2,
                    py: 1.1,
                    background: "#0072ff",
                    borderRadius: "4px",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      background: "#4455b5",
                    },
                  }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <Typography
                sx={{ mt: 3, fontSize: "13px", textAlign: "center" }}
              >
                New here{" "}
                <Link href="/register-hospital">Create your free account now!</Link>
              </Typography>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Login;