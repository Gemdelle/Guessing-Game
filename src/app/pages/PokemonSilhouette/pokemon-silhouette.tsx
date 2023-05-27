/* eslint-disable prettier/prettier */
import Board from 'app/components/Board/board';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './pokemon-silhouette.css';

export default function PokemonSilhouette() {
  const navigate = useNavigate();

  const pokemonMenu = () => navigate('/pokemon-menu');
  const homePage = () => navigate('/');

  return (
    <>
      <div className="board-container">
        <Board />
        <Board />
      </div>
    </>
  );
}
