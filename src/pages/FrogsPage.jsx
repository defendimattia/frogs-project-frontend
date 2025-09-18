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
    const [habitats, setHabitats] = useState([]);
    const [selectedHabitat, setSelectedHabitat] = useState("");
    const [statuses, setStatuses] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/frogs?page=0&size=12`)
            .then(response => {
                setFrogs(response.data.content);
                setPage(response.data.number);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            })
            .catch(err => {
                console.error("Errore nel caricamento delle rane:", err);
                setError("Errore nel caricamento delle rane.");
                setLoading(false);
            });

        axios.get("http://localhost:8080/api/habitats")
            .then(response => setHabitats(response.data))
            .catch(err => console.error("Errore nel caricamento habitat:", err));


        axios.get("http://localhost:8080/api/conservationStatuses")
            .then(response => setStatuses(response.data))
            .catch(err => console.error("Errore nel caricamento degli stati di conservazione:", err));
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    function goToDetails(id) {
        navigate(`/frogs/${id}`);
    };

    function fetchFrogs(query = "", pageNumber = 0) {
        const url = query ? `http://localhost:8080/api/frogs/searchByName?query=${query}&page=${pageNumber}&size=12` : `http://localhost:8080/api/frogs?page=${pageNumber}&size=12`;
        axios.get(url).then(function (response) {
            setFrogs(response.data.content);
            setTotalPages(response.data.totalPages);
            setPage(response.data.number);
        });
    }

    function handleHabitatChange(e) {
        const habitatId = e.target.value;
        setSelectedHabitat(habitatId);

        setSearchQuery("");
        setSelectedStatus("");

        if (habitatId === "") {
            fetchFrogs("", 0);
        } else {
            axios.get(`http://localhost:8080/api/frogs/searchByHabitat/${habitatId}`)
                .then(response => setFrogs(response.data.content))
                .catch(err => console.error("Errore nel filtraggio rane:", err));
        }
    }

    function handleStatusChange(e) {
        const statusId = e.target.value;
        setSelectedStatus(statusId);

        setSearchQuery("");
        setSelectedHabitat("");

        if (statusId === "") {
            fetchFrogs("", 0);
        } else {
            axios.get(`http://localhost:8080/api/frogs/searchByStatus/${statusId}`)
                .then(response => setFrogs(response.data.content))
                .catch(err => console.error("Errore nel filtraggio rane:", err));
        }
    }

    function handleSearchSubmit(e) {
        e.preventDefault();

        setSelectedHabitat("");
        setSelectedStatus("");

        fetchFrogs(searchQuery, 0);
    }

    function resetFilters() {
        setSearchQuery("");
        setSelectedHabitat("");
        setSelectedStatus("");
        fetchFrogs();
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

            {/* bottone sezione di ricerca */}
            <div className="mb-3 text-center">
                <button className="btn btn-success green-color-bg" type="button" onClick={() => setShowSearch(!showSearch)}>{showSearch ? "Nascondi ricerca" : "Apri sezione di ricerca"}</button>
            </div>

            {/* ricerca a comparsa */}
            {showSearch && (
                <div className="mb-4 p-3 border rounded bg-light">
                    <h5 className="fw-bold mb-3 text-center">Puoi cercare per uno dei seguenti:</h5>

                    {/* cerca per nome */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Cerca per nome comune o nome scientifico:</label>
                        <div className="d-flex">
                            <input type="text" className="form-control me-2" placeholder="Nome comune o nome scientifico..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                            <button type="button" className="btn btn-success green-color-bg" onClick={handleSearchSubmit}>Cerca</button>
                        </div>
                    </div>

                    {/* cerca per habitat */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Cerca per habitat:</label>
                        <select className="form-select" value={selectedHabitat} onChange={handleHabitatChange}>
                            <option value="">Tutti gli habitat</option>
                            {habitats.map(habitat => <option key={habitat.id} value={habitat.id}>{habitat.name}</option>)}
                        </select>
                    </div>

                    {/* cerca per stato di conservazione */}
                    <div className="mb-0">
                        <label className="form-label fw-bold">Cerca per stato di conservazione:</label>
                        <select className="form-select" value={selectedStatus} onChange={handleStatusChange}>
                            <option value="">Tutti gli stati</option>
                            {statuses.map(status => <option key={status.id} value={status.id}>{status.type}</option>)}
                        </select>
                    </div>

                    {/* bottone reset */}
                    <div className="mt-3 text-center">
                        <button type="button" className="btn btn-success green-color-bg" onClick={resetFilters}>Azzera ricerca</button>
                    </div>

                </div>
            )}

            {/* elenco rane */}
            <div className="row g-3">
                {frogs.map(frog => (
                    <div key={frog.id} className="col-6 col-md-4 col-lg-3">
                        <div className={`${styles.frogCard} p-2`}>
                            <div className={styles.frogImageWrapper}>
                                <img src={frog.imageUrl} alt={frog.commonName} className={styles.frogImage} />
                            </div>
                            <div className="d-flex flex-column flex-grow-1">
                                <h6 className="mb-1 green-color-txt">{frog.commonName}</h6>
                                <p className="text-muted fst-italic small mb-2">{frog.scientificName}</p>
                                <div className="small mb-2">
                                    <div><strong>Colore:</strong> {frog.color}</div>
                                    <div><strong>Peso:</strong> {frog.averageWeight} g</div>
                                </div>
                                <button className="btn btn-sm btn-success green-color-bg mt-auto" onClick={function () { goToDetails(frog.id); }}>Vai ai dettagli</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* paginazione */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-sm btn-success green-color-bg me-2" disabled={page === 0} onClick={() => fetchFrogs(searchQuery, page - 1)}>⏴</button>

                <span className="align-self-center">Pagina {page + 1} di {totalPages}</span>

                <button className="btn btn-sm btn-success green-color-bg ms-2" disabled={page + 1 >= totalPages} onClick={() => fetchFrogs(searchQuery, page + 1)}>⏵</button>
            </div>
        </div>
    );
}
