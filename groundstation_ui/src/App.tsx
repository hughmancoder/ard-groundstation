import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import BottomNavbar from "./components/BottomNavBar";
import Overview from "./pages/Overview";
import Settings from "./pages/Settings";
import { TelemetryProvider } from "./context/TelemetryProvider";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <TelemetryProvider>
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </TelemetryProvider>
        <BottomNavbar />
      </div>
    </Router>
  );
}

export default App;
