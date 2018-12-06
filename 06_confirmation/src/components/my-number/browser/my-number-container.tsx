import {connect} from 'react-redux';
import {State} from '../../../reducers';
import {MyNumberBrowserComponent} from './my-number.component';

const mapStateToProps = (state : State) => ({
    myNumberCollection: state.myNumberCollectionState
});

const mapDispatchToProps = (dispatch) => ({
});

export const MyNumberBrowserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyNumberBrowserComponent);
