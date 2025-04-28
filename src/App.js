import "./App.css";
import { BackgroundBeamsDemo } from "./components/waitlist";
import { Testimonials } from "./components/testimonials";
import { Features } from "./components/features";
import { Team } from "./components/team";
import TrustedPartners from "./components/companies";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <main>
            <Navbar/>
            <HeroSection />
            <Features />
            <TrustedPartners/>
            <Testimonials />
            <BackgroundBeamsDemo />
            <Team />
          </main>
        } />
      </Routes>
    </Router>
  );
}

export default App;
