import * as React from 'react';
import { CurrencyUpdate } from '../../model';

interface Props {
  connectCurrencyUpdateSockets: () => void;
  disconnectCurrencyUpdateSockets: () => void;
  currencyCollection: CurrencyUpdate[];
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
      <table>
        <tr>
          <th>
            Currency
          </th>
          <th>
            Change
          </th>
        </tr>
        {this.props.currencyCollection.map(
          currency =>
            <tr key={currency.id}>
              <td>{currency.currency}</td>
              <td>{currency.change}</td>
            </tr>
        )
        }
      </table>
    )
  }
}