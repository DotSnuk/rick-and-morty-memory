import { Grid } from './UI';
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

  useEffect(() => {
    const fetchData = async () => {
      const results = await getCharacters();
      console.log(results);
    };
    fetchData();
  }, []);

  console.log(currentCardsId);

  return (
    <>
      <Grid />
    </>
  );
}
