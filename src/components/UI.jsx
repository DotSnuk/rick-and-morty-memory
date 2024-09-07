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
  console.log('render');

  return <div className='gamegrid'>{cards}</div>;
}

export function Card({ characterObject, handleClick }) {
  const { id, image, name } = characterObject;
  return (
    <div className='card'>
      <img src={image} onClick={() => handleClick(id)} />
      <div className='name'>{name}</div>
    </div>
  );
}
