import React from "react";
import { getPokemonWithID } from "./network";
import Page404 from "./404";
import Media from "./Media";
class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: parseInt(props.id),
      pokemonData: {},
      isLoading: true,
      error: {}
    };
  }
  async componentDidMount() {
    const { id } = this.state;
    if (id && !isNaN(id)) {
      const pokemonData = await getPokemonWithID(id);
      if (!pokemonData) {
        this.setState({ isLoading: false, error: "Pokemon not found" });
      }
      if (pokemonData.error) {
        this.setState({ isLoading: false, error: pokemonData.error });
      } else {
        this.setState({
          isLoading: false,
          pokemonData: pokemonData,
          error: false
        });
      }
    } else {
      this.setState({
        isLoading: false,
        error: "Invalid input"
      });
    }
  }
  render() {
    const { isLoading, id, pokemonData, error } = this.state;
    if (isLoading) {
      return <p>Loading Data</p>;
    } else {
      if (!id || isNaN(id)) {
        return <Page404 />;
      }
      if (error) {
        return <Page404 />;
      } else {
        if (pokemonData) {
          return <Media data={pokemonData} />;
        } else {
          return <Page404 />;
        }
      }
    }
  }
}
export default Pokemon;
