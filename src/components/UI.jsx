const tempCards = 12;

export function Grid() {
  const cards = [];
  for (let i = 0; i < tempCards; i += 1) {
    cards.push(<Card key={i} value={i} />);
  }

  return <div className='gamegrid'>{cards}</div>;
}

export function Card({ value }) {
  return <div className='card'>{value}</div>;
}
