import React from 'react';

import Button from 'react-bootstrap/Button';

const AppButton = (props) => (
  <Button
    variant="dark"
    onClick={props.onClick}
    >
    {props.label}
    </Button>);

export default AppButton;
