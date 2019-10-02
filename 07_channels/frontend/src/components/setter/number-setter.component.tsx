import * as React from 'react';

interface Props {
  onRequestNewNumber: () => void;
  onUserConfirmNewNumberRequest: (result: boolean) => void;
}

export const NumberSetterComponent: React.FunctionComponent<Props> = props => {
  const { onRequestNewNumber, onUserConfirmNewNumberRequest } = props;
  const [showModal, setShowModal] = React.useState(false);

  const handleRequest = () => {
    setShowModal(true);
    onRequestNewNumber();
  };
  
  const handleConfirm = value => {
    setShowModal(false);
    onUserConfirmNewNumberRequest(value);
  };

  return (
    <>
      <button onClick={handleRequest}>Request new number</button>
      {showModal && (
        <div style={{ background: '#ADD8E6' }}>
          <span>Are you sure you want to get a new number?</span>
          <button onClick={() => handleConfirm(true)}>Yes</button>
          <button onClick={() => handleConfirm(false)}>No</button>
        </div>
      )}
    </>
  );
};
