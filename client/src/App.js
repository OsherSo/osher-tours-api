import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider, RequireAuth } from "react-auth-kit";

import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer";
import LoginPage from "./components/authentication/LoginPage";
import SignupPage from "./components/authentication/SignupPage";
import Overview from "./components/Overview";
import TourPage from "./components/TourPage/TourPage";
import NotFound from "./components/authentication/NotFound";
import AccountSettings from "./components/AccountSettings/AccountSettings";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Overview />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<SignupPage />} />
        <Route
          path="me"
          element={
            <RequireAuth loginPath={"/login"}>
              <AccountSettings />
            </RequireAuth>
          }
        />

        <Route path="tour">
          <Route path=":slug" element={<TourPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </AuthProvider>
  );
};

export default App;
