import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Row, Col, Spin } from 'antd'
import { filter } from 'lodash'

import { Logo, FilterDropdown, Search, PokemonCard } from '@atomic'
import { pokemonApiV2, pokemonUser, useToken } from '@utils'

import pokemonLogo from '@/assets/images/pokedex.png'

import {
  regions,
  types,
  sortby,
  filterByType,
  filterBySearch,
  sortingBy,
} from './helper'

const regionDropdownItems = regions.map((r) => ({
  ...r,
  key: r?.name,
  value: r?.name,
  label: `${r?.name} (${r?.offset} - ${r?.limit + r?.offset})`,
}))

const typeDropdownItems = types.map((t) => ({
  key: t,
  value: t,
  label: t,
}))

const sortbyDropdownItems = sortby.map((s) => ({
  key: s,
  value: s,
  label: s,
}))

const getQueryString = (region) => {
  if (!region) return null

  let query = new URLSearchParams()

  query.append('limit', region?.limit)
  query.append('offset', region?.offset)

  return query.toString()
}

const getPokemonLists = (pokemons = [], filters = {}) => {
  const { search, type, sortBy } = filters

  const pokemonLists = filter(pokemons, (pokemon) => {
    let remove = false

    if (search && !filterBySearch(pokemon, search)) {
      remove = true
    }

    if (
      type &&
      type?.value !== 'all types' &&
      !filterByType(pokemon, type?.value)
    ) {
      remove = true
    }

    return !remove
  })

  const sortedPokemonList = pokemonLists.sort(sortingBy(sortBy?.value))

  const result = sortedPokemonList.map((pokemon) => ({
    ...pokemon,
    image: pokemon?.sprites?.other?.dream_world?.front_default,
  }))

  return result
}

const initial = {
  data: [],
  loading: false,
  error: null,
}

const SearchPage = ({ clearToken, user, savaToken }) => {
  const [filters, setFilter] = useState({})
  const [state, setState] = useState(initial)
  const { token } = useToken()

  const onFilterChange = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value,
    }))
  }

  const queryString = getQueryString(filters.region)
  const pokemonLists = getPokemonLists(state?.data, filters)

  const fetchPokemonList = async () => {
    if (!queryString) return

    let pokemonList = []
    let fetchError = null

    setState((prev) => ({
      ...prev,
      loading: true,
    }))

    try {
      const response = await pokemonApiV2.get(`pokemon?${queryString}`)
      const pokemonResults = response?.data?.results || []

      for (let pokemon of pokemonResults) {
        const response = await pokemonApiV2.get(`pokemon/${pokemon?.name}`)
        const monster = await response?.data
        await pokemonList.push({ ...monster, score: 0 })
      }
    } catch (error) {
      fetchError = error
    }

    try {
      const response = await pokemonUser.get(`pokemon/score/all`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      if (response.data?.data) {
        const pokemonResults = response?.data?.data || []
        savaToken(response.data._token)
        pokemonResults.forEach((item) => {
          let indexTarget = pokemonList.findIndex(
            (el) => el.id == item.pokemon_id
          )
          pokemonList[indexTarget] = {
            ...pokemonList[indexTarget],
            score: item.score,
          }
        })

        console.log(pokemonList)
      }
    } catch (error) {
      fetchError = error
    }

    setState((prev) => ({
      ...prev,
      data: pokemonList,
      loading: false,
      error: fetchError,
    }))
  }

  const onVote = async (id) => {
    let data = {
      item: [
        {
          id: id,
        },
      ],
    }
    const response = await pokemonUser.post(`pokemon/vote`, data, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    console.log('response', response)
    if (response.data.success) {
      fetchPokemonList()
      savaToken(response.data._token)
    }
  }

  useEffect(() => {
    queryString && fetchPokemonList()
  }, [queryString])

  return (
    <Container>
      <HeaderContainer>
        <Logo src={pokemonLogo} width={200} />
        <RightMenu>
          <div>{user.firstName}</div>
          <Link onClick={clearToken}>logout</Link>
        </RightMenu>
      </HeaderContainer>

      <StyledRow>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label='REGION'
            items={regionDropdownItems}
            onChange={(item) => onFilterChange('region', item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label='TYPE'
            items={typeDropdownItems}
            onChange={(item) => onFilterChange('type', item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label='SORT BY'
            items={sortbyDropdownItems}
            onChange={(item) => onFilterChange('sortBy', item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Search
            label='SEARCH'
            placeholder='TYPING . . .'
            onChange={(v) => onFilterChange('search', v)}
          />
        </Col>
      </StyledRow>
      <PokemonContainer>
        {state.loading ? (
          <Spin />
        ) : (
          [...pokemonLists].map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} onVote={onVote} />
          ))
        )}
      </PokemonContainer>
    </Container>
  )
}

export default SearchPage

const Container = styled.div`
  text-align: center;
  width: 90%;
  margin: auto;
`

const StyledRow = styled(Row)`
  max-width: 1000px;
  margin: auto;
  margin-top: 2rem;
  padding: 2rem;
`

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  justify-content: space-around;
`

const HeaderContainer = styled.div`
  position: relative;
`

const RightMenu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  display: flex;
  gap: 10px;
`
const Link = styled.span`
  color: gray;
  cursor: pointer;
  &:hover {
    color: blue;
  }
`
