export default async function getCharacters() {
  const data = await fetch('https://rickandmortyapi.com/api/character').then(
    response => response.json(),
  );
}
