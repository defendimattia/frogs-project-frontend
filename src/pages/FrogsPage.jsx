import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./FrogsPage.module.css";

export default function Frogs() {
    const navigate = useNavigate();
    const [frogs, setFrogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/api/frogs")
            .then(response => {
                setFrogs(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore nel caricamento delle rane:", err);
                setError("Errore nel caricamento delle rane.");
                setLoading(false);
            });
    }, []);

    const goToDetails = (id) => {
        navigate(`/frogs/${id}`);
    };

    function fetchFrogs(query = "") {
        const url = query ? `http://localhost:8080/api/frogs/search?query=${query}` : "http://localhost:8080/api/frogs";
        axios.get(url).then(function (response) {
            setFrogs(response.data);
        });
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        fetchFrogs(searchQuery);
    }

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <h2 className="green-color-txt">Caricamento delle rane...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5 text-center">
                <h2 className="text-danger">{error}</h2>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="display-5 green-color-txt text-center mb-4">Le Rane</h1>


            {/* barra di ricerca */}
            <form className="mb-4 d-flex justify-content-center" onSubmit={handleSearchSubmit}>
                <input type="text" className="form-control w-50 me-2" placeholder="Cerca per nome comune o nome scientifico..." value={searchQuery} onChange={function (e) { setSearchQuery(e.target.value); }} />
                <button type="submit" className="btn btn-success green-color-bg">Cerca</button>
            </form>

            <div className="row g-3">
                {frogs.map(frog => (
                    <div key={frog.id} className="col-6 col-md-4 col-lg-3">
                        <div className={`${styles.frogCard} p-2`}>

                            <div className={styles.frogImageWrapper}>
                                <img src={frog.imageUrl} alt={frog.commonName} className={styles.frogImage} />
                            </div>

                            <div className="d-flex flex-column flex-grow-1">
                                <h6 className="mb-1 green-color-txt">{frog.commonName}</h6>
                                <p className="text-muted fst-italic small mb-2">
                                    {frog.scientificName}
                                </p>
                                <div className="small mb-2">
                                    <div><strong>Colore:</strong> {frog.color}</div>
                                    <div><strong>Peso:</strong> {frog.averageWeight} g</div>
                                </div>
                                <button className="btn btn-sm btn-success green-color-bg mt-auto" onClick={() => goToDetails(frog.id)}>Vai ai dettagli</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
