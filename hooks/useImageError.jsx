import { useState, useEffect } from 'react';

const useImageError = () => {
  const [el, setEl] = useState(null);
  const [error, setError] = useState(false);
  const [load, setLoad] = useState(false);

  const handleError = () => {
    setError(true);
  };
  const handerLoad = () => {
    setLoad(true);
  };
  const retry = () => {
    setError(false);
  };

  useEffect(() => {
    el?.addEventListener('error', handleError);
    el?.addEventListener('load', handerLoad);

    return () => {
      el?.removeEventListener('error', handleError);
      el?.removeEventListener('load', handleError);
    };
  }, [el]);

  return [setEl, load, error, retry, el];
};

export { useImageError };
