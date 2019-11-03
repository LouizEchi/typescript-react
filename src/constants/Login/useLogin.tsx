import { useState } from 'react';

function useLogin() {
    const [showLogin, setShow] = useState(false);

    function toggleLogin() {
      setShow(!showLogin);
    }

    return {
      showLogin,
      toggleLogin,
    }
  };

export default useLogin