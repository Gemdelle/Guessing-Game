/* eslint-disable prettier/prettier */
import Board from 'app/components/Board/board';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './pokemon-silhouette.css';

import data from '../../../data/data.json';
import { useState } from 'react';

export default function PokemonSilhouette() {
  const [currentPlayer1Round, setCurrentPlayer1Round] = useState(0);
  const [currentPlayer2Round, setCurrentPlayer2Round] = useState(0);

  const navigate = useNavigate();

  const homePage = () => navigate('/');

  const player1 = Object.keys(data.pokemons).map(key => {
    return data.pokemons[key][0];
  });

  const player2 = Object.keys(data.pokemons).map(key => {
    return data.pokemons[key][1];
  });

  return (
    <div className="container">
      {/* <div className="intro">
        <div>
          <span>Player 1:</span>
          <input placeholder="Insert Name of Player 1"></input>
        </div>
        <div>
          <span>Player 2:</span>
          <input placeholder="Insert Name of Player 2"></input>
        </div>
      </div> */}
      <div className="board-container">
        <Board
          pokemonUrl={'/images/' + player1[currentPlayer1Round] + '.png'}
          roundNumber={currentPlayer1Round}
          answerIsWrong={undefined}
        />
        <div className="bar"></div>
        <div className="timer"></div>
        <Board
          pokemonUrl={'/images/' + player2[currentPlayer2Round] + '.png'}
          roundNumber={currentPlayer2Round}
          answerIsWrong={undefined}
        />
        <input type="text"></input>
      </div>
    </div>
  );
}
