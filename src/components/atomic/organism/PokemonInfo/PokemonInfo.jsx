import styled from 'styled-components';

import { Text } from '@atomic';
import { getWeight, getHeight } from '@utils';

const StyledImage = styled.div`
  padding: 2rem;
  max-width: 20rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  border-radius: 1.2rem;
`;

const PokemonInfo = ({ pokemon }) => {
  return (
    <InfoWrapper>
      <Text>#{pokemon?.id}</Text>
      <Text>Name: {pokemon?.name}</Text>
      <StyledImage>
        <img src={pokemon?.image} width="100%" />
      </StyledImage>
      <Text fontSize="0.8">Height: {getHeight(pokemon?.height)}</Text>
      <Text fontSize="0.8">Weight: {getWeight(pokemon?.weight)}</Text>
    </InfoWrapper>
  );
};

export default PokemonInfo;
