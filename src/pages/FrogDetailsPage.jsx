import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./FrogDetailsPage.module.css";
import consStyles from "./ConservationStatusesPage.module.css";

export default function FrogDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [frog, setFrog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/frogs/${id}`);
                setFrog(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Errore nel caricamento della rana:", err);
                setError("Errore nel caricamento dei dati della rana.");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const getIUCNClass = (code) => {
        switch (code) {
            case "LC": return consStyles.iucnLC;
            case "NT": return consStyles.iucnNT;
            case "VU": return consStyles.iucnVU;
            case "EN": return consStyles.iucnEN;
            case "CR": return consStyles.iucnCR;
            case "EW": return consStyles.iucnEW;
            case "EX": return consStyles.iucnEX;
            case "RE": return consStyles.iucnRE;
            case "DD": return consStyles.iucnDD;
            case "NA": return consStyles.iucnNA;
            case "XX": return consStyles.iucnXX;
            default: return consStyles.iucnUnknown;
        }
    };

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <h2 className="green-color-txt">Caricamento della rana...</h2>
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

    if (!frog) {
        return (
            <div className="container my-5 text-center">
                <h2 className="text-danger">Rana non trovata.</h2>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <h1 className="display-4 text-center green-color-txt">
                {frog.commonName}
            </h1>
            <p className={`lead text-center fst-italic mb-5 ${styles.scientificName}`}>
                {frog.scientificName}
            </p>

            <div className="row mb-4">

                <div className="col-12 col-md-6 text-center mb-3">
                    <img
                        src={frog.imageUrl}
                        alt={frog.commonName}
                        className={`img-fluid rounded shadow-sm ${styles.frogImage}`}
                    />
                </div>

                <div className="col-12 col-md-6">
                    <ul className={`list-group ${styles.detailsList}`}>
                        <li className={`list-group-item ${styles.detailItem}`}>
                            <span className={styles.detailLabel}>Colore:</span>
                            <span className={styles.detailValue}>{frog.color}</span>
                        </li>
                        <li className={`list-group-item ${styles.detailItem}`}>
                            <span className={styles.detailLabel}>Peso medio:</span>
                            <span className={styles.detailValue}>{frog.averageWeight} g</span>
                        </li>
                        <li className={`list-group-item ${styles.detailItem}`}>
                            <span className={styles.detailLabel}>Tossicità:</span>
                            <span className={styles.detailValue}>{frog.toxicity ? "Sì" : "No"}</span>
                        </li>
                    </ul>

                    <div className={`${styles.conservationBox} mt-4 p-3 rounded `}>
                        <div className="d-flex align-items-center mb-2">
                            <span className={`${consStyles.iucnBadge} ${getIUCNClass(frog.conservationStatus.iucnCode)}`}>
                                {frog.conservationStatus.iucnCode}
                            </span>
                            <h5 className="mb-0 ms-2">{frog.conservationStatus.type}</h5>
                        </div>
                        <p className="mb-3 text-muted">{frog.conservationStatus.description}</p>
                        <button className="btn btn-sm btn-success green-color-bg" onClick={() => navigate(`/conservationStatuses/${frog.conservationStatus.id}`)}>Vai allo stato di conservazione</button>
                    </div>

                </div>
            </div>

            <h3 className="green-color-txt mb-3">Descrizione</h3>
            <p className={styles.description}>{frog.description}</p>


            <h3 className="green-color-txt mb-3 mt-4">Habitat</h3>
            <ul className={`list-group list-group-flush ${styles.habitatList}`}>
                {frog.habitats.map(habitat => (
                    <li key={habitat.id} className={`list-group-item d-flex justify-content-between align-items-center ${styles.habitatItem}`}>
                        {habitat.name}
                        <button className="btn btn-sm btn-success green-color-bg" onClick={() => navigate(`/habitats/${habitat.id}`)}>Vai all'habitat</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
