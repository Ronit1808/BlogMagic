import { useEffect } from 'react';

const useOutsideClick = (ref, callback, excludeRefs = []) => {
  useEffect(() => {
    const handleClick = (event) => {
      const isExcluded = excludeRefs.some((excludeRef) =>
        excludeRef.current?.contains(event.target)
      );

      if (ref.current && !ref.current.contains(event.target) && !isExcluded) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback, excludeRefs]);
};

export default useOutsideClick;
