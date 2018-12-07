import * as React from 'react';

interface Props {
  connectBidsSockets : () => void;
  disconnectBidsSockets : () => void;
}

export class BidsTableComponent extends React.PureComponent<Props> {
  componentWillMount() {
    this.props.connectBidsSockets();  
  }

  componentWillUnmount() {
    this.props.disconnectBidsSockets();  
  }

  render() {
    return (
      <h3>Bids Table component</h3>
    )
  }
}