import Card from './Card';
const tempCards = 12;

export default function Grid() {
  const cards = [];
  for (let i = 0; i < tempCards; i += 1) {
    cards.push(<Card key={i} val={i} />);
  }

  return <div className='gamegrid'>{cards}</div>;
}
