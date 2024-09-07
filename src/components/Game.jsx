import { Grid, Scoreboard, GameOver } from './UI';
import { getCharacters, getMaxCharCount } from './api';
import { useState, useEffect, useRef } from 'react';

const MAX_CHARCOUNT = await getMaxCharCount();

function getRandomId() {
  return Math.floor(Math.random() * MAX_CHARCOUNT + 1);
}

function getNewIds() {
  const idArray = [];
  while (idArray.length < 12) {
    const randomId = getRandomId();
    if (!idArray.includes(randomId)) idArray.push(randomId);
  }
  return idArray;
}

export default function Game() {
  const [currentCardsId, setCurrentCardsId] = useState([...getNewIds()]);
  const [clickedCharacters, setClickedCharacters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const highestScore = useRef(0);

  // for testing
  useEffect(() => {
    const fetchData = async () => {
      const results = await getCharacters();
      console.log(results);
    };
    fetchData();
  }, []);

  function isClicked(id) {
    return clickedCharacters.includes(id);
  }

  function gameOver() {
    if (clickedCharacters.length > highestScore.current)
      highestScore.current = clickedCharacters.length;
    setIsGameOver(true);
  }

  function handleClick(id) {
    if (!isClicked(id)) {
      setClickedCharacters(previous => [...previous, id]);
      setCurrentCardsId([...getNewIds()]);
      return;
    }
    gameOver();
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
