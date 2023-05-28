import * as React from 'react';
import './board.css';

const dictionaryLetters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export default function Board({ pokemonUrl, roundNumber, answerIsWrong }) {
  return (
    <div className="board">
      {dictionaryLetters.map((letter, index) => {
        return (
          <div
            key={index}
            className={
              'letter-' + letter + (roundNumber == index ? ' active' : '')
            }
          >
            {letter}
          </div>
        );
      })}
      <div
        className="pokemon"
        style={{
          backgroundImage: `url(${pokemonUrl})`,
          filter: `brightness(${answerIsWrong ? 1 : 0})`,
        }}
      ></div>
    </div>
  );
}
