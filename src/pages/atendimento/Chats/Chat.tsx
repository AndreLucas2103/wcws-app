import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Chat = () => {
    const { uuidChat } = useParams();

    return (
        <div className="flex h-full">
            <div className="w-8/12 px-20px py-10px">
                <p className="text-10px text-medium">
                    Protocolo: {uuidChat}
                </p>
                <section className="h-full py-10px">
                    <div className="bg-gray-300/70 h-full rounded-[14px] flex flex-col justify-between">
                        <div></div>
                        <div className="h-full overflow-y-auto px-20px my-10px">
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                            <Mensagem />
                        </div>
                        <div className="p-10px">
                            <InputChat />
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-4/12">

            </div>
        </div>
    )
}

const InputChat = () => {
    const [mensagem, setMensagem] = useState<string>('')

    return (
        <div className="h-full text-12px">
            <div className="bg-white flex items-center w-full p-10px  rounded-[10px]">
                <textarea
                    value={mensagem}
                    onChange={e => setMensagem(e.target.value)}
                    className="w-full h-[54px] text-12px leading-normal border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-0 focus:border-gray-300 focus:z-10"
                >
                </textarea>
                <button
                    className="bg-blue-500 h-[40px] w-[40px] ml-10px flex items-center justify-center rounded-[14px]"
                >
                    <img src="https://img.icons8.com/sf-ultralight-filled/25/FFFFFF/paper-plane.png" className="w-[20px] h-20px" />
                </button>
            </div>
        </div>
    )
}

const Mensagem = () => {
    return (
        <div>
            as
        </div>
    )
}