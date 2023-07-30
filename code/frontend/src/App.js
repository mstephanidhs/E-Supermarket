import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/Sign/ChangePassword";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/myProfile" element={<Profile />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
