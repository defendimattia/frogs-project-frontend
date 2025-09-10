import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function DefaultLayout() {

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <header>
                    <Navbar />
                </header>

                <main className="flex-grow-1">
                    <Outlet />
                </main>

                <footer className="footer">
                    <Footer />
                </footer>
            </div>
        </>
    )
}