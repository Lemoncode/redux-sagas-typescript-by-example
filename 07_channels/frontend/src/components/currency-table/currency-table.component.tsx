import * as React from 'react';

interface Props {
  connectCurrencyUpdateSockets : () => void;
  disconnectCurrencyUpdateSockets : () => void;
}

export class CurrencyTableComponent extends React.PureComponent<Props> {
  componentWillMount() {
    this.props.connectCurrencyUpdateSockets();  
  }

  componentWillUnmount() {
    this.props.disconnectCurrencyUpdateSockets();  
  }

  render() {
    return (
      <h3>Bids Table component</h3>
    )
  }
}