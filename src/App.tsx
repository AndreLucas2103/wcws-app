import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes"
import { AvisoProvider } from "./utils/providers/AvisoProvider";

export const App = () => {
    return (
        <AvisoProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AvisoProvider>
    )
}

