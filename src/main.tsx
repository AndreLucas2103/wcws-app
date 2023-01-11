import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './redux/store';
import './styles/index.css';

import { CookiesProvider } from 'react-cookie';
import { ToastProvider } from './utils/providers/ToastProvider';
import { SocketIoProvider } from './utils/providers/SocketIoProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        {' '}
        {/* providader do redux */}
        <ToastProvider>
            {' '}
            {/* Provider do toast, para avisos */}
            <CookiesProvider>
                {' '}
                {/* Provider do cookies, para gerenciamento do app */}
                <SocketIoProvider>
                    <App />
                </SocketIoProvider>
            </CookiesProvider>
        </ToastProvider>
    </Provider>,
);
