import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Button,
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
  LocalHospital as HospitalIcon,
  Today as TodayIcon,
  Assignment as PrescriptionIcon,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import api from "../api/axios";

const DRAWER_WIDTH = 260;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Patients", icon: <PeopleIcon />, path: "/patients" },
];

const COLORS = ["#4f46e5", "#06b6d4", "#22c55e"];
const MotionCard = motion(Card);

const Dashboard = () => {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalPatients: 0,
    todayPatients: 0,
    pendingPrescriptions: 0,
    patientsByGender: [],
    patientsLast7Days: [],
    recentVitals: [],
  });

  const [staffDialogOpen, setStaffDialogOpen] = useState(false);
  const [staffForm, setStaffForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [staffLoading, setStaffLoading] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/stats/dashboard");
      if (res.data.success) setStats(res.data.data);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleStaffDialogClose = () => {
    setStaffDialogOpen(false);
    setStaffForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const handleStaffFormChange = (e) => {
    setStaffForm({
      ...staffForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleStaffSubmit = async () => {
    try {
      if (
        !staffForm.firstName ||
        !staffForm.lastName ||
        !staffForm.email ||
        !staffForm.password ||
        !staffForm.role
      ) {
        return toast.error("All fields are required");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(staffForm.email)) {
        return toast.error("Invalid email");
      }

      if (staffForm.password.length < 6) {
        return toast.error("Password must be at least 6 characters");
      }

      setStaffLoading(true);

      const res = await api.post("/auth/register-staff", staffForm);

      if (res.data.success) {
        toast.success("Staff created successfully");
        handleStaffDialogClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating staff");
    } finally {
      setStaffLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const tenantId = localStorage.getItem("tenantId") || "Hospital";
  const isHospitalAdmin = user.role === "HOSPITAL_ADMIN";

  const drawer = (
    <Box>
      <Toolbar
        sx={{
          background: "linear-gradient(135deg,#4f46e5,#06b6d4)",
          color: "#fff",
        }}
      >
        HMS
      </Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon sx={{ color: "#4f46e5" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const StatCard = ({ title, value, icon, color }) => (
    <MotionCard
      whileHover={{ scale: 1.05 }}
      sx={{
        borderRadius: 4,
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.8)",
      }}
    >
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography>{title}</Typography>
          <Typography variant="h4" sx={{ color, fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>
        {icon}
      </CardContent>
    </MotionCard>
  );

  return (
    <Box sx={{ display: "flex", background: "#eef2ff" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          background: "#4f46e5",
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setMobileOpen(!mobileOpen)}
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography sx={{ flexGrow: 1 }}>Dashboard</Typography>

          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Toolbar />

        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight="bold">
            Welcome {user.firstName}
          </Typography>

          {isHospitalAdmin && (
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => setStaffDialogOpen(true)}
              sx={{ my: 2 }}
            >
              Add Staff Member
            </Button>
          )}

          {loading ? (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Stats */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <StatCard
                    title="Patients"
                    value={stats.totalPatients}
                    icon={<HospitalIcon />}
                    color="#4f46e5"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <StatCard
                    title="Today"
                    value={stats.todayPatients}
                    icon={<TodayIcon />}
                    color="#06b6d4"
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <StatCard
                    title="Prescriptions"
                    value={stats.pendingPrescriptions}
                    icon={<PrescriptionIcon />}
                    color="#22c55e"
                  />
                </Grid>
              </Grid>

              {/* Charts */}
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography>Patients by Gender</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={stats.patientsByGender} dataKey="count">
                          {stats.patientsByGender.map((_, i) => (
                            <Cell key={i} fill={COLORS[i]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography>Last 7 Days</Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={stats.patientsLast7Days}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4f46e5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </Box>

      {/* STAFF DIALOG */}
   <Dialog
  open={staffDialogOpen}
  onClose={handleStaffDialogClose}
  maxWidth="sm"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: 4,
      p: 1,
    },
  }}
>
  <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
    Add Staff Member
    <Typography variant="body2" color="text.secondary">
      Fill details to create new staff
    </Typography>
  </DialogTitle>

  <DialogContent>
    <Grid container spacing={2} sx={{ mt: 1 }}>

      {/* First Name */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={staffForm.firstName}
          onChange={handleStaffFormChange}
          variant="outlined"
        />
      </Grid>

      {/* Last Name */}
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={staffForm.lastName}
          onChange={handleStaffFormChange}
        />
      </Grid>

      {/* Email */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          value={staffForm.email}
          onChange={handleStaffFormChange}
        />
      </Grid>

      {/* Password */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={staffForm.password}
          onChange={handleStaffFormChange}
          helperText="Minimum 6 characters"
        />
      </Grid>

      {/* Role */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            name="role"
            value={staffForm.role}
            label="Role"
            onChange={handleStaffFormChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="DOCTOR">Doctor</MenuItem>
            <MenuItem value="NURSE">Nurse</MenuItem>
            <MenuItem value="PHARMACIST">Pharmacist</MenuItem>
            <MenuItem value="LAB_TECHNICIAN">Lab Technician</MenuItem>
            <MenuItem value="RECEPTIONIST">Receptionist</MenuItem>
          </Select>
        </FormControl>
      </Grid>

    </Grid>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 2 }}>
    <Button
      onClick={handleStaffDialogClose}
      sx={{ borderRadius: 2 }}
    >
      Cancel
    </Button>

    <Button
      onClick={handleStaffSubmit}
      variant="contained"
      disabled={staffLoading}
      sx={{
        borderRadius: 2,
        px: 3,
        background: 'linear-gradient(135deg,#4f46e5,#06b6d4)',
      }}
    >
      {staffLoading ? <CircularProgress size={22} color="inherit" /> : "Create Staff"}
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default Dashboard;
