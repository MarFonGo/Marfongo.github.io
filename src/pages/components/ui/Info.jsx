import React from 'react';
import { useSelector} from 'react-redux';

const Info = () => {
    const item = useSelector(state => state.first);
    const info = item.info;
        return (
        <div id="tab-slide-1" itemProp="description"  className="slide active">
            <p style={{fontSize: '20px', padding: '10px'}}>{info}</p>
        </div>
        );
};
 export default Info;