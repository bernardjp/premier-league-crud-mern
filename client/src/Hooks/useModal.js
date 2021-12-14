import { useState } from 'react';

const useModal = () => {
  // Maybe refactor to use an useReducer (?)
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  function toggleVisibility() {
    setVisible(!isVisible);
  }

  function toggleLoading(state) {
    setLoading(state);
  }

  return {
    message,
    isVisible,
    isLoading,
    toggleVisibility,
    toggleLoading,
    setMessage
  };
};

export default useModal;
