import { useState } from 'react';

function useRegister() {
    const [showRegister, setShow] = useState(false);
  
    function toggleRegister() {
      setShow(!showRegister);
    }
  
    return {
      showRegister,
      toggleRegister,
    }
  };

export default useRegister