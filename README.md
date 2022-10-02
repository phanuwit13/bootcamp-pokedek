# Bootcamp - Pokedex App

## API-Spec
- get pokemon list [https://pokeapi.co/docs/v2#pokemon]

    method: get

    params: limit: number, offset: number

    api -> https://pokeapi.co/api/v2/pokemon?limit={number}&offset={number}

    example api -> https://pokeapi.co/api/v2/pokemon?limit=100&offset=0


- get pokemon info [https://pokeapi.co/docs/v2#pokemon]

    method: get

    params: -

    api -> https://pokeapi.co/api/v2/pokemon/{:id or name}

    example api -> https://pokeapi.co/api/v2/pokemon/clefairy

