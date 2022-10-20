import React from "react";
import styles from "./styles/pokemonDetails.module.css";

const PokemonDetails = (props) => {
  const { pokemonDetails } = props;
  const { name, sprites } = pokemonDetails;

  return (
    <div>
      <p className={styles.title}>{name}</p>
      <div>
        <img className={styles.pic} src={sprites.front_default} alt="pic"></img>
        <img className={styles.pic} src={sprites.back_default} alt="pic"></img>
      </div>
    </div>
  );
};
export default PokemonDetails;
