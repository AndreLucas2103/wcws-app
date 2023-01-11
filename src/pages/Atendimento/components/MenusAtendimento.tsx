import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FilaAtendimentos } from './FilaAtendimento';

export const MenusAtendimento = () => {
    const [abaAtual, setAbaAtual] = useState<'chats' | 'grupos'>('chats');

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-center p-10px ">
                <Link
                    to="/atendimento/chats"
                    onClick={() => setAbaAtual('chats')}
                    className={`
                    relative min-h-[36px]  flex items-center min-w-[36px] w-min justify-center rounded-[14px] hover:bg-blue-500
                    ${abaAtual === 'chats' ? 'bg-blue-500' : 'bg-gray-300'}
                `}
                >
                    <img
                        src="https://img.icons8.com/material-rounded/24/FFFFFF/chat--v1.png"
                        className="w-[20px]"
                        alt=""
                    />
                    <span className="absolute inline-flex rounded-full h-3 w-3 bg-red-600 mb-[26px] ml-[26px]" />
                </Link>

                <Link
                    to="/atendimento/grupos"
                    onClick={() => setAbaAtual('grupos')}
                    className={`
                    static min-h-[36px]  flex items-center min-w-[36px] w-min justify-center rounded-[14px] hover:bg-blue-500  ml-10px
                    ${abaAtual === 'grupos' ? 'bg-blue-500' : 'bg-gray-300'}
                `}
                >
                    <img
                        src="https://img.icons8.com/ios-filled/50/FFFFFF/people-working-together.png"
                        className="w-[20px]"
                        alt=""
                    />
                </Link>

                <Link
                    to="/atendimento/emails"
                    className="static min-h-[36px] bg-gray-300 flex items-center min-w-[36px] w-min justify-center rounded-[14px] hover:bg-blue-500 ml-10px"
                >
                    <img
                        src="https://img.icons8.com/sf-regular-filled/48/FFFFFF/new-post.png"
                        className="w-[20px]"
                        alt=""
                    />
                </Link>
            </div>

            {abaAtual === 'chats' && <FilaAtendimentos />}
        </div>
    );
};
