import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import ProdutosPage from "./pages/ProdutosPage";
import { CategoriasPage } from "./pages/CategoriasPage";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Navigate to='/produtos' replace />} />
                <Route path="/produtos" element={<ProdutosPage />} />
                <Route path="/categorias" element={<CategoriasPage />} />
            </Route>
        </Routes>
    )
}

export default App;