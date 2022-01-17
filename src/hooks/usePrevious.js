import { useRef, useEffect } from 'react';

function usePrevious(value) {
    console.log('Test: ', value);
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default usePrevious;
