import { Outlet } from 'react-router-dom';
import { MenusAtendimento } from './components/MenusAtendimento';

export const Atendimento = () => {
    return (
        <div className="flex py-10px px-20px h-full">
            <div className="w-2/12 h-full min-w-[220px]">
                <MenusAtendimento />
            </div>

            <div className="w-10/12">{<Outlet />}</div>
        </div>
    );
};
