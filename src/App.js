import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Home from "./Home";
import Pokemons from "./Pokemons";
import Pokemon from "./Pokemon";
import Berries from "./Berries";
import Berry from "./Berry";
import Machines from "./Machines";
import Machine from "./Machine";

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1 className="display-3">
            <Link to="/">Poke Hunt!</Link>
          </h1>
          <p className="mt-5">
            {" "}
            A basic Pokemon website. Your 101 Intro to Pokemon.
            <br /> To know more about them go to their Wiki Page
          </p>
        </div>
        <Router>
          <Home path="/" />
          <Pokemon path="/pokemon/:id" />
          <Pokemons path="/pokemon/page/:id" />
          <Berry path="/berries/:id" />
          <Berries path="/berries/page/:id" />
          <Machines path="/machines/page/:id" />
          <Machine path="/machines/:id" />
        </Router>
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
