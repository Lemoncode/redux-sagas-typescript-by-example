import {connect} from 'react-redux';
import {State} from '../../reducers';
import {BidsTableComponent} from './bids-table.component';
import {startSocketSubscriptionAction, stopSocketSubscriptionAction} from '../../actions';

const mapStateToProps = (state : State) => ({
})

const mapDispatchToProps = (dispatch) => ({
  connectBidsSockets: () => dispatch(startSocketSubscriptionAction()),
  disconnectBidsSockets: () => dispatch(stopSocketSubscriptionAction()),
})

export const BidsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BidsTableComponent);