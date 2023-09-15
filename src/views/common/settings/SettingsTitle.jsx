import React from 'react';

const SettingsTitle = ({ title = "" }) => {
    return (
        <div className='text-fs28 text-cMainBlack limadi-regular mb-s16'>{title}</div>
    );
};

export default SettingsTitle;