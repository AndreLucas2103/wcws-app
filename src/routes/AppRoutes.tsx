
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { LayoutSistema } from "components/layout/LayoutSistema";

import { useAppSelector } from "utils/hooks/useRedux";
import { Login } from "pages/Login";

export const AppRoutes = () => {
    const { usuario } = useAppSelector((redux) => redux.usuario);

    const rotaUsuarioLogado = (
        <Route element={<LayoutSistema />} >

        </Route>
    )

    return (
        <Routes>
            {
                usuario ?
                    rotaUsuarioLogado :
                    <Route path="*" element={<Login />} />
            }
        </Routes>
    );
}
