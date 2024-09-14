import { useEffect, useState, createRef, forwardRef } from 'react';
import { getCharacters, getCharWithId } from './api';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import png from '../assets/png.png';

const EMPTY_CARDARRAY = getEmptyCardArray();

export function Grid({ IDs, handleClick }) {
  const [cardData, setCardData] = useState([]);

  const updateCards = (...data) => {
    if (data.length > 0) {
      const cardArray = [];
      for (let i = 0; i < data[0].length; i += 1) {
        cardArray.push({ front: data[0][i], back: png, index: i });
      }
      setCardData(cardArray);
      return;
    }
    setCardData(EMPTY_CARDARRAY);
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
      <TransitionGroup component={null}>
        {cardData.map(card => {
          const nodeRef = createRef(null);
          return (
            <CSSTransition
              nodeRef={nodeRef}
              key={card.index}
              timeout={800}
              classNames={'card'}
            >
              <Card
                ref={nodeRef}
                key={card.index}
                cardData={card}
                handleClick={handleClick}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
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

function getEmptyCardArray() {
  const cardArray = [];
  for (let i = 0; i < 12; i += 1) {
    cardArray.push({ front: null, back: png, index: i });
  }
  return cardArray;
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

const Card = forwardRef(function Card(props, ref) {
  const { front, back } = props.cardData;
  const cardClick = e => {
    toggleClass(e.target.closest('.card'));
  };
  const frontNull = front === null;

  return (
    <div
      ref={ref}
      onClick={e => props.handleClick(front.id, e, cardClick)}
      className='card'
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
});

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
