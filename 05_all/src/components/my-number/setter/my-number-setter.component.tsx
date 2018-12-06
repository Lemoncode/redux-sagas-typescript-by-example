import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
}

export const MyNumberSetterComponent = (props : Props) =>
  <button onClick={props.onRequestNewNumber}>Request new number</button>