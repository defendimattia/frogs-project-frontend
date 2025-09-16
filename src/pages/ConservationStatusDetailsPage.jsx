import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ConservationStatusesPage.module.css";

export default function ConservationStatusDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState(null);
    const [frogs, setFrogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statusResponse = await axios.get(`http://localhost:8080/api/conservationStatuses/${id}`);
                setStatus(statusResponse.data);

                const frogsResponse = await axios.get(`http://localhost:8080/api/frogs`);
                const frogsInStatus = frogsResponse.data.filter(frog =>
                    frog.conservationStatus && frog.conservationStatus.id === statusResponse.data.id
                );
                setFrogs(frogsInStatus);

                setLoading(false);
            } catch (err) {
                console.error("Errore nel caricamento:", err);
                setError("Errore nel caricamento dei dati.");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    function goToFrogDetails(frogId) {
        navigate(`/frogs/${frogId}`);
    }

    function getRiskClass(level, index) {
        if (index < level) {
            if (level <= 2) return styles.riskGreen;
            if (level === 3 || level === 4) return styles.riskYellow;
            return styles.riskRed;
        }
        return "";
    }

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <h2 className="green-color-txt">Caricamento dello stato di conservazione...</h2>
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

            <h1 className="display-4 green-color-txt mb-4 d-flex justify-content-center align-items-center">

                <span className={`${styles.iucnBadge} ${styles.iucnBadgeLarge} ${styles[`iucn${status.iucnCode}`]}`}>
                    {status.iucnCode}
                </span>

                <span className="ms-2">{status.type}</span>
            </h1>

            <p className="lead text-center mb-4">{status.description}</p>

            <h3 className="green-color-txt mb-3 text-center">Livello di rischio</h3>
            <div className="d-flex justify-content-center mb-5">
                {[0, 1, 2, 3, 4].map(i => (
                    <span
                        key={i}
                        className={`${styles.riskBar} ${getRiskClass(status.riskLevel, i)}`}
                    />
                ))}
            </div>

            <div className="mb-5 d-flex flex-column align-items-center">
                <div className={`${styles.iucnInfoBox} text-center`}>

                    <p className="mb-3">
                        Consulta il sito ufficiale IUCN per maggiori informazioni sugli stati di conservazione delle specie.
                    </p>

                    <a href="https://www.iucn.it/index.php" target="_blank" rel="noopener noreferrer" className="btn btn-success green-color-bg">Visita il sito ufficiale IUCN</a>

                </div>
            </div>

            <h3 className="green-color-txt mb-3">Rane con questo stato di conservazione</h3>
            {frogs.length > 0 ? (
                <ul className={`list-group list-group-flush ${styles.frogsList}`}>
                    {frogs.map(frog => (
                        <li key={frog.id} className={`list-group-item d-flex justify-content-between align-items-center ${styles.frogsItem}`}>
                            {frog.commonName} ({frog.scientificName})
                            <button className="btn btn-sm btn-success green-color-bg" onClick={() => goToFrogDetails(frog.id)}>Dettagli</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nessuna rana registrata con questo stato di conservazione.</p>
            )}
        </div>
    );
}
