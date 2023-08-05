import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/Sign/ChangePassword";
import Main from "./pages/Main";

import { AuthProvider } from "./context/Auth";
import RequireAuth from "./context/RequireAuth";
import StoreOffers from "./pages/StoreOffers";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route
            path="/myProfile"
            element={
              <RequireAuth>
                {" "}
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />
          <Route
            path="/viewStoreOffers/:storeId"
            element={
              <RequireAuth>
                <StoreOffers />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
