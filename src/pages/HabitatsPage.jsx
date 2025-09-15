import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./HabitatsPage.module.css";

export default function Habitats() {
    const navigate = useNavigate();
    const [habitats, setHabitats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/habitats")
            .then(response => {
                setHabitats(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore nel caricamento degli habitat:", err);
                setError("Errore nel caricamento degli habitat.");
                setLoading(false);
            });
    }, []);

    const goToDetails = (id) => {
        navigate(`/habitats/${id}`);
    };

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <h2 className="green-color-txt">Caricamento degli habitats...</h2>
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
            <h1 className="display-4 green-color-txt text-center mb-5">Gli Habitat delle Rane</h1>

            <div className="row">
                {habitats.map(habitat => (
                    <div key={habitat.id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className={`${styles.cardCustom} p-2`}>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title green-color-txt">{habitat.name}</h5>
                                <p className="card-text">{habitat.description}</p>
                                <button className="btn btn-success green-color-bg mt-auto" onClick={() => goToDetails(habitat.id)}>Vai ai dettagli</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
