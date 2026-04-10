import React from "react";
import background from "../assets/img/Background.jpg";
function Header({ title }) {
  return (
    <div
      className="container-fluid page-header mb-5 wow fadeIn"
      data-wow-delay="0.1s"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "300px",
        position: "relative",
      }}
    >
      <div className="container text-center" style={{ position: "relative", zIndex: 2 }}>
        <h1 className="display-4 text-white animated slideInDown mb-4">
          {title}
        </h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item">
              
                Home
             
            </li>
            <li className="breadcrumb-item">
            
                Pages
             
            </li>
            <li
              className="breadcrumb-item text-primary active"
              aria-current="page"
            >
              {title}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default Header;
