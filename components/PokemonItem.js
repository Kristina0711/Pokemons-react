import styles from "./styles/pokemonItem.module.css";

const PokemonItem = (props) => {
  const { name, getInfo } = props;

  return (
    <div className={styles.pokemon}>
      <div className={styles.pokemon_container}>
        <h3 className={styles.pokemon_name}>{name}</h3>
        <button className={styles.pokemon_btn} onClick={() => getInfo(name)}>
          Подробнее
        </button>
      </div>
    </div>
  );
};

export default PokemonItem;
