import { Route, Routes } from "react-router";
import HomePage from "./pages/home/HomePage";

import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpFallbackRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  );
}

export default App;
