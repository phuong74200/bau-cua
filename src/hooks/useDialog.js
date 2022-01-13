import { useState } from 'react';

export const useDialog = (initialState = false) => {
    const [isShowing, setIsShowing] = useState(initialState);

    function toggle() {
        setIsShowing(!isShowing);
    }

    function openDialog() {
        setIsShowing(true);
    }

    function closeDialog() {
        setIsShowing(false);
    }

    return [isShowing, toggle, openDialog, closeDialog];
};
export default useDialog;
