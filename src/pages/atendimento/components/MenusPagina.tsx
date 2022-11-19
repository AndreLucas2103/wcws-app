import { Link, useLocation } from "react-router-dom"

export const MenusPagina = () => {
    const location = useLocation();
    const paginaAtual = location.pathname.split("/")[2];

    return (
        <div className="flex justify-center px-10px">
            <Link
                to="/atendimento/chats"
                className={`
                    static min-h-[36px]  flex items-center min-w-[36px] w-min justify-center rounded-[14px] mt-10px hover:bg-blue-500
                    ${paginaAtual === "chats" ? "bg-blue-500" : "bg-gray-300"}
                `}
            >
                <img src="https://img.icons8.com/material-rounded/24/FFFFFF/chat--v1.png" className="w-[20px]" />
                <span className="fixed inline-flex rounded-full h-3 w-3 bg-red-600 mb-[26px] ml-[26px]" />
            </Link>

            <Link
                to="/atendimento/grupos"
                className={`
                    static min-h-[36px]  flex items-center min-w-[36px] w-min justify-center rounded-[14px] mt-10px hover:bg-blue-500  ml-10px
                    ${paginaAtual === "grupos" ? "bg-blue-500" : "bg-gray-300"}
                `}
            >
                <img src="https://img.icons8.com/ios-filled/50/FFFFFF/people-working-together.png" className="w-[20px]" />
            </Link>

            <Link
                to="/atendimento/emails"
                className="static min-h-[36px] bg-gray-300 flex items-center min-w-[36px] w-min justify-center rounded-[14px] mt-10px hover:bg-blue-500 ml-10px"
            >
                <img src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/new-post.png" className="w-[20px]" />
            </Link>
        </div>
    )
}