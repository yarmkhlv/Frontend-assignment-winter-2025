import { Routes, Route, Navigate } from "react-router-dom";
// import FormPage from "./pages/FormPage";
import { ListPage } from "./pages/ListPage";
import { Layout } from "./components/Layout";
// import ItemPage from "./pages/ItemPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />

        {/* <Route path="/form" element={<FormPage />} /> */}
        <Route path="/list" element={<ListPage />} />
        {/* <Route path="/item/:id" element={<ItemPage />} /> */}
        <Route path="*" element={<Navigate to="/list" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
