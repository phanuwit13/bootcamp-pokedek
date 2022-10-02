import styled from 'styled-components';
import { Dropdown as DropdownAntd, Space } from 'antd';

import { Button, Icon } from '@atomic';

const StyleSpace = styled(Space)`
  display: flex;
  justify-content: space-between;
`;

const Dropdown = ({ title = 'select', menu }) => {
  return (
    <DropdownAntd overlay={menu}>
      <Button width="100%">
        <StyleSpace>
          {title}
          <Icon name={'arrowDown'} />
        </StyleSpace>
      </Button>
    </DropdownAntd>
  );
};

export default Dropdown;
