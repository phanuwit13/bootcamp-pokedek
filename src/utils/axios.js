import Axios from 'axios'

const createAxios = (baseUrl) =>
  Axios.create({
    baseURL: baseUrl,
  })

const pokemonApiV2 = createAxios('https://pokeapi.co/api/v2/')
const pokemonUser = createAxios('https://difficult-fish-sunglasses.cyclic.app/')

export { pokemonApiV2, pokemonUser }
