import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {MyNumberBrowserComponent} from './my-number.component';

const mapStateToProps = (state : State) => {
  return {
    myNumberCollection: state.myNumberCollectionState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export const MyNumberBrowserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNumberBrowserComponent);
