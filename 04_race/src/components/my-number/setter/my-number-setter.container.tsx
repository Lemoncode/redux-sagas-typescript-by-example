import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {MyNumberSetterComponent} from './my-number-setter.component';
import {numberRequestStartAction, cancelOnGoingNumberRequestAction} from '../../../actions';

const mapStateToProps = (state : State) => ({
})

const mapDispatchToProps = (dispatch) => ({
  onRequestNewNumber: () => dispatch(numberRequestStartAction()),
  onCancelRequest: () => dispatch(cancelOnGoingNumberRequestAction()),
})

export const MyNumberSetterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNumberSetterComponent);