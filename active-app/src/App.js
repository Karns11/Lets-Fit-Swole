import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import SuccessScreen from "./screens/SuccessScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WorkoutScreen from "./screens/WorkoutScreen";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/users/login" element={<LoginScreen />} />
            <Route path="/users/register" element={<RegisterScreen />} />
            <Route path="/users/main" element={<MainScreen />} />
            <Route path="/users/workout/:id" element={<WorkoutScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/users/success" element={<SuccessScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      {location.pathname === "/" && <Footer />}
    </>
  );
}

export default App;
