import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function HabitatDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [habitat, setHabitat] = useState(null);
    const [frogs, setFrogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const habitatResponse = await axios.get(`http://localhost:8080/api/habitats/${id}`);
                setHabitat(habitatResponse.data);

                const frogsResponse = await axios.get(`http://localhost:8080/api/frogs`);
                const frogsInHabitat = frogsResponse.data.filter(frog =>
                    frog.habitats && frog.habitats.some(h => h.id === habitatResponse.data.id)
                );
                setFrogs(frogsInHabitat);

                setLoading(false);
            } catch (err) {
                console.error("Errore nel caricamento:", err);
                setError("Errore nel caricamento dei dati.");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const goToFrogDetails = (frogId) => {
        navigate(`/frogs/${frogId}`);
    };

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <h2 className="green-color-txt">Caricamento dell'habitat...</h2>
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
            <h1 className="display-4 green-color-txt text-center mb-4">{habitat.name}</h1>
            <p className="lead text-center mb-5">{habitat.description}</p>

            <h3 className="green-color-txt mb-3">Rane presenti in questo habitat</h3>
            {frogs.length > 0 ? (
                <ul className="list-group list-group-flush">
                    {frogs.map(frog => (
                        <li key={frog.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {frog.commonName} ({frog.scientificName})
                            <button className="btn btn-sm btn-success green-color-bg" onClick={() => goToFrogDetails(frog.id)}>Dettagli</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nessuna rana registrata in questo habitat.</p>
            )}
        </div>
    );
}
