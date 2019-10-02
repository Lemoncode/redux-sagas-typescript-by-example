import { connect } from 'react-redux';
import {
  numberRequestStartAction,
  numberRequestUserConfirmationAction,
} from '../../actions';
import { NumberSetterComponent } from './number-setter.component';

const mapDispatchToProps = dispatch => ({
  onRequestNewNumber: () => dispatch(numberRequestStartAction()),
  onUserConfirmNewNumberRequest: result =>
    dispatch(numberRequestUserConfirmationAction(result)),
});

export const NumberSetterContainer = connect(
  null,
  mapDispatchToProps
)(NumberSetterComponent);
