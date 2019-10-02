import { connect } from 'react-redux';
import {
  numberRequestStartAction,
  cancelOnGoingNumberRequestAction,
} from '../../actions';
import { NumberSetterComponent } from './number-setter.component';

const mapDispatchToProps = dispatch => ({
  onRequestNewNumber: () => dispatch(numberRequestStartAction()),
  onCancelRequest: () => dispatch(cancelOnGoingNumberRequestAction()),
});

export const NumberSetterContainer = connect(
  null,
  mapDispatchToProps
)(NumberSetterComponent);
