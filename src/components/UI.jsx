import { useEffect, useState, createRef, forwardRef, useRef } from 'react';
import { getCharacters, getCharWithId } from './api';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import png from '../assets/png.png';

const EMPTY_CARDARRAY = getEmptyCardArray();

export function Grid({ IDs, handleClick }) {
  const [cardData, setCardData] = useState([]);
  const [isRotated, setIsRotated] = useState(false);

  const updateCards = (...data) => {
    if (data.length > 0) {
      const cardArray = [];
      for (let i = 0; i < data[0].length; i += 1) {
        cardArray.push({
          front: data[0][i],
          back: png,
          index: i,
        });
      }
      setCardData(cardArray);
      toggleRotate();
      return;
    }
    setCardData(EMPTY_CARDARRAY);
  };

  const toggleRotate = () => {
    setIsRotated(!isRotated);
    console.log('is rotating');
  };

  useEffect(() => {
    async function asyncFunc(IDs) {
      await Promise.all(IDs.map(async id => getCharWithId(id))).then(d => {
        updateCards(d);
      });
    }
    asyncFunc(IDs);
  }, [IDs]);

  return (
    <div className='gamegrid'>
      {cardData.map(card => (
        <Card
          key={card.index}
          toggleRotate={toggleRotate}
          isRotated={isRotated}
          cardData={card}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}

function getEmptyCardArray() {
  const cardArray = [];
  for (let i = 0; i < 12; i += 1) {
    cardArray.push({ front: null, back: png, isRotated: true, index: i });
  }
  return cardArray;
}

function Card(props) {
  const { front, back } = props.cardData;
  const { isRotated } = props;

  return (
    <div
      onClick={() => props.handleClick(front.id, props.toggleRotate)}
      className={`card${(isRotated && ' rotate') || ''}`}
    >
      <div className='front'>
        <img src={front.image} />
        <div className='name'>{front.name}</div>
      </div>
      <div className='back'>
        <img src={back} />
      </div>
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
