import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
  onCancelRequest: () => void;
}

export const NumberSetterComponent: React.FunctionComponent<Props> = props => (
  <>
    <button onClick={props.onRequestNewNumber}>Request new number</button>
    <button onClick={props.onCancelRequest}>Cancel number request</button>
  </>
);
