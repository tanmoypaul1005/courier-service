/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRequestDetails } from '../../../../app/stores/others/requestStore'
import { k_page_titles } from '../../../../app/utility/const'
import { changePageTitle } from '../../../../app/utility/utilityFunctions'
import MainContents from './components/mainContents/MainContents'
import RequestDetailsTopBar from './components/requestDetailsTopBar/RequestDetailsTopBar'
import RequestDetailsSummary from './components/summary/RequestDetailsSummary'
import useLayoutStore from '../../../../app/stores/others/layoutStore'
import { useTranslation } from 'react-i18next'

const RequestDetailsSection = () => {
    const params = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        const { type, request_id } = params;
        getRequestDetails(type, request_id);
        window.scrollTo(0, 0);
        changePageTitle(t(k_page_titles.request_details));
        useLayoutStore.getState().setShowExpandedSidebarItem(true);
    }, [])

    return (
        <div>
            <RequestDetailsTopBar />

            <RequestDetailsSummary />

            <MainContents />
        </div>
    )
}

export default RequestDetailsSection