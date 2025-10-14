import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import MainNavigation from './routes/MainNavigation.jsx';
import { AuthProvider } from './context/AuthContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
            <MainNavigation />
        </AuthProvider>
    </BrowserRouter>
);
