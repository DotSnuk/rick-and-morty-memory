import { useEffect, useMemo, useState } from 'react';
import { getCharacters, getCharWithId } from './api';

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

  return <div className='gamegrid'>{cards}</div>;
}

function toggleClass(elem) {
  elem.classList.toggle('success');
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
