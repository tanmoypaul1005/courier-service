import React from 'react';
import useCreateRequestStore from '../../app/stores/others/createRequestStore';
import CommonModal from '../modal/CommonModal';
import CommonEmptyData from '../emptyData/CommonEmptyData';

const FavAddressModal = ({ showModal, setShowModal, onClick }) => {

    const { favorite_addresses } = useCreateRequestStore();

    return (
        <CommonModal
            showModal={showModal}
            setShowModal={setShowModal}
            modalTitle={"Favorite Addresses"}
            mainContent={
                <>
                    <div className='h-auto max-h-[70vh] overflow-y-auto'>
                        {
                            favorite_addresses?.length > 0 ? favorite_addresses?.map((item, index) => (
                                <div onClick={() => {
                                    onClick(item);
                                    setShowModal(false);
                                }} className='p-2 text-cMainBlack font-fw500 text-fs16 cp bg-cCommonListBG rounded my-2' key={index}>{item?.title}</div>
                            ))
                                :
                                <CommonEmptyData title='No Address Available!' />
                        }
                    </div>
                </>
            }
        />
    )
}

export default FavAddressModal