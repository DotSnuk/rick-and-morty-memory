import { Grid, Scoreboard, GameOver } from './UI';
import { getCharacters, getMaxCharCount } from './api';
import { useState, useEffect, useRef } from 'react';

const MAX_CHARCOUNT = await getMaxCharCount();

function getRandomId() {
  return Math.floor(Math.random() * MAX_CHARCOUNT + 1);
}

function getPreviousCardCount(highest) {
  const min = getMin(highest);
  return Math.floor(Math.random() * (highest - min) + min);
}

function getMin(highest) {
  return Math.floor(highest / 2);
}

function getRandomIntWithHighest(highest) {
  return Math.floor(Math.random() * highest);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getNewIds(...preClicked) {
  const idArray = [];
  if (preClicked.length > 0) {
    // Add some ID's that have been picked previously
    const highest = preClicked[0].length > 10 ? 10 : preClicked[0].length;
    const randomAmount = getPreviousCardCount(highest);
    const tempArr = [];
    while (tempArr.length < randomAmount) {
      const randomIndx = getRandomIntWithHighest(preClicked[0].length);
      if (!tempArr.includes(preClicked[0][randomIndx]))
        tempArr.push(preClicked[0][randomIndx]);
    }
    idArray.push(...tempArr);
  }
  while (idArray.length < 12) {
    const randomId = getRandomId();
    if (!idArray.includes(randomId)) idArray.push(randomId);
  }
  return shuffleArray(idArray);
}

export default function Game() {
  const [currentCardsId, setCurrentCardsId] = useState([...getNewIds()]);
  const [clickedCharacters, setClickedCharacters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const highestScore = useRef(0);
  const hasClicked = useRef(false);

  // for testing
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const results = await getCharacters();
  //   };
  //   fetchData();
  // }, []);

  function isClicked(id) {
    return clickedCharacters.includes(id);
  }

  function gameOver() {
    if (clickedCharacters.length > highestScore.current)
      highestScore.current = clickedCharacters.length;
    setIsGameOver(true);
  }

  function handleClick(id, e, cardCallback) {
    if (!hasClicked.current) {
      if (!isClicked(id)) {
        hasClicked.current = true;
        cardCallback(e);
        setTimeout(() => {
          cardCallback(e);
          hasClicked.current = false;
          setClickedCharacters(previous => [...previous, id]);
          setCurrentCardsId([...getNewIds([...clickedCharacters])]);
        }, '1000');
        return;
      }
      gameOver();
    }
  }

  function handleNewGame() {
    setCurrentCardsId([...getNewIds()]);
    setClickedCharacters([]);
    setIsGameOver(false);
  }

  return (
    <>
      <Scoreboard score={clickedCharacters.length} />
      {isGameOver ? (
        <GameOver
          score={clickedCharacters.length}
          highestScore={highestScore.current}
          newGame={handleNewGame}
        />
      ) : (
        <Grid IDs={currentCardsId} handleClick={handleClick} />
      )}
    </>
  );
}
