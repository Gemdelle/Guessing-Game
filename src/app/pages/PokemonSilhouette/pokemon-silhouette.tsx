/* eslint-disable prettier/prettier */
import Board from 'app/components/Board/board';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './pokemon-silhouette.css';

import data from '../../../data/data.json';
import { useState } from 'react';
import Timer from 'app/components/Timer/Timer';

export default function PokemonSilhouette() {
  const [currentPlayer1Round, setCurrentPlayer1Round] = useState(0);
  const [currentPlayer2Round, setCurrentPlayer2Round] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [forceReset, setForceReset] = useState(false);

  const [player1InputValue, setPlayer1InputValue] = useState('');
  const [player2InputValue, setPlayer2InputValue] = useState('');

  const [player1AnsweredCorrectly, setPlayer1AnsweredCorrectly] =
    useState(false);
  const [player2AnsweredCorrectly, setPlayer2AnsweredCorrectly] =
    useState(false);

  const navigate = useNavigate();

  const homePage = () => navigate('/');

  const player1 = Object.keys(data.pokemons).map(key => {
    return data.pokemons[key][0];
  });

  const player2 = Object.keys(data.pokemons).map(key => {
    return data.pokemons[key][1];
  });

  function answerGivenByPlayer1(answer) {
    if (player1[currentPlayer1Round].toLowerCase() === answer.toLowerCase()) {
      setPlayer1AnsweredCorrectly(true);
      setTimeout(() => {
        setCurrentPlayer1Round(prevRound => prevRound + 1);
        setPlayer1AnsweredCorrectly(false);
      }, 1000);
    } else {
      setCurrentPlayer(2);
    }
    resetPlayer1();
    setForceReset(true);
    setTimeout(() => {
      setForceReset(false);
    }, 0);
  }

  function answerGivenByPlayer2(answer) {
    if (player2[currentPlayer2Round].toLowerCase() === answer.toLowerCase()) {
      setPlayer2AnsweredCorrectly(true);
      setTimeout(() => {
        setCurrentPlayer2Round(prevRound => prevRound + 1);
        setPlayer2AnsweredCorrectly(false);
      }, 1000);
    } else {
      setCurrentPlayer(1);
    }
    resetPlayer2();
    setForceReset(true);
    setTimeout(() => {
      setForceReset(false);
    }, 0);
  }

  function registerPlayer1Answer(event) {
    if (event.key === 'Enter') {
      answerGivenByPlayer1(player1InputValue);
    }
  }

  function registerPlayer2Answer(event) {
    if (event.key === 'Enter') {
      answerGivenByPlayer2(player2InputValue);
    }
  }

  function resetPlayer1() {
    setPlayer1InputValue('');
  }

  function resetPlayer2() {
    setPlayer2InputValue('');
  }

  function onTimerReset() {
    if (currentPlayer == 1) {
      setCurrentPlayer(2);
      resetPlayer1();
    } else {
      setCurrentPlayer(1);
      resetPlayer2();
    }
  }

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
        <div className="board-table">
          <div className="player-name"></div>
          <Board
            pokemonUrl={'/pokemon/' + player1[currentPlayer1Round] + '.png'}
            answerIsWrong={player1AnsweredCorrectly}
            roundNumber={currentPlayer1Round}
            isHisTurn={currentPlayer === 1}
          />
          <button className="points"></button>
        </div>
        <div className="board-table">
          <div className="player-name"></div>
          <Board
            pokemonUrl={'/pokemon/' + player2[currentPlayer2Round] + '.png'}
            answerIsWrong={player2AnsweredCorrectly}
            roundNumber={currentPlayer2Round}
            isHisTurn={currentPlayer === 2}
          />
          <button className="points"></button>
        </div>
        <Timer
          duration={20}
          forceReset={forceReset}
          onTimerFinished={onTimerReset}
        />
        <div className="bar"></div>
        <div className="timer"></div>

        <div className="next-question"></div>
        {currentPlayer === 1 ? (
          <div className="input">
            <input
              value={player1InputValue}
              type="text"
              onChange={event => setPlayer1InputValue(event.target.value)}
              onKeyDown={registerPlayer1Answer}
            ></input>
          </div>
        ) : (
          <div className="input">
            <input
              value={player2InputValue}
              type="text"
              onChange={event => setPlayer2InputValue(event.target.value)}
              onKeyDown={registerPlayer2Answer}
            ></input>
          </div>
        )}
      </div>
    </div>
  );
}
