/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import useGeneralStore from '../../../../app/stores/others/generalStore';
import useRequestStore, { getRequests, changeRequestSubtitleOne, changeRequestSubtitleTwo, changeRequestItemIcon, changeRequestListPageTitle, changeRequestItemTopRightInfo, changeRequestItemTopRightComponent, goToRequestDetails, defineIsDangerStatus, defineAccentType, checkIsSubtitleOneRed, } from '../../../../app/stores/others/requestStore';
import { k_page_titles, k_request_paths } from '../../../../app/utility/const';
import { changePageTitle } from '../../../../app/utility/utilityFunctions';
import CommonEmptyData from '../../../../components/emptyData/CommonEmptyData';
import CommonListItem from '../../../../components/listItems/CommonListItem';
import RequestListTitle from './components/RequestListTitle';
import TopSectionContent from './components/TopSectionContent';
import InBiddings from '../../../customer/homePage/tables/inBiddings/InBiddings';
import Awarded from '../../../customer/homePage/tables/awarded/Awarded';
import Ongoing from '../../../customer/homePage/tables/onGoing/OnGoing';
import Saved from './saved/Saved';
import History from './history/History';
import Invitation from './invitation/Invitation';
import NotPlanned from './notPlanned/NotPlanned';
import Completed from './completed/Completed';
import { useTranslation } from 'react-i18next';

const RequestList = () => {
  // const { user_role } = useGeneralStore();
  const navigateTo = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { current_requests, setCurrentRequests, setRequestsSearchKey, setRequestsPath, } = useRequestStore();
  const { t } = useTranslation();


  useEffect(() => {
    setRequestsPath(path);
    setCurrentRequests(path);
    // setRequestsSearchKey('');
  }, [path]);

  useEffect(() => {
    // fetchRequests();
    changePageTitle(t(k_page_titles.requests));
  }, []);

  const fetchRequests = async () => {
    await getRequests();
    setCurrentRequests(path);
  }



  return (
    <div className='w-full'>

      {/* old request list. don't delete this */}
      <div className='hidden'>
        <RequestListTitle
          title={changeRequestListPageTitle()}
          onReload={() => {
            getRequests();
            setRequestsSearchKey('');
          }}
          counter={current_requests?.length ?? 0}
          rightSideComponent={
            <TopSectionContent />
          }
        />

        {current_requests?.length > 0 ?
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-8 2xl:gap-8">
            {
              current_requests?.map((item, index) => (
                <CommonListItem
                  key={index}
                  title={item?.title ?? 'NA'}
                  subTitleOne={changeRequestSubtitleOne(item)}
                  subTitleTwo={changeRequestSubtitleTwo(item)}
                  subTitleOneRed={checkIsSubtitleOneRed(item, path)}
                  iconNormal={changeRequestItemIcon()}
                  topRightComponent={changeRequestItemTopRightInfo(item)}
                  topRightComponentType={changeRequestItemTopRightComponent(item)}
                  onClick={() => { goToRequestDetails(item?.id, navigateTo) }}
                  accentType={defineAccentType(item, path)}
                  isDanger={defineIsDangerStatus(item, path)}
                />
              ))
            }
          </div>
          : <CommonEmptyData title={t('Requests Not Available!')} details={t('You have no requests available to show!')} />
        }
      </div>


      {/* new request table */}
      {path === k_request_paths.saved ? <Saved tableTitleClassName={'title'} /> : <></>}
      {path === k_request_paths.invitation ? <Invitation tableTitleClassName={'title'} /> : <></>}
      {path === k_request_paths.in_bidding ? <InBiddings tableTitleClassName={'title'} /> : <></>}
      {path === k_request_paths.not_planned ? <NotPlanned tableTitleClassName={'title'} /> : <></>}
      {path === k_request_paths.awarded ? <Awarded tableTitleClassName={'title'} /> : <></>}
      {path === k_request_paths.ongoing ? <Ongoing tableTitleClassName={'title'} /> : <></>}
      {path === k_request_paths.completed ? <Completed tableTitleClassName={'title'} /> : <></>}
      {path === k_request_paths.history ? <History tableTitleClassName={'title'} /> : <></>}

    </div>
  )
}

export default RequestList


