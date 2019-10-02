import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
}

export const NumberSetterComponent: React.FunctionComponent<Props> = props => (
  <button onClick={props.onRequestNewNumber}>Request new number</button>
);
