import React from 'react';
import useGeneralStore from '../../../../app/stores/others/generalStore';
import CompanyProfile from './company/CompanyProfile';
import CustomerProfile from './customer/CustomerProfile';

const Profile = () => {

    const { user_role } = useGeneralStore();

    const role = user_role === 'private' ? 'customer' : 'company';

    return (
        <div>
            {role === 'customer' && <CustomerProfile />}
            {role === 'company' && <CompanyProfile />}
        </div>
    );
};

export default Profile;