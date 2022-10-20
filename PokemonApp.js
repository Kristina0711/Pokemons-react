import React from "react";
import axios from "axios";
import styles from "./PokemonApp.css";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";

const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";

let urlPokemon = "";

class PokemonApp extends React.Component {
  state = {
    pokemons: null,
    selectedPokemon: null,
    pokemonDetails: null,
    urlPokemon: null,
    next: url,
    back: null,
  };

  componentDidMount() {
    axios.get(`${url}`).then((response) => {
      const next = response.data.next;
      const pokemons = response.data.results;
      this.setState({ pokemons, next });
    });
  }

  getInfo = (name) => {
    const selectedPokemon = this.state.pokemons.filter((pokemon) => {
      if (pokemon.name === name) {
        urlPokemon = pokemon.url;
        return pokemon;
      }
      return null;
    });

    this.setState({
      selectedPokemon: selectedPokemon[0].results,
      urlPokemon: urlPokemon,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedPokemon !== prevState.selectedPokemon) {
      this.fetchData(this.state.selectedPokemon);
    }

    if (this.state.urlPokemon !== prevState.urlPokemon) {
      this.fetchData(this.state.urlPokemon);
    }
  }

  fetchData = () => {
    axios.get(`${urlPokemon}`).then((response) => {
      const pokemonDetails = response.data;
      this.setState({ pokemonDetails });
    });
  };

  backPage = () => {
    if (this.state.back !== null) {
      axios.get(`${this.state.back}`).then((response) => {
        const next = response.data.next;
        const back = response.data.back;
        const pokemons = response.data.results;

        this.setState({ next, back, pokemons });
      });
    }
  };

  nextPage = () => {
    axios.get(`${this.state.next}`).then((response) => {
      const next = response.data.next;
      const back = response.data.back;
      const pokemons = response.data.results;

      this.setState({ next, back, pokemons });
    });
  };

  render() {
    const { pokemons, pokemonDetails } = this.state;

    if (!pokemons) {
      return <div>Загрузка</div>;
    }

    return (
      <div className={styles.app}>
        <div className={styles.container}>
          <div className={styles.main}>
            <PokemonList pokemons={pokemons} getInfo={this.getInfo} />

            {pokemonDetails && (
              <PokemonDetails
                pokemonDetails={pokemonDetails}
                url={urlPokemon}
                getInfo={this.getInfo}
              />
            )}
          </div>

          <div className="container">
            <button className="back" onClick={() => this.backPage()}>Back</button>
            <button className="next" onClick={() => this.nextPage()}>Next</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonApp;
