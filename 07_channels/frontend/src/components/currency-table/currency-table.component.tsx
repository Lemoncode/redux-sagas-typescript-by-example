import * as React from 'react';
import { CurrencyUpdate } from '../../model';

interface Props {
  connectCurrencyUpdateSockets: () => void;
  disconnectCurrencyUpdateSockets: () => void;
  currencyCollection: CurrencyUpdate[];
}

export const CurrencyTableComponent: React.FunctionComponent<Props> = props => {
  const {
    connectCurrencyUpdateSockets,
    disconnectCurrencyUpdateSockets,
    currencyCollection
  } = props;

  React.useEffect(() => {
    connectCurrencyUpdateSockets();
    return () => {
      disconnectCurrencyUpdateSockets();
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>Change</th>
        </tr>
      </thead>
      <tbody>
        {currencyCollection.map(currency => (
          <tr key={currency.id}>
            <td>{currency.currency}</td>
            <td>{currency.change}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
