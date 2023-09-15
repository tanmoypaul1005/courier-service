import React from 'react'
import useAuthStore from '../../../../app/stores/others/authStore';
import MuiModal from '../../../../components/modal/MuiModal';
import Countdown from 'react-countdown';

const ExpressLogoutModal = () => {
    const { showExpressLogoutModal, setShowExpressLogoutModal } = useAuthStore();
    let timerTimeOut = 10000;
    const renderer = ({ seconds, completed }) => {
        if (completed) {
            console.log('Timer completed');

            return window.close()
        } else {
            //console.log('Timer remaining: ', seconds);
            return <div className="">{seconds < 10 ? `0${seconds}` : seconds}</div>;
        }
    };
    return (
        <div>
            <MuiModal
                has_close={false}
                open={showExpressLogoutModal}
                setOpen={setShowExpressLogoutModal}
                title="Session Time Ended"
                subtitle={
                    <div
                        onClick={(e) => e.preventDefault()}
                        className='flex items-center justify-center w-full space-x-2'>
                        <div>You will be logged out from this window within </div>
                        <Countdown
                            date={Date.now() + timerTimeOut}
                            renderer={renderer}
                        />
                        <div>seconds!</div>
                    </div>
                }
            />
        </div>
    )
}

export default ExpressLogoutModal