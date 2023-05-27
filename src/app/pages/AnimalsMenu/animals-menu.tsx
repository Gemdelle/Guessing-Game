/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AnimalsMenu() {
  const navigate = useNavigate();

  const pokemonMenu = () => navigate('/pokemon-menu');
  const homePage = () => navigate('/');

  return (
    <>
      <h1>Guessing Game</h1>
      <button onClick={pokemonMenu}>Pokémon</button>
    </>
  );
}
