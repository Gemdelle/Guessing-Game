/* eslint-disable prettier/prettier */
import Board from 'app/components/Board/board';
import * as React from 'react';
import './pokemon-silhouette.css';

import data from '../../../data/data.json';
import { useState } from 'react';
import Timer from 'app/components/Timer/Timer';

export default function PokemonSilhouette() {
  const [playersLoaded, setPlayersLoaded] = useState(false);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1InputName, setPlayer1InputName] = useState('');
  const [player2InputName, setPlayer2InputName] = useState('');
  const [playersPoints, setPlayersPoints] = useState({ '1': 0, '2': 0 });
  const [currentPlayerStreak, setCurrentPlayerStreak] = useState(0);

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

  const player1 = Object.keys(data.pokemons).map(key => {
    return data.pokemons[key][0];
  });

  const player2 = Object.keys(data.pokemons).map(key => {
    return data.pokemons[key][1];
  });

  function answerGivenByPlayer1(answer) {
    if (player1[currentPlayer1Round].toLowerCase() === answer.toLowerCase()) {
      setPlayer1AnsweredCorrectly(true);
      creditPoints('RIGHT');
      setTimeout(() => {
        setCurrentPlayer1Round(prevRound => prevRound + 1);
        setPlayer1AnsweredCorrectly(false);
      }, 1000);
    } else {
      creditPoints('WRONG');
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
      creditPoints('RIGHT');
      setTimeout(() => {
        setCurrentPlayer2Round(prevRound => prevRound + 1);
        setPlayer2AnsweredCorrectly(false);
      }, 1000);
    } else {
      creditPoints('WRONG');
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
    creditPoints('END_TIMER');
    if (currentPlayer === 1) {
      setCurrentPlayer(2);
      resetPlayer1();
    } else {
      setCurrentPlayer(1);
      resetPlayer2();
    }
  }

  function registerPlayer1Name(provisoryName) {
    setPlayer1InputName(provisoryName);
    if (player1Name !== '' && player2Name !== '') {
      setPlayersLoaded(true);
    }
  }

  function registerPlayer2Name(provisoryName) {
    setPlayer2InputName(provisoryName);
    if (player1Name !== '' && player2Name !== '') {
      setPlayersLoaded(true);
    }
  }

  function savePlayer1Name(event) {
    if (event.key === 'Enter') {
      setPlayer1Name(player1InputName);
    }
  }

  function savePlayer2Name(event) {
    if (event.key === 'Enter') {
      setPlayer2Name(player2InputName);
    }
  }

  function creditPoints(answerResult) {
    switch (answerResult) {
      case 'RIGHT':
        setCurrentPlayerStreak(currentPlayerStreak + 1);
        setPlayersPoints({
          ...playersPoints,
          [currentPlayer]:
            playersPoints[currentPlayer] +
            10 +
            (currentPlayerStreak >= 3 ? 10 : 0),
        });
        break;
      case 'WRONG':
        setPlayersPoints({
          ...playersPoints,
          [currentPlayer]:
            playersPoints[currentPlayer] - 10 >= 0
              ? playersPoints[currentPlayer] - 10
              : 0,
        });
        setCurrentPlayerStreak(0);
        break;
      case 'END_TIMER':
        setPlayersPoints({
          ...playersPoints,
          [currentPlayer]:
            playersPoints[currentPlayer] - 5 >= 0
              ? playersPoints[currentPlayer] - 5
              : 0,
        });
        setCurrentPlayerStreak(0);
        break;
      default:
        setCurrentPlayerStreak(0);
    }
  }

  function retrievePlayersSection() {
    return (
      <div className="intro">
        <div>
          <span>Player 1:</span>
          <input
            type="text"
            placeholder="Insert Name of Player 1"
            onChange={event => registerPlayer1Name(event.target.value)}
            onKeyDown={savePlayer1Name}
          ></input>
        </div>
        <div>
          <span>Player 2:</span>
          <input
            type="text"
            placeholder="Insert Name of Player 2"
            onChange={event => registerPlayer2Name(event.target.value)}
            onKeyDown={savePlayer2Name}
          ></input>
        </div>
      </div>
    );
  }

  function retrieveBoardSection() {
    return (
      <div className="board-container">
        <div className="board-table">
          <div className="player-name">
            <span>{player1Name}</span>
          </div>
          <Board
            pokemonUrl={'/pokemon/' + player1[currentPlayer1Round] + '.png'}
            answerIsWrong={player1AnsweredCorrectly}
            roundNumber={currentPlayer1Round}
            isHisTurn={currentPlayer === 1}
          />
        </div>
        <div className="board-table">
          <div className="player-name">
            <span>{player2Name}</span>
          </div>
          <Board
            pokemonUrl={'/pokemon/' + player2[currentPlayer2Round] + '.png'}
            answerIsWrong={player2AnsweredCorrectly}
            roundNumber={currentPlayer2Round}
            isHisTurn={currentPlayer === 2}
          />
        </div>
        <Timer
          duration={20}
          forceReset={forceReset}
          onTimerFinished={onTimerReset}
        />
        <div className="title"></div>
        <div className="bar"></div>
        <div className="timer"></div>
        <div className="player-1-points"></div>
        <div className="player-2-points"></div>

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
    );
  }

  return (
    <div className="container">
      {playersLoaded ? retrieveBoardSection() : retrievePlayersSection()}
    </div>
  );
}
