import React, { useEffect } from 'react'
import LoadingModal from '../../../components/modal/LoadingModal'
import useGeneralStore from '../../../app/stores/others/generalStore';
import { useParams } from 'react-router-dom';
import { expressLogin } from '../../../app/stores/others/authStore';

const ExpressLogin = () => {
    const { user_id, express_token } = useParams();

    const { setLoading } = useGeneralStore();

    const handleExpressLogin = async () => {
        let expressLoginSuccess = await expressLogin({
            "user_id": user_id,
            "token": express_token
        });

        if (expressLoginSuccess) {
            window.open('/', '_self');
            // setLoading(false);
            // console.log('ExpressLogin: ', expressLoginSuccess);
        }
    }

    useEffect(() => {
        setLoading(true);
        handleExpressLogin();

    }, [])
    return (
        <div>
            {/* Express ID: {user_id} */}
            <br />
            {/* Express Token: {express_token} */}
            <LoadingModal />
        </div>
    )
}

export default ExpressLogin