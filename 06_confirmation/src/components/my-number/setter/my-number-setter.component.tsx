import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
  onUserConfirmNewNumberRequest: (result: boolean) => void;
}

interface State {
  showModalConfirmation: boolean;
}


export class MyNumberSetterComponent extends React.PureComponent<Props, State> {
  state : State = {showModalConfirmation: false};

  onConfirmationOptionClicked = (result: boolean) => (e) => {
    this.props.onUserConfirmNewNumberRequest(result);
    this.setState({ showModalConfirmation: false });
  }

  onRequestNewNumberWithConfirmation = () => {
    this.setState({ showModalConfirmation: true })
    this.props.onRequestNewNumber();
  }


  render() {
    const { onRequestNewNumber, onUserConfirmNewNumberRequest } = this.props;

    const setModalDialogStyle = () : React.CSSProperties => ({
      background: '#ADD8E6',
      display: (this.state.showModalConfirmation) ? 'inline' : 'none'
    });

    return (
      <>
        <button onClick={this.onRequestNewNumberWithConfirmation}>Request new number</button>
        <div style={setModalDialogStyle()}>
          <span>Are you sure you want to get a new number?</span>
          <button onClick={this.onConfirmationOptionClicked(true)}>Yes</button>
          <button onClick={this.onConfirmationOptionClicked(false)}>No</button>
        </div>

      </>
    )
  }
}
