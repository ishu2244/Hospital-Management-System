import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
} from "@mui/material";

import {
  Add as AddIcon,
  ArrowBack,
} from "@mui/icons-material";

import { toast } from "react-toastify";
import api from "../api/axios";

// 💙 BLUISH LIGHT THEME
const bg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
  py: 4,
};

const card = {
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(59,130,246,0.1)",
  color: "#1e293b",
};

const primaryBtn = {
  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
  color: "#fff",
  borderRadius: "10px",
  textTransform: "none",
  px: 2,
  "&:hover": {
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  },
};

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [patient, setPatient] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labResults, setLabResults] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [p, v, pr, l] = await Promise.all([
        api.get(`/patients/${id}`),
        api.get(`/vitals/patient/${id}`),
        api.get(`/prescriptions/patient/${id}`),
        api.get(`/lab/patient/${id}`),
      ]);

      setPatient(p.data.data);
      setVitals(v.data.data || []);
      setPrescriptions(pr.data.data || []);
      setLabResults(l.data.data || []);
    } catch (err) {
      setError("Error loading patient");
      toast.error("Error loading patient");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={bg}>
        <Container>
          <Box sx={{ textAlign: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    );
  }

  if (error || !patient) {
    return (
      <Box sx={bg}>
        <Container>
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={bg}>
      <Container maxWidth="xl">

        {/* 🔥 HEADER WITH BACK BUTTON */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              background: "#e0e7ff",
              "&:hover": { background: "#c7d2fe" },
            }}
          >
            <ArrowBack />
          </IconButton>

          <Typography variant="h5" fontWeight={600}>
            Patient Details
          </Typography>
        </Box>

        {/* PATIENT INFO */}
        <Paper sx={{ ...card, p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Patient Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography color="text.secondary">Name</Typography>
              <Typography fontWeight={500}>
                {patient.firstName} {patient.lastName}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography color="text.secondary">Patient ID</Typography>
              <Typography fontWeight={500}>{patient.patientId}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography color="text.secondary">Gender</Typography>
              <Typography fontWeight={500}>{patient.gender}</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography color="text.secondary">Phone</Typography>
              <Typography fontWeight={500}>{patient.phone}</Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* MAIN */}
        <Paper sx={{ ...card, p: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, v) => setTabValue(v)}
            sx={{
              mb: 2,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
              },
            }}
          >
            <Tab label="Overview" />
            <Tab label="Vitals" />
            <Tab label="Prescriptions" />
            <Tab label="Labs" />
          </Tabs>

          {/* OVERVIEW */}
          {tabValue === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card sx={card}>
                  <CardContent>
                    <Typography color="text.secondary">
                      Total Vitals
                    </Typography>
                    <Typography variant="h5">
                      {vitals.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card sx={card}>
                  <CardContent>
                    <Typography color="text.secondary">
                      Prescriptions
                    </Typography>
                    <Typography variant="h5">
                      {prescriptions.length}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* VITALS */}
          {tabValue === 1 && (
            <Box sx={{ mt: 2 }}>
              <Button sx={primaryBtn} startIcon={<AddIcon />}>
                Add Vitals
              </Button>

              <TableContainer sx={{ mt: 2 }}>
                <Table>
                  <TableHead sx={{ background: "#eef2ff" }}>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>BP</TableCell>
                      <TableCell>Pulse</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vitals.map((v) => (
                      <TableRow key={v._id}>
                        <TableCell>{v.createdAt}</TableCell>
                        <TableCell>{v.bloodPressure}</TableCell>
                        <TableCell>{v.pulse}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* PRESCRIPTIONS */}
          {tabValue === 2 && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {prescriptions.map((p) => (
                <Grid item xs={12} sm={6} key={p._id}>
                  <Card sx={card}>
                    <CardContent>
                      <Typography fontWeight={500}>
                        {p.diagnosis}
                      </Typography>

                      <Chip
                        label={p.status}
                        sx={{
                          mt: 1,
                          background:
                            p.status === "DISPENSED"
                              ? "#dcfce7"
                              : "#fef3c7",
                          color:
                            p.status === "DISPENSED"
                              ? "#166534"
                              : "#92400e",
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* LABS */}
          {tabValue === 3 && (
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead sx={{ background: "#eef2ff" }}>
                  <TableRow>
                    <TableCell>Test</TableCell>
                    <TableCell>Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {labResults.map((l) => (
                    <TableRow key={l._id}>
                      <TableCell>{l.testName}</TableCell>
                      <TableCell>{l.result}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PatientDetails;