import { Box, Container, Grid, Typography, Card, CardContent, Avatar } from "@mui/material";

const doctors = [
  { name: "Dr. Sharma", spec: "Cardiologist" },
  { name: "Dr. Mehta", spec: "Neurologist" },
  { name: "Dr. Khan", spec: "General Physician" },
];

export default function DoctorsSection() {
  return (
    <Box sx={{ py: 10, background: "#f7fbff" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ fontWeight: 800, textAlign: "center" }}>
          Our Doctors
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {doctors.map((d, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card sx={{ textAlign: "center", p: 3, borderRadius: 4 }}>
                <Avatar sx={{ width: 80, height: 80, mx: "auto", mb: 2 }} />
                <CardContent>
                  <Typography sx={{ fontWeight: 700 }}>{d.name}</Typography>
                  <Typography sx={{ color: "#666" }}>{d.spec}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}