import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={`navbar navbar-expand-lg navbar-dark mb-4 ${styles.navbar}`}>
            <div className="container-fluid">
                <NavLink to="/" className={`navbar-brand ${styles.logo}`}>GreenFrog
                    <img src="src/assets/images/logo.png" alt="logo" className={styles.logoImage} />
                </NavLink>


                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse text-center" id="mainNavbar">

                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 py-2 py-lg-0">
                        <li className="nav-item mx-5">
                            <NavLink to="/frogs" className={({ isActive }) => `nav-link ${styles.link} ${isActive ? `${styles.active}` : ""}`}>Rane</NavLink>
                        </li>

                        <li className="nav-item mx-5">
                            <NavLink to="/habitats" className={({ isActive }) => `nav-link ${styles.link} ${isActive ? `${styles.active}` : ""}`}>Habitats</NavLink>
                        </li>

                        <li className="nav-item mx-5">
                            <NavLink to="/conservationStatuses" className={({ isActive }) => `nav-link ${styles.link} ${isActive ? `${styles.active}` : ""}`}>Stati di Conservazione</NavLink>
                        </li>

                        <li className="nav-item mx-5">
                            <NavLink to="/aboutus" className={({ isActive }) => `nav-link ${styles.link} ${isActive ? `${styles.active}` : ""}`}>Chi siamo</NavLink>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}
