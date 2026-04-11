import { useState, useEffect } from "react";

import Spinner from "../Spinner";
import Navbar from "../Navbar";
import Header from "../Header";
import Footer from "../footer";
import { Link } from "react-router-dom";

function Error404() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading, or use window.onload if you want to wait for all assets
    const timer = setTimeout(() => setLoading(false), 500); // 500ms delay
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <Spinner loading={loading} />
      <Navbar />

      <Header title="404 Error" />
      {/* <!-- 404 Start --> */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container text-center">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
              <h1 className="display-1">404</h1>
              <h1 className="mb-4">Page Not Found</h1>
              <p className="mb-4">
                We’re sorry, the page you have looked for does not exist in our
                website! Maybe go to our home page or try to use a search?
              </p>
              <Link className="btn btn-outline-primary py-2 px-3" to="/">
                Go Back To Home
                <div className="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                  <i className="fa fa-arrow-right"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Error404;
