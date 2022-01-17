import propTypes from 'prop-types';

import Loader from './Loader';
import { Overlay } from './Overlay';

const Loading = (props) => {
    return props.isLoading ? (
        <Overlay>
            <Loader />
        </Overlay>
    ) : null;
};
export { Loading };
