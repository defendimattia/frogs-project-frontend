export default function Home() {
    return (
        <div className="container my-5">
            <h1 className="display-4 green-color-txt text-center mb-5">Benvenuto su GreenFrog</h1>

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 d-flex flex-column align-items-start mb-4">
                    <p className="lead mb-3">
                        GreenFrog è il tuo spazio dedicato alle rane. Qui puoi esplorare informazioni dettagliate sulle varie specie,
                        i loro habitat naturali e lo stato di conservazione di ciascuna.
                    </p>
                    <p className="lead mb-3">
                        Il sito è pensato per chi vuole conoscere le rane in modo completo: dalle caratteristiche fisiche, al comportamento,
                        fino ai luoghi in cui vivono e alla loro presenza nel mondo.
                    </p>

                    <h5 className="green-color-txt mt-4 mb-2">Cosa puoi trovare su GreenFrog</h5>
                    <ul className="lead mb-3">
                        <li><strong>Rane:</strong> schede dettagliate sulle diverse specie.</li>
                        <li><strong>Habitat:</strong> informazioni sugli ambienti in cui vivono.</li>
                        <li><strong>Stato di conservazione:</strong> dati aggiornati sul rischio di estinzione delle varie specie.</li>
                    </ul>

                    <h5 className="green-color-txt mt-4 mb-2">Curiosità sulle rane</h5>
                    <ul className="lead mb-3">
                        <li>Alcune rane possono cambiare colore per mimetizzarsi con l'ambiente.</li>
                        <li>Molte specie comunicano con suoni unici che possono essere ascoltati a grandi distanze.</li>
                        <li>Le rane hanno una grande varietà di dimensioni, dai pochi millimetri fino a oltre 30 cm.</li>
                    </ul>

                    <p className="lead mb-3">
                        Navigando nel sito potrai scoprire tutte le specie, confrontare i loro habitat e approfondire le informazioni sul loro stato di conservazione.
                        GreenFrog è il punto di riferimento per chi ama le rane e vuole conoscerle davvero.
                    </p>
                </div>

            </div>
        </div>
    );
}
