import styles from "./styles/pokemonList.module.css";
import PokemonItem from "./PokemonItem";

const PokemonList = (props) => {
  const { pokemons, getInfo } = props;

  const allPokemons = pokemons.map((pokemon) => {
    return <PokemonItem key={pokemon.name} {...pokemon} getInfo={getInfo} />;
  });

  return (
    <div className={styles.list_pokemon}>
      <h1 className={styles.title}>Покемоны</h1>
      <div>{allPokemons}</div>
    </div>
  );
};

export default PokemonList;
