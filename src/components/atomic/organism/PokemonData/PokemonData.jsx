import styled from 'styled-components';
import { Row, Col } from 'antd';

import { Text } from '@atomic';

const DataWrapper = styled.div``;

const Content = styled.div`
  background-color: #ffffff40;
  border-radius: 1.2rem;
  padding: 1rem;
`;

const PokemonData = ({ pokemon }) => {
  return (
    <DataWrapper>
      <Text>About</Text>
      <Content>
        <Text fontSize={0.8}>{pokemon?.about}</Text>
      </Content>
      <Text>Abilities</Text>
      <Content>
        {pokemon?.abilities.map(({ ability }) => {
          return (
            <div key={ability?.name}>
              <Text fontSize={0.8}>- {ability?.name || 'asd'}</Text>
            </div>
          );
        })}
      </Content>
      <Text>Base Stats</Text>
      <Content>
        <Row>
          {pokemon?.stats.map(({ base_stat, stat }, idx) => (
            <Col xs={12} sm={12} key={idx}>
              <Text fontSize={0.8}>
                {stat?.name} - {base_stat}
              </Text>
            </Col>
          ))}
        </Row>
      </Content>
    </DataWrapper>
  );
};

export default PokemonData;
