import { ModalSimples } from 'components/modal/ModalSimples';
import { LoadingSpinnerPage } from 'components/spinner/SpinnerLoading';
import { ReactNode } from 'react';
import { useNetwork } from '../hooks/useNetwork';

export const AvisoProvider = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <LoadingSpinnerPage /> {/* rodar o spinner da aplicação*/}
            <AvisoSemConexao />
            {children}
        </>
    );
};

const AvisoSemConexao = () => {
    const { online } = useNetwork();

    if (online) return null;

    return (
        <ModalSimples
            button={{
                className: 'hidden',
                children: 'asds',
            }}
            isOpen={true}
            setIsOpen={() => {}}
            titleClassname="hidden"
            panelClassName="w-[400px]"
        >
            <div className="p-20px flex items-center justify-center">
                <div className="flex flex-col">
                    <p className="text-20px font-semibold">SEM CONEXÃO</p>
                    <div className="flex justify-center mt-10px">
                        <img
                            alt=""
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADM0lEQVRoge2aT0gUURzHP6+0RMhMNMtKJKhLnbIshBW6KCipG3rKOtTBUjShjNKgQ+AWaFkKZXoqoYOVrZnkJUEr+qNCkRcLCwSJ/qBFSZnu6zDNOrM7Krvivoz5XPbN7/fe8Pu+N7/fvJlZsLGZF8J4UNt8R+rt+x0dAGRlZnr9ZQV7Tf3/BZaoDmC+2AJUs+gFhAXSOXXvATl3r4XhyZ3rlgXk/10BY/nUaalzLWgwVuSXnJrVv+hXwBagGlMOGLcKm7ftkgBd926HOqaAWPQrYAtQjS1ANbYA1dgCVGMLUI0tQDUBPRMvFGJqkojeTiJePCB86BVLv4yAEEzFrOXMNw/dyzfwOJlw0cdv37HKBUT0dhLVfJawD+/8fGEjb0kH0n8NQSQD0kG56MFt7KPuEvJ4iLrpIqb6oGXwFmwCWqWDKmmIe8Z3nfoDTWzS5nnHasXhH/3sH38d7HCX6KECFK2AY2KYAt/go+NAWMynEJrPzEmZRjYoEBAmPRR/7zMvfXwiXH0KJxphiSEkIaCsHhp7IWGjcYRAclFuYdmcl9Bg/9OAX6nnlVZYvsG7dblKSAd5QIvXuGo1NDyDNUnacVsD1BzR2seuQHah1v7wHgp3wuhH4ynzQ1+FJE7T9I99gued04Hqv77t551aXzM5oRcg2G46llKb8alJcBZrNmPgAO1NcKFI62tmR1AC8ksrnRLZAPhl12zklVbIny+rifBMmB1SQm2J1tZF6LQ3QXUheDxWp1wXVBJLZD0BBu8dO2tGzVCFZsYTbBVKCHIco+Er/I16tXEW+fuyDkH5NXN10pGMhPyjnXTQDOzzGoQwVxvQKhH422qO+ObBDRV7obsYBUTHQUrGtNdYRmFaREqG1tdcRttCvwLJhBPJANreRiM+ES51Qf9Dc8IKAWV1kLoHju6GkSHjqQYZZ6uS777SQQ7QijFro+Pg62f/UikErIz1vQdIBLmimzYleyHRgxvJeZNx7JNVndds/jewc6KbNlC5nX5EJeACAvlwKAEXPZzWDcr/OiDTyEZSjTEnrHmD4Lg+8zrKBYA3sXOAXCTJCNb/dQ0DfYCbcdxWj5R/AGq36lMAWF+LAAAAAElFTkSuQmCC"
                        />
                    </div>
                    <div>
                        <div role="status" className="flex justify-center mt-20px mb-10px">
                            <svg
                                aria-hidden="true"
                                className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                ></path>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                ></path>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p>Tentando reconexão</p>
                    </div>
                </div>
            </div>
        </ModalSimples>
    );
};
