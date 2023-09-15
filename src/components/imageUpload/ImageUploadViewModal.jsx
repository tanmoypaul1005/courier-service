import React from 'react';
import useUtilityStore from '../../app/stores/others/utilityStore';
import CommonModal from '../modal/CommonModal';


const ImageUploadViewModal = () => {

    const { showImageUploadViewModal, setShowImageUploadViewModal, setImageUploadView, ImageUploadView } = useUtilityStore();

    return (
        <div>
            <CommonModal
                showModal={showImageUploadViewModal}
                setShowModal={setShowImageUploadViewModal}
                modalTitle=""
                mainContent={
                    <div className='mt-s20'>
                        <img src={ImageUploadView} alt="" className="w-full h-[500px] object-cover" />
                    </div>
                }

            />
        </div>
    );
};

export default ImageUploadViewModal;