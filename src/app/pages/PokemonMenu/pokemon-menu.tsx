/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PokemonMenu() {
  const navigate = useNavigate();

  const pokemonSilhouette = () => navigate('/pokemon-silhouette-game');
  const pokemonSound = () => navigate('/pokemon-sound-game');
  const homePage = () => navigate('/');

  return (
    <>
      <h1>Pokemon Game</h1>
      <button onClick={pokemonSilhouette}>Silhouette</button>
      <button onClick={pokemonSound}>Sound</button>
    </>
  );
}
