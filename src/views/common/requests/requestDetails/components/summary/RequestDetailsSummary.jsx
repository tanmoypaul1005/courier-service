import React from 'react'
import { useParams } from 'react-router-dom';
import useGeneralStore from '../../../../../../app/stores/others/generalStore';
import useRequestStore, { generateSummaryContent, generateSummaryContent2, generateSummaryContent3, generateSummaryContent4 } from '../../../../../../app/stores/others/requestStore'
import { user_role as role } from '../../../../../../app/utility/const';
import Summary from '../../../../../../components/utility/summary/Summary'
import AcknowledgeActionInfo from './components/AcknowledgeActionInfo';
import AcknowledgeDetails from './components/AcknowledgeDetails';
// import AwardedRequestDeleteOrCancelOverview from './components/AwardedRequestDeleteOrCancelOverview';
import BiddingCompanies from './components/BiddingCompanies';
import PlaceBid from './components/PlaceBid';
import ProposalInfo from './components/ProposalInfo';
import ShiftDetails from './components/ShiftDetails';

export default function RequestDetailsSummary() {
  const { request_details } = useRequestStore();
  const params = useParams();
  const { request_id, type } = params;
  const { user_role } = useGeneralStore();


  const content = generateSummaryContent(request_details, type);
  const content2 = generateSummaryContent2(request_details, type);
  const content3 = generateSummaryContent3(request_details, type);
  const content4 = generateSummaryContent4(request_details, type);

  return (
    <div className='w-[355px] absolute right-0 top-s153 mr-10'>
      <Summary content={content} content2={content2} content3={content3} content4={content4} />

      {(type === 'invitation' && user_role === role.company) && <PlaceBid />}

      {((type === 'in-bidding') && user_role === role.company) && <ProposalInfo type={type} />}

      {(type === 'in-bidding' && user_role === role.customer) && <BiddingCompanies />}

      {/* {((type === 'awarded' || type === 'planned' || type === 'not-planned') && request_details?.awarded?.status !== 'init') && <AwardedRequestDeleteOrCancelOverview />} */}

      {((type === 'awarded') && user_role === role.company) && <ShiftDetails request_id={request_id} />}

      {/* {((type === 'awarded') && user_role === role.company) && <ProposalInfo type={type} />} */}

      {(type === 'completed' && user_role === role.company) && <AcknowledgeActionInfo />}

      {(type === 'history') && <AcknowledgeDetails />}

    </div>
  )
}
