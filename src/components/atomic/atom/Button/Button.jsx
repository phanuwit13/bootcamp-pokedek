import styled from 'styled-components';
import { Button as ButtonAntd } from 'antd';

const StyledButton = styled(ButtonAntd)`
  width: ${(props) => props.width};
`;

const Button = ({ width, ...props }) => {
  return <StyledButton width={width} {...props} />;
};

export default Button;
