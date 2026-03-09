import { Outlet } from 'react-router-dom';
import Navbar from '../Components/Global/Navbar';
import Footer from '../Components/Global/Footer';
import Chatbot from '../Components/Chatbot/Chatbot';

export default function Layout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <Chatbot />
        </>
    )
}