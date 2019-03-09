import React from "react";
import { Link } from "@reach/router";
const Home = () => {
  return (
    <div className="container">
      <nav className="nav justify-content-center">
        <Link to="/pokemon/page/0" className="nav-link">
          Pokemon
        </Link>
        <Link to="/berries/page/0" className="nav-link">
          Berries
        </Link>
        <Link to="/machines/page/0" className="nav-link">
          Machines
        </Link>
      </nav>
    </div>
  );
};

export default Home;
