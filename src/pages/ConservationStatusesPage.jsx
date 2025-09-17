import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ConservationStatusesPage.module.css";

export default function ConservationStatuses() {
    const navigate = useNavigate();
    const [statuses, setStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8080/api/conservationStatuses")
            .then(response => {
                setStatuses(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore nel caricamento degli stati di conservazione:", err);
                setError("Errore nel caricamento degli stati di conservazione.");
                setLoading(false);
            });
    }, []);

    const goToDetails = (id) => {
        navigate(`/conservationStatuses/${id}`);
    };

    function getIUCNClass(code) {
        switch (code) {
            case "LC": return styles.iucnLC;
            case "NT": return styles.iucnNT;
            case "VU": return styles.iucnVU;
            case "EN": return styles.iucnEN;
            case "CR": return styles.iucnCR;
            case "EW": return styles.iucnEW;
            case "EX": return styles.iucnEX;
            case "RE": return styles.iucnRE;
            case "DD": return styles.iucnDD;
            case "NA": return styles.iucnNA;
            case "XX": return styles.iucnXX;
            default: return styles.iucnUnknown;
        }
    };

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <h2 className="green-color-txt">Caricamento degli stati di conservazione...</h2>
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
            
            <h1 className="display-4 green-color-txt text-center mb-5">Stati di Conservazione delle Rane</h1>

            <div className="row">
                {statuses.map(status => (
                    <div key={status.id} className="col-12 col-md-6 col-lg-4 mb-4">
                        <div className={`${styles.cardCustom} p-2`}>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title d-flex align-items-center">
                                    <span className={`${styles.iucnBadge} ${getIUCNClass(status.iucnCode)}`}>
                                        {status.iucnCode}
                                    </span>
                                    <span className="ms-1">{status.type}</span>
                                </h5>
                                <p className="card-text">{status.description}</p>
                                <button className="btn btn-success green-color-bg mt-auto" onClick={() => goToDetails(status.id)}>Vai ai dettagli</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
