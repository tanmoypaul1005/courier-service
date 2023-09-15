import React, { useEffect } from 'react';
import useFavoriteAddressStore, { getFavoriteAddress, selectFavoriteAddress } from '../../../app/stores/others/favoriteAddressStore';
import { iLocationNormal, iLocationSelected } from '../../../app/utility/imageImports';
import CommonEmptyData from '../../../components/emptyData/CommonEmptyData';
import CommonListItem from '../../../components/listItems/CommonListItem';
import FavoriteAddressDetails from './FavoriteAddressDetails';

const FavoriteAddressList = () => {

    const { favoriteAddressList, selectedFavoriteAddressIndex, setShowAddFavoriteAddressModal } = useFavoriteAddressStore();

    useEffect(() => {
        fetchFavoriteAddress()
    }, [])

    const fetchFavoriteAddress = async () => {
        await getFavoriteAddress();
    }

    return (
        <div>
            {favoriteAddressList?.length > 0 ? <div className="mt-s20 grid grid-cols-12 gap-2 md:gap-7 2xl:gap-7">
                <div className="col-span-12 order-last lg:col-span-4 lg:order-first mt-s20 lg:mt-0">
                    <div className="flex-col">
                        {favoriteAddressList?.map((item, index) => (
                            <div key={index} className='mb-s20'>
                                <CommonListItem
                                    onClick={async () => {
                                        await selectFavoriteAddress(item, index)
                                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                    }}
                                    key={index}
                                    title={item?.title ? item?.title : ''}
                                    subTitleOne={item?.address ? item?.address : ''}
                                    subTitleTwo={item?.note ? item?.note : ''}
                                    selected={selectedFavoriteAddressIndex === index}
                                    iconSelected={iLocationSelected} iconNormal={iLocationNormal}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-8">
                    {/* Favorite Address Details */}
                    <FavoriteAddressDetails />

                </div>
            </div> : <CommonEmptyData
                title='No Favorite Address Found !'
                button={false}
                onClick={() => setShowAddFavoriteAddressModal(true)}
                details='There is no Favorite Address available now.'
                btnLabel="Add Favorite Address"
            />}
        </div>
    );
};

export default FavoriteAddressList;