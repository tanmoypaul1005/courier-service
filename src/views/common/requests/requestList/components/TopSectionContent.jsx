/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import useRequestStore, { searchRequests } from '../../../../../app/stores/others/requestStore';
import CommonSearchBox from '../../../../../components/input/CommonSearchBox'

export default function TopSectionContent() {
  const {requestsSearchKey, setRequestsSearchKey, setCurrentRequestsFromData} = useRequestStore();
  
  useEffect(() => {
    let result = searchRequests(requestsSearchKey);
    setCurrentRequestsFromData(result);
    // console.log('result', result);
  }, [requestsSearchKey])

  return (
    <>
      <CommonSearchBox value={requestsSearchKey} onChange={(e) => setRequestsSearchKey(e.target.value)} />
    </>
  )
}
