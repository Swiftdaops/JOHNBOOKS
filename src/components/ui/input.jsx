import React from 'react';

export function Input(props) {
  const { className = '', ...rest } = props;
  return <input className={"w-full " + className} {...rest} />;
}

export default Input;
