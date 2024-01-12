import React from 'react';
import { useSelector} from 'react-redux';

const Info = () => {
    const item = useSelector(state => state.first);
    const info = item.info;
        return (
        <div id="tab-slide-1" itemProp="description"  className="slide active">
            {info}
        </div>
        );
};
 export default Info;