import {connect} from 'react-redux';
import {State} from '../../reducers';
import {CurrencyTableComponent} from './currency-table.component';
import {startSocketSubscriptionAction, stopSocketSubscriptionAction} from '../../actions';

const mapStateToProps = (state : State) => ({
  currencyCollection: state.currenciesState,
})

const mapDispatchToProps = (dispatch) => ({
  connectCurrencyUpdateSockets: () => dispatch(startSocketSubscriptionAction()),
  disconnectCurrencyUpdateSockets: () => dispatch(stopSocketSubscriptionAction()),
})

export const CurrencyTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyTableComponent);