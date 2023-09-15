/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useCommonHomeStore, { getCommonHomeIndex } from '../../../app/stores/others/commonHomeStore';
import TopHeader from './components/TopHeader';
import useLayoutStore from '../../../app/stores/others/layoutStore';
import AllRequestsTable from './components/AllRequestsTable';


const HomePage = () => {
    const { setSelectedReqType } = useCommonHomeStore();
    const { setShowExpandedSidebarItem } = useLayoutStore();

    useEffect(() => {
        setSelectedReqType(0);
        getCommonHomeIndex();
        setShowExpandedSidebarItem(false);
    }, []);

    return (
        <>
            <TopHeader />
            <AllRequestsTable />
        </>
    );
};

export default HomePage;