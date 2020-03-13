import React from 'react';

const Button = (props) => (
  <button
    type="button"
    onClick={props.onClick}
    >
    {props.label}
    </button>);

export default Button;
