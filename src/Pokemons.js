import React from "react";
import { getPokemonsForPage } from "./network";
import { Link, navigate } from "@reach/router";
import Card from "./Card";
import Page404 from "./404";
import Pagination from "./Pagination";

class Pokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfPages: 0,
      page: parseInt(props.id),
      pokemons: [],
      isLoading: true,
      error: false
    };
    this.prevButtonTapped = this.prevButtonTapped.bind(this);
    this.nextButtonTapped = this.nextButtonTapped.bind(this);
  }
  async componentDidMount() {
    const { page } = this.state;
    const pokemonData = await getPokemonsForPage(page);
    let stateData = { ...pokemonData, isLoading: false };
    this.setState(stateData);
  }

  async prevButtonTapped() {
    this.setState({ isLoading: true });
    let { page } = this.state;
    page = page - 1;
    let pokemonData = await getPokemonsForPage(page);
    navigate(`/pokemon/page/${page}`);
    this.setState({ ...pokemonData, isLoading: false });
  }

  async nextButtonTapped() {
    this.setState({ isLoading: true });
    let { page } = this.state;
    page = page + 1;
    let pokemonData = await getPokemonsForPage(page);
    navigate(`/pokemon/page/${page}`);
    this.setState({ ...pokemonData, isLoading: false });
  }

  render() {
    const { pokemons, numberOfPages, isLoading, page, error } = this.state;
    if (isLoading) {
      return <p>Loading Data</p>;
    }
    if (isNaN(page) || page < 0 || page > numberOfPages) {
      return <Page404 />;
    }
    if (error) {
      return <Page404 />;
    }
    if (pokemons.length === 0) {
      return <Page404 />;
    } else {
      return (
        <div className="container">
          {pokemons.map(pokemon => {
            const pokemonStringToArray = pokemon.url.split("/");
            const pokemonID =
              pokemonStringToArray[pokemonStringToArray.length - 2];
            return (
              <Card
                key={pokemonID}
                name={pokemon.name}
                url={`/pokemon/${pokemonID}`}
              />
            );
          })}

          <Pagination
            page={page}
            prevButtonTapped={this.prevButtonTapped}
            numberOfPages={numberOfPages}
            nextButtonTapped={this.nextButtonTapped}
          />
        </div>
      );
    }
  }
}

export default Pokemons;
