import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="container my-5">
            <h1 className="display-4 green-color-txt text-center mb-5">404 - Pagina non trovata</h1>

            <div className="row align-items-center justify-content-center">

                <div className="col-12 col-md-6 d-flex flex-column align-items-start mb-4 text-center px-0">
                    <p className="lead mb-4">...Ops pare che la rana che stavi cercando sia saltata troppo lontano</p>
                    <div className="d-flex justify-content-center justify-content-md-center w-100">
                        <Link className="btn btn-success green-color-bg" to="/">Torna alla Home</Link>
                    </div>
                </div>

                <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0">
                    <img src="src/assets/images/NotFoundImg.png" className="img-fluid" alt="not found img" />
                </div>
            </div>
        </div>
    );
}
