import { useEffect, useRef, useMemo, useState } from 'react';
import { getCharacters, getCharWithId } from './api';
import png from '../assets/png.png';

const loadingCards = getLoadingCards();

export function Grid({ IDs, handleClick }) {
  const [characterObjects, setCharacterObjects] = useState([]);
  const cards = useMemo(() => {
    const cardArray = [];
    for (let i = 0; i < characterObjects.length; i += 1) {
      cardArray.push(
        <Card
          key={i}
          characterObject={characterObjects[i]}
          handleClick={handleClick}
        />,
      );
    }
    return cardArray;
  }, [characterObjects]);

  useEffect(() => {
    async function asyncFunc(IDs) {
      await Promise.all(
        IDs.map(async id => {
          return getCharWithId(id);
        }),
      ).then(d => {
        setCharacterObjects(d);
      });
    }
    asyncFunc(IDs);
  }, [IDs]);

  return (
    <div className='gamegrid'>
      {(cards.length === 0 && loadingCards) || cards}
    </div>
  );
}

function flipCards() {
  // wait with flipping.. make it do something
  // simple while you figure out the logic
  // pick another image?
}

function toggleClass(elem) {
  elem.classList.toggle('success');
}

function getLoadingCards() {
  const cardArray = [];
  for (let i = 0; i < 12; i += 1) {
    cardArray.push(<LoadingCard key={i} />);
  }
  return cardArray;
}

export function LoadingCard() {
  return (
    <div className='card load' style={{ background: `url(${png})` }}></div>
  );
}

export function Card({ characterObject, handleClick }) {
  const { id, image, name } = characterObject;

  const cardClick = e => {
    toggleClass(e.target.closest('.card'));
  };

  return (
    <div onClick={e => handleClick(id, e, cardClick)} className='card'>
      <img src={image} />
      <div className='name'>{name}</div>
    </div>
  );
}

export function GameOver({ score, highestScore, newGame }) {
  return (
    <div>
      Game over. Your current score was: {score} and your high score is:{' '}
      {highestScore}
      Would you like to start a new game?
      <br />
      <button onClick={newGame}>New Game</button>
    </div>
  );
}

export function Scoreboard({ score }) {
  return <header>{score}</header>;
}
