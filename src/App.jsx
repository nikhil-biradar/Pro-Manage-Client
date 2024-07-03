import { BrowserRouter, Route, Routes } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import "./App.css";
import RegLogPage from "./pages/RegLoginPage/RegLogPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import BordPage from "./pages/BoardPage/BordPage";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage";
import ProtectedRoute from "./componants/protectedRoute/ProtectedRoute";
import PageNotFound from "./componants/Error/ErrorHandling/PageNotFound";
import PublicPage from "./pages/PublicPage/PublicPage";

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegLogPage />} />
          <Route
            path="/board"
            element={<ProtectedRoute Component={BordPage} />}
          />
          <Route
            path="/analytics"
            element={<ProtectedRoute Component={AnalyticsPage} />}
          />
          <Route
            path="/setting"
            element={<ProtectedRoute Component={SettingPage} />}
          />
          <Route
            path="/:id"
            element={<PublicPage/>}
          />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
