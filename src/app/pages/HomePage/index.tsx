/* eslint-disable prettier/prettier */
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const pokemonMenu = () => navigate('/pokemon-menu');
  const animalsMenu = () => navigate('/animals-menu');
  const coloursMenu = () => navigate('/colours-menu');

  return (
    <>
      <h1>Guessing Game</h1>
      <button onClick={pokemonMenu}>Pokémon</button>
      <button onClick={animalsMenu}>Animals</button>
      <button onClick={coloursMenu}>Colours</button>
    </>
  );
}
