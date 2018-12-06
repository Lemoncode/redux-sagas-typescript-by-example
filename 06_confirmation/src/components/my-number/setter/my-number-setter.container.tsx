import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {MyNumberSetterComponent} from './my-number-setter.component';
import {numberRequestStartAction, numberRequestUserConfirmationAction} from '../../../actions';

const mapStateToProps = (state : State) => ({  
})

const mapDispatchToProps = (dispatch) => ({
  onRequestNewNumber: () => dispatch(numberRequestStartAction()),
  onUserConfirmNewNumberRequest: (result : boolean) => dispatch(numberRequestUserConfirmationAction(result)),  
})

export const MyNumberSetterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNumberSetterComponent);