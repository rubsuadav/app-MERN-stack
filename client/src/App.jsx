import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./components/routes/authContext";
import React from "react";

//Redux imports
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/authentication/redux/authReducer";

//Local imports
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/authentication/Login";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Admin from "./components/admin/Admin";
import Register from "./components/authentication/Register";
import PersonalProfile from "./components/pages/PersonalProfile";

function App() {
  const store = configureStore({
    reducer: authReducer,
  });

  return (
    <div className="container">
      <Provider store={store}>
        <AuthContextProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<PublicRoute />}>
                <Route index element={<Home />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="/profile/:username"
                  element={<PersonalProfile />}
                />
              </Route>
            </Routes>
          </Router>
        </AuthContextProvider>
      </Provider>
    </div>
  );
}

export default App;
