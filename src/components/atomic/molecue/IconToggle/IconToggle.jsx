import { useState } from 'react';
import styled from 'styled-components';

import { Icon } from '@atomic';

const StyedIcon = styled(Icon)`
  margin: ${(props) => props.margin};

  svg {
    fill: ${(props) => (props.active ? '#da7589' : 'currentColor')};
  }
`;

const IconToggle = ({
  name,
  margin,
  onClick,
  isColorChange = true,
  active,
  ...props
}) => {
  // const [active, setAction] = useState(activeVote || false);

  const handleOnIconClick = () => {
    // isColorChange && setAction(!active);
    onClick?.();
  };

  return (
    <StyedIcon
      name={name}
      active={active || false}
      margin={margin}
      onClick={handleOnIconClick}
      {...props}
    />
  );
};

export default IconToggle;
