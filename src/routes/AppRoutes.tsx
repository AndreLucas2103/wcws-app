
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { LayoutSistema } from "components/layout/LayoutSistema";
import { Inicio } from "pages/Inicio";
import { Chat } from "pages/atendimento/Chats/Chat";


import { Login } from "pages/Login";
import { useAppSelector } from "utils/hooks/useRedux";
import { Chats } from "pages/atendimento/Chats";

export const AppRoutes = () => {
    const { usuario } = useAppSelector((state) => state.usuario);

    const rotaUsuarioLogado = (
        <Route element={<LayoutSistema />} >
            <Route path="/" element={<Inicio />} />
            <Route path="atendimento" >
                <Route path="chats" element={<Chats />} >
                    <Route path=":uuidChat" element={<Chat />} />
                </Route>
            </Route>
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
