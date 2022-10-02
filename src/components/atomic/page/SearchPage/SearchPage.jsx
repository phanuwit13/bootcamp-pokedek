import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Spin, Alert } from 'antd';
import { filter } from 'lodash';

import { Logo, FilterDropdown, Search, PokemonCard } from '@atomic';
import { pokemonApiV2, useToken, pokemonApiUserData } from '@utils';

import pokemonLogo from '@/assets/images/pokedex.png';

import {
  regions,
  types,
  sortby,
  filterByType,
  filterBySearch,
  sortingBy
} from './helper';

const regionDropdownItems = regions.map((r) => ({
  ...r,
  key: r?.name,
  value: r?.name,
  label: `${r?.name} (${r?.offset} - ${r?.limit + r?.offset})`
}));

const typeDropdownItems = types.map((t) => ({
  key: t,
  value: t,
  label: t
}));

const sortbyDropdownItems = sortby.map((s) => ({
  key: s,
  value: s,
  label: s
}));

const getQueryString = (region) => {
  if (!region) return null;

  let query = new URLSearchParams();

  query.append('limit', region?.limit);
  query.append('offset', region?.offset);

  return query.toString();
};

const getPokemonLists = (pokemons = [], filters = {}) => {
  const { search, type, sortBy } = filters;

  const pokemonLists = filter(pokemons, (pokemon) => {
    let remove = false;

    if (search && !filterBySearch(pokemon, search)) {
      remove = true;
    }

    if (
      type &&
      type?.value !== 'all types' &&
      !filterByType(pokemon, type?.value)
    ) {
      remove = true;
    }

    return !remove;
  });

  const sortedPokemonList = pokemonLists.sort(sortingBy(sortBy?.value));

  const result = sortedPokemonList.map((pokemon) => ({
    ...pokemon,
    image: pokemon?.sprites?.other?.dream_world?.front_default
  }));

  return result;
};

const initial = {
  data: [],
  loading: false,
  error: null
};

const DEFAULT_ALERT = {
  data: '',
  type: 'info'
};

const SearchPage = ({ logout }) => {
  const [filters, setFilter] = useState({});
  const [state, setState] = useState(initial);
  const { user, token, setToken } = useToken();
  const [alertMsg, setAlertMsg] = useState(DEFAULT_ALERT);

  const onFilterChange = (key, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [key]: value
    }));
  };

  const queryString = getQueryString(filters.region);
  const pokemonLists = getPokemonLists(state?.data, filters);

  const fetchPokemonList = async () => {
    if (!queryString) return;

    let pokemonList = [];
    let fetchError = null;

    setState((prev) => ({
      ...prev,
      loading: true
    }));

    try {
      const response = await pokemonApiV2.get(`pokemon?${queryString}`);
      const pokemonResults = response?.data?.results || [];

      for (let pokemon of pokemonResults) {
        const response = await pokemonApiV2.get(`pokemon/${pokemon?.name}`);
        const monster = await response?.data;
        await pokemonList.push({ ...monster, score: 0 });
      }
    } catch (error) {
      fetchError = error;
    }

    try {
      const response = await pokemonApiUserData.get(`/pokemon/score/all`, {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      const pokemonResults = response?.data?.data || [];
      if (response.data.success) {
        setToken(response.data._token);
      }
      pokemonResults.forEach((item) => {
        const indexList = pokemonList.findIndex(
          (el) => el.id == item.pokemon_id
        );
        pokemonList[indexList] = {
          ...pokemonList[indexList],
          score: item.score
        };
      });
      console.log('pokemonList', pokemonList);
    } catch (error) {
      fetchError = error;
    }

    setState((prev) => ({
      ...prev,
      data: pokemonList,
      loading: false,
      error: fetchError
    }));
  };

  const handleOnVoteClick = async (id) => {
    setAlertMsg(DEFAULT_ALERT);
    let response = await pokemonApiUserData.post(
      'pokemon/vote',
      {
        item: [
          {
            id: id
          }
        ]
      },
      {
        headers: {
          Authorization: `bearer ${token}`
        }
      }
    );
    if (response.data.success) {
      fetchPokemonList();
      setToken(response.data._token);
    } else {
      setAlertMsg({
        data: response.data.data,
        type: 'error'
      });
    }
  };

  useEffect(() => {
    queryString && fetchPokemonList();
  }, [queryString]);

  return (
    <Container>
      {alertMsg.data && (
        <AlertMessage>
          <Alert message={alertMsg.data} type={alertMsg.type} banner />
        </AlertMessage>
      )}
      <HeaderContainer>
        <Logo src={pokemonLogo} width={200} />
        <LeftMenu>
          <span>{user?.firstName}</span>
          <LogoutButton role="button" onClick={logout}>
            Logout
          </LogoutButton>
        </LeftMenu>
      </HeaderContainer>
      <StyledRow>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label="REGION"
            items={regionDropdownItems}
            onChange={(item) => onFilterChange('region', item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label="TYPE"
            items={typeDropdownItems}
            onChange={(item) => onFilterChange('type', item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label="SORT BY"
            items={sortbyDropdownItems}
            onChange={(item) => onFilterChange('sortBy', item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Search
            label="SEARCH"
            placeholder="TYPING . . ."
            onChange={(v) => onFilterChange('search', v)}
          />
        </Col>
      </StyledRow>
      <PokemonContainer>
        {state.loading ? (
          <Spin />
        ) : (
          [...pokemonLists].map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              handleOnVoteClick={handleOnVoteClick}
            />
          ))
        )}
      </PokemonContainer>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  text-align: center;
  width: 90%;
  margin: auto;
`;

const StyledRow = styled(Row)`
  max-width: 1000px;
  margin: auto;
  margin-top: 2rem;
  padding: 2rem;
`;

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  justify-content: space-around;
`;

const HeaderContainer = styled.div`
  position: relative;
`;

const LeftMenu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  display: flex;
  gap: 10px;
  'a': {
    color: #d9d9d9;
  }
`;

const LogoutButton = styled.div`
  color: #d9d9d9;
  cursor: pointer;
  &:hover {
    color: #1890ff;
  }
`;

const AlertMessage = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;
