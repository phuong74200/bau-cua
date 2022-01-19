/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';

function useDetectClickOutside(ref, handleCloseHistoryDropBar) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleCloseHistoryDropBar();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}

export default useDetectClickOutside;
