import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersView from "./views/UsersView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UsersView />} index />
                <Route path="/auth/login" element={<LoginView />} />
                <Route path="/auth/register" element={<RegisterView />} />
            </Routes>
        </BrowserRouter>
    )
}