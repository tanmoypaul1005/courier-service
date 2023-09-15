/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useCommonHomeStore, { getCommonHomeIndex } from '../../../app/stores/others/commonHomeStore.js';
import TopHeader from './components/TopHeader.jsx';
import useLayoutStore from '../../../app/stores/others/layoutStore.js';
import InBiddings from './tables/inBiddings/InBiddings.jsx';
import { k_home_card_types } from '../../../app/utility/const.js';
import Awarded from './tables/awarded/Awarded.jsx';
import Ongoing from './tables/onGoing/OnGoing.jsx';

const HomePage = () => {
    const { setSelectedReqType, selectedCard } = useCommonHomeStore();
    const { setShowExpandedSidebarItem } = useLayoutStore();

    useEffect(() => {
        setSelectedReqType(0);
        setShowExpandedSidebarItem(false);
        getCommonHomeIndex();
    }, []);

    return (
        <div>
            <TopHeader />

            {/* <ReqListArea /> */}

            {selectedCard === k_home_card_types.in_bidding ? <InBiddings /> : <></>}
            {selectedCard === k_home_card_types.awarded ? <Awarded /> : <></>}
            {selectedCard === k_home_card_types.ongoing ? <Ongoing /> : <></>}

        </div>
    );
};

export default HomePage;