import {
  useEffect,
  useRef,
  useMemo,
  useState,
  createRef,
  forwardRef,
} from 'react';
import { getCharacters, getCharWithId } from './api';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import png from '../assets/png.png';

const loadingCards = getLoadingCards();
const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export function Grid({ IDs, handleClick }) {
  const [characterObjects, setCharacterObjects] = useState([]);

  useEffect(() => {
    async function asyncFunc(IDs) {
      await Promise.all(
        IDs.map(async id => {
          const char = await getCharWithId(id);
          return { ...char, nodeRef: createRef(null) };
        }),
      ).then(d => {
        setCharacterObjects(d);
      });
    }
    asyncFunc(IDs);
  }, [IDs]);

  console.log(characterObjects);

  return (
    <div className='gamegrid'>
      <TransitionGroup component={null}>
        {characterObjects.map(char => {
          const nodeRef = createRef(null);
          return (
            <CSSTransition
              nodeRef={nodeRef}
              key={char.id}
              timeout={300}
              classNames={'card'}
            >
              <Card
                ref={nodeRef}
                props={{ char, handleClick }}
                key={char.id}
                characterObject={char}
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

// function FadeCard({ characterObject, handleClick }) {
//   const nodeRef = useRef(null);
//   return (
//     <Transition nodeRef={nodeRef} timeout={duration}>
//       {state => (
//         <Card
//           ref={nodeRef}
//           style={{ ...defaultStyle, ...transitionStyles[state] }}
//           characterObject={characterObject}
//           handleClick={handleClick}
//         />
//       )}
//     </Transition>
//   );
// }

const Card = forwardRef(function Card(props, ref) {
  const { id, image, name } = props.characterObject;
  const cardClick = e => {
    toggleClass(e.target.closest('.card'));
  };

  return (
    <div
      ref={ref}
      onClick={e => props.handleClick(id, e, cardClick)}
      className='card'
    >
      <img src={image} />
      <div className='name'>{name}</div>
    </div>
  );
});

// Card.displayName = 'Card';

// export function Card({ characterObject, handleClick }) {
//   const { id, image, name } = characterObject;
//   const cardClick = e => {
//     toggleClass(e.target.closest('.card'));
//   };

//   return (
//     <div onClick={e => handleClick(id, e, cardClick)} className='card'>
//       <img src={image} />
//       <div className='name'>{name}</div>
//     </div>
//   );
// }

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
