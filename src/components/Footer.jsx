import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container d-flex justify-content-center align-items-center py-3 flex-column flex-md-row">

                <div className={styles.social}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>

                <div className={styles.copy}>
                    &copy; {new Date().getFullYear()} GreenFrog
                </div>
            </div>
        </footer>
    );
}
