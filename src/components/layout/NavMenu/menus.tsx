import { ReactNode } from "react";

export interface IMenu {
    titulo: string;
    icone: ReactNode;
    url: string;
}

export const menus: IMenu[] = [
    {
        titulo: "Inicio",
        icone: <img src="https://img.icons8.com/ios-filled/50/FFFFFF/circled-menu.png" className="w-[20px]" />,
        url: "/",
    },
    {
        titulo: "Atendimento",
        icone: <img src="https://img.icons8.com/material-rounded/24/FFFFFF/chat--v1.png" className="w-[20px]" />,
        url: "/atendimento/chats",
    },
    {
        titulo: "Agenda",
        icone: <img src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/tear-off-calendar.png" className="w-[20px]" />,
        url: "/agenda",
    }
]