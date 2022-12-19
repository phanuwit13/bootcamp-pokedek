import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { Card, Text, IconToggle } from '@atomic'
import { getCardColorsByPokemonTypes } from '@utils'

const PokemonCard = ({ pokemon, onVote }) => {
  let navigate = useNavigate()

  const pokemonId = <span>#{pokemon.id}</span>

  const handleOnIconInfoClick = () => {
    navigate(`/pokemon?id=${pokemon.id}`, { replace: true })
  }
  const checkScore = (score) => {
    return score > 1000 ? `${score / 1000}K` : score
  }

  const icons = (
    <div>
      <Score>{pokemon.score > 0 && checkScore(pokemon.score)}</Score>
      <IconToggle
        active={pokemon.score > 0}
        name='heart'
        margin={'0 0.3rem 0 0'}
        onClick={() => {
          onVote(pokemon.id)
        }}
      />
      <IconToggle
        name='info'
        isColorChange={false}
        onClick={handleOnIconInfoClick}
      />
    </div>
  )

  const bgColors = getCardColorsByPokemonTypes(pokemon?.types)

  return (
    <Container bgColors={bgColors}>
      <Card
        left={pokemonId}
        right={icons}
        width={'22rem'}
        padding={'1rem'}
        bgColors={bgColors}
        hoverable
      >
        <StyledImage>
          <img src={pokemon.image} width='100%' height={'150px'} />
        </StyledImage>
        <Text fontSize='1.2rem'>{pokemon.name}</Text>
      </Card>
    </Container>
  )
}

export default PokemonCard

const Container = styled.div`
  margin: 2rem;
`

const StyledImage = styled.div`
  padding: 2rem;
`
const Score = styled.span`
  padding-right: 1rem;
  font-size: 1rem;
`
