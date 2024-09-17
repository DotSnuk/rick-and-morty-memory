import { useEffect, useState, createRef, forwardRef, useRef } from 'react';
import { getCharacters, getCharWithId } from './api';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import backImage from '../assets/back.jpg';

export function Grid({ IDs, handleClick }) {
  const [cardData, setCardData] = useState([]);
  const [isRotated, setIsRotated] = useState(true); //react strict mode triggers rotation (I think). should be false

  const updateCards = data => {
    const cardArray = [];
    for (let i = 0; i < data.length; i += 1) {
      cardArray.push({
        front: data[i],
        back: backImage,
        index: i,
      });
    }
    setCardData(cardArray);
    toggleRotate();
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
