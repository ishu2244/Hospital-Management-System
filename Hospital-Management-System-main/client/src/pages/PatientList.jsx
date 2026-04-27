import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  ArrowBack,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import api from "../api/axios";

// 🌞 LIGHT + BLUISH THEME
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
  px: 3,
  textTransform: "none",
  fontWeight: 500,
  "&:hover": {
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
  },
};

const PatientList = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    return new Date().getFullYear() - birthDate.getFullYear();
  };

  const fetchPatients = async (search = "") => {
    try {
      setLoading(true);
      const res = await api.get("/patients", {
        params: search ? { search } : {},
      });
      setPatients(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch patients");
      toast.error("Error loading patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const columns = [
    { field: "patientId", headerName: "ID", flex: 1 },

    {
      field: "name",
      headerName: "Patient",
      flex: 1.2,
      valueGetter: (params) =>
        `${params?.row?.firstName || ""} ${params?.row?.lastName || ""}`,
    },

    {
      field: "age",
      headerName: "Age",
      flex: 0.5,
      valueGetter: (params) =>
        params?.row?.dob ? calculateAge(params.row.dob) : "N/A",
    },

    {
      field: "gender",
      headerName: "Gender",
      flex: 0.6,
      valueGetter: (params) => params?.row?.gender || "N/A",
    },

    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      valueGetter: (params) => params?.row?.phone || "N/A",
    },

    {
      field: "action",
      headerName: "Action",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Button
          size="small"
          onClick={() => navigate(`/patients/${params.row._id}`)}
          sx={primaryBtn}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Box sx={bg}>
      <Container maxWidth="xl">
        <Paper sx={{ ...card, p: 3 }}>

          {/* 🔥 HEADER WITH BACK BUTTON */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  background: "#e0e7ff",
                  "&:hover": { background: "#c7d2fe" },
                }}
              >
                <ArrowBack />
              </IconButton>

              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                Patient Directory
              </Typography>
            </Box>

            <Button
              startIcon={<PersonAddIcon />}
              onClick={() => navigate("/register-patient")}
              sx={primaryBtn}
            >
              Add Patient
            </Button>
          </Box>

          {/* SEARCH */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search by name or ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") fetchPatients(searchInput);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#64748b" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                background: "#f1f5f9",
                borderRadius: "10px",
              }}
            />

            <Button
              onClick={() => fetchPatients(searchInput)}
              sx={primaryBtn}
            >
              Search
            </Button>
          </Box>

          {/* ERROR */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* TABLE */}
          {loading ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ height: 550 }}>
              <DataGrid
                rows={patients || []}
                columns={columns}
                getRowId={(row) => row?._id || Math.random()}
                pageSizeOptions={[10, 25, 50]}
                disableRowSelectionOnClick
                sx={{
                  border: "none",
                  color: "#1e293b",

                  "& .MuiDataGrid-columnHeaders": {
                    background: "#eef2ff",
                    fontWeight: 600,
                  },

                  "& .MuiDataGrid-row:hover": {
                    background: "#e0e7ff",
                  },

                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #e2e8f0",
                  },
                }}
              />
            </Box>
          )}

          {!loading && patients.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography color="#64748b">
                No patients found
              </Typography>
            </Box>
          )}

        </Paper>
      </Container>
    </Box>
  );
};

export default PatientList;