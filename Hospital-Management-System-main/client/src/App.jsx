import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import RegisterHospital from './pages/RegisterHospital';
import Dashboard from './pages/Dashboard';
import RegisterPatient from './pages/RegisterPatient';
import PatientList from './pages/PatientList';
import PatientDetails from './pages/PatientDetails';
import PrivateRoute from './components/PrivateRoute';
import LandingNavbar from './components/Navbar';
import About from './pages/About'
import Footer from './components/Footer';
import Features from './pages/Features';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <LandingNavbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<Features />} />
   <Route path="/about" element={<About />} />
   <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-hospital" element={<RegisterHospital />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/register-patient"
          element={
            <PrivateRoute>
              <RegisterPatient />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute>
              <PatientList />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients/:id"
          element={
            <PrivateRoute>
              <PatientDetails />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Footer />

    </Router>
  );
}

export default App;

