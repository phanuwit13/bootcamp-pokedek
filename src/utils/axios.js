import Axios from 'axios';

const createAxios = (baseUrl) =>
  Axios.create({
    baseURL: baseUrl
  });

const pokemonApiV2 = createAxios('https://pokeapi.co/api/v2/');
const pokemonApiUserData = createAxios('http://localhost:8080/');

export { pokemonApiV2, pokemonApiUserData };
