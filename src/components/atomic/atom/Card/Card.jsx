import styled from 'styled-components';
import { Card as CardAntd } from 'antd';

const StyledCard = styled(CardAntd)`
  width: ${(props) => props?.width || '20rem'};
  padding: ${(props) => props?.padding || '1rem'};
  background: ${(props) =>
    `linear-gradient(${props?.bgColors?.[0]}, ${props?.bgColors?.[1]})`};

  .ant-card-body {
    padding: 0;
  }

  border-radius: ${(props) => props?.borderRadius};
  max-width: ${(props) => props?.maxWidth || '60rem'};
`;

const Card = ({ left, right, children, width, ...props }) => {
  const header = <Header left={left} right={right} />;

  return (
    <StyledCard width={width} {...props}>
      {header && header}
      {children}
    </StyledCard>
  );
};

const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = ({ left, right, children }) => {
  return (
    <>
      <StyledHeaderContainer>
        {left && <div>{left}</div>}
        {right && <div>{right}</div>}
      </StyledHeaderContainer>
      {children}
    </>
  );
};

Card.Header = Header;

export default Card;
