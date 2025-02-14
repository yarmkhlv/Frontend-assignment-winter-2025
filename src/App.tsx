import { Routes, Route, Navigate } from "react-router-dom";
import { FormPage } from "./pages/FormPage ";
import { ListPage } from "./pages/ListPage";
import { Layout } from "./components/widgets/Layout";
import { AdPage } from "./pages/AdPage";
import { ROUTES } from "./variables/routes";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.AD_LIST} replace />} />

        <Route path="/form" element={<FormPage />} />
        <Route path={ROUTES.AD_LIST} element={<ListPage />} />
        <Route path={ROUTES.AD} element={<AdPage />} />
        <Route path="*" element={<Navigate to={ROUTES.AD_LIST} replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
