import { Grid, Scoreboard } from './UI';
import { getCharacters, getMaxCharCount } from './api';
import { useState, useEffect } from 'react';

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

  function handleClick(id) {
    if (!isClicked(id)) {
    }
    setClickedCharacters(previous => [...previous, id]);
    setCurrentCardsId([...getNewIds()]);
    console.log(clickedCharacters);
  }

  return (
    <>
      <Scoreboard score={clickedCharacters.length} />
      <Grid IDs={currentCardsId} handleClick={handleClick} />
    </>
  );
}
