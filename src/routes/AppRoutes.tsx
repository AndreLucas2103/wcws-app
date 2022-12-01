import { Route, Routes } from 'react-router-dom';

import { LayoutSistema } from 'components/layout/LayoutSistema';

import { useAppSelector } from 'utils/hooks/useRedux';
import { Login } from 'pages/Login';
import { Inicio } from 'pages/Inicio';
import { Chat } from 'pages/Atendimento/Chat';
import { Atendimento } from 'pages/Atendimento';

export const AppRoutes = () => {
    const { usuario } = useAppSelector((redux) => redux.usuario);

    const rotaUsuarioLogado = (
        <Route element={<LayoutSistema />}>
            <Route path="/" element={<Inicio />} />

            <Route path="atendimento" element={<Atendimento />}>
                <Route path="chats">
                    <Route path=":uidChat" element={<Chat />} />
                    <Route index element={<div>chat</div>} />
                </Route>
                <Route path="grupos" element={<div>grupos</div>} />
            </Route>
        </Route>
    );

    return <Routes>{usuario ? rotaUsuarioLogado : <Route path="*" element={<Login />} />}</Routes>;
};
