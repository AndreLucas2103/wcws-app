import { Outlet } from "react-router-dom"
import { NavMenu } from "./NavMenu"

export const LayoutSistema = () => {
    return (
        <div className="text-padrao font-normal flex h-screen text-normal bg-[#f1f1f1] overflow-y-hidden">
            <div className="min-w-[80px] h-full p-10px">
                <NavMenu />
            </div>
            <div className="w-full overflow-y-auto h-full min-w-[1280px]">
                <Outlet />
            </div>
        </div>
    )
}