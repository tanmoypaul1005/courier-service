import React, { useEffect, useState } from 'react';

const LicenseType = ({ colorType, text }) => {

    const [colorCode, setColorCode] = useState("bg-cPlaceholder");

    useEffect(() => {
        switch (colorType) {
            case 'default':
                setColorCode('#D3E5FF');
                break;
            case 'danger':
                setColorCode('#FF6368');
                break;

            default:
                setColorCode('#D3E5FF');
                break;
        }
    }, [colorType])
    return (
        <div>

        </div>
    );
};

export default LicenseType;