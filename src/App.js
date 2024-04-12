import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import IndustryTemplatePage from "./pages/IndustryTemplatePage";
import TemplateEditorPage from "./pages/TemplateEditorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/logo-maker/dashboard" element={<TemplateEditorPage />} />
        <Route
          path="/templates/:industryName"
          element={<IndustryTemplatePage />}
        />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
