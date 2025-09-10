import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function DefaultLayout() {

    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>
                <Outlet />
            </main>

            <footer>
                
            </footer>
        </>
        )
}