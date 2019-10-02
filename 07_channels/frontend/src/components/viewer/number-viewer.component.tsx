import * as React from 'react';

interface Props {
  numberCollection: number[];
}

export const NumberViewerComponent: React.FunctionComponent<Props> = props => (
  <>
    <h5>Generated numbers collection:</h5>
    <ul>
      {props.numberCollection.map(currentNumber => (
        <li key={currentNumber}>{currentNumber}</li>
      ))}
    </ul>
  </>
);
