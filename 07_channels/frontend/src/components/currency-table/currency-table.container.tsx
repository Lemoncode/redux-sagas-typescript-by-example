import { connect } from 'react-redux';
import { CurrencyTableComponent } from './currency-table.component';
import {
  startSocketSubscriptionAction,
  stopSocketSubscriptionAction,
} from '../../actions';
import { State } from '../../reducers';

const mapStateToProps = (state: State) => ({
  currencyCollection: state.currenciesState,
});

const mapDispatchToProps = dispatch => ({
  connectCurrencyUpdateSockets: () => dispatch(startSocketSubscriptionAction()),
  disconnectCurrencyUpdateSockets: () =>
    dispatch(stopSocketSubscriptionAction()),
});

export const CurrencyTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyTableComponent);
