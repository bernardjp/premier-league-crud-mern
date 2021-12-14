import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../RequestHandler/LoadingSpinner';

const ModalContainer = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
  align-items: center;
  background-color: ${props => props.theme.colors.tertiary};
  border: 1px solid white;
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 2rem;
  max-width: 300px;
`;

const ModalTextSpan = styled.span`
  text-align: center;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  width: 60%;
`;

const ModalButton = styled.button`
  height: 2rem;
  min-width: 5rem;
  border-radius: 1rem;
  margin: 0 1rem;
  border: 1px solid white;
  background-color: ${props => (props.submit ? 'white' : 'transparent')};
  color: ${props => (props.submit ? props.theme.colors.tertiary : 'white')};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px white;
  }
`;

Modal.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  modalState: PropTypes.shape({
    message: PropTypes.string,
    isVisible: PropTypes.bool,
    isLoading: PropTypes.bool,
    toggleVisibility: PropTypes.func,
    setMessage: PropTypes.func
  }).isRequired
};

function Modal({ onSubmitHandler, modalState }) {
  const {
    message,
    isVisible,
    isLoading,
    toggleVisibility,
    setMessage
  } = modalState;
  const history = useHistory();

  const refreshPage = useCallback(destinationURL => {
    // Forces to load a different page and back to the original one
    // to trigger a "reload" (and fetching the updated data from the server)
    // without the inconveniance of reloading the whole page. Smoothes out the UX.
    history.push('/reload', null);
    history.push(`${destinationURL}`, null);
  }, [history]);

  const onResetHandler = useCallback(() => {
    setMessage(null);
    toggleVisibility();
  });

  return (
    isVisible
      ? (
        <ModalContainer>
          <ModalContent>
            { isLoading
              ? <LoadingSpinner />
              : (
                <>
                  <ModalTextSpan>
                    { message || (
                      <>
                        <p style={{ margin: '0' }}>Are you sure you want to delete this resource?</p>
                        <p style={{ margin: '0' }}>This action can not be reverted.</p>
                      </>
                    )}
                  </ModalTextSpan>
                  <ModalButtonContainer>
                    { message
                      ? (
                        <ModalButton onClick={() => {
                          onResetHandler();
                          refreshPage('/resources');
                        }}
                        >
                          BACK TO LIST
                        </ModalButton>
                      )
                      : (
                        <>
                          <ModalButton onClick={() => onResetHandler()}>
                            NO
                          </ModalButton>
                          <ModalButton submit={true} onClick={() => onSubmitHandler()}>
                            YES
                          </ModalButton>
                        </>
                      )}
                  </ModalButtonContainer>
                </>
              )}
          </ModalContent>
        </ModalContainer>
      )
      : null
  );
}

export default Modal;
