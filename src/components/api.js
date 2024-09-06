const API_URL = 'https://rickandmortyapi.com/api/character';

export async function getCharacters() {
  const data = await fetch(API_URL).then(response => response.json());
  return data;
}

export async function getMaxCharCount() {
  const data = await fetch(API_URL).then(response => response.json());
  return data.info.count;
}

export async function getCharWithId(id) {}
