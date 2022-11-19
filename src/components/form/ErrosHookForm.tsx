export const ErrosHookForm = ({ errors }: {
    errors: {
        [x: string]: any;
    }
}) => {
    return <div>
        {
            Object.entries(errors).map(([field, msg], index) =>
                msg.message ? (
                    <div
                        key={index}
                        className="bg-orange-100 my-[5px] rounded-[4px] px-[10px] text-14px text-vermelhoErro py-[5px] flex card w-full"
                    >
                        <img src="https://icon-v1.vercel.app/error.svg" className="w-[16px]" alt="" />
                        <p className="ml-[4px]">{msg.message}</p>
                    </div>
                ) : null
            )
        }
    </div>
}