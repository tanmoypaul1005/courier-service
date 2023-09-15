/* eslint-disable react-hooks/exhaustive-deps */
import { t } from 'i18next';
import React, { useContext, useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { selectedStopValidation } from '../../../../App/CreateRequestStore';
import Search02 from '../../../../Components/Input/Search02';
import { RequestContext } from '../../../../Context/RequestContext';
import { Toastr } from '../../../../Utility/UtilityFunctions';
import StopDetailsModal from '../StopsSection/StopDetailsModal';

export default function MassImportStopList() {

  const { selected_stop_index, stops, ChangeValue, searchStops } = useContext(RequestContext);
  const [show_details_modal, setShowDetailsModal] = useState(false)
  const [details_stop_index, setDetailsStopIndex] = useState(null)
  const [products, setProducts] = useState([]);


  const showDetails = (index) => {
    setDetailsStopIndex(index)
    setShowDetailsModal(true)
  }

  const search = (text, e) => searchStops(text);

  const viewStop = (index) => {
    ChangeValue('selected_stop_index', index)
    showDetails(index)
    setProducts(stops[index].products)
  }

  const onStopClick = (index) => {
    console.log('stop details', stops[index]);
    selectedStopValidation(stops[index], index)
    if (index === selected_stop_index) return;
    ChangeValue('selected_stop_index', index)
    setDetailsStopIndex(index)
    Toastr({ message: 'Stop Data Loaded', type: 'success' })
  }

  useEffect(() => { selectedStopValidation(stops[selected_stop_index], selected_stop_index) }, [selected_stop_index])




  return (
    <div className='bg-white p-2 md:p-4 shadow rounded-xl my-5'>
      <div className="flex justify-between items-center mb-3 pb-3 border-b-2">
        <div className="text-lg font-bold">{stops?.length > 1 ? "Stops" : "Stop"} ({stops?.length ?? 0})</div>
        <Search02 search={search} />
      </div>

      <div className='space-y-3 space-y-reverse flex flex-col-reverse max-h-[65vh] overflow-y-auto'>

        {stops && stops.map((item, index) => (
          <div key={index} onClick={() => { onStopClick(index); viewStop(index); }} className={`flex items-center ${index === selected_stop_index ? 'bg-gray-200' : 'bg-gray-100'}  rounded-md p-3 cursor-pointer `}>
            <div className='flex-1 flex flex-col '>
              <div className='text-md font-bold text-gray-700'>{item.title}</div>
              <div className='text-sm font-bold text-gray-500'>{item.address}</div>
            </div>
            <div onClick={() => viewStop(index)} className='text-sm text-gray-500'>{item.products?.length ?? 0} {t("Products")}</div>
            <IoIosArrowForward onClick={() => viewStop(index)} className='mx-3' />
          </div>
        ))}
      </div>


      {/* Modals:: stop details, products list */}
      <StopDetailsModal index={details_stop_index} show_modal={show_details_modal} setShowModal={setShowDetailsModal} products={products} />

    </div>
  )

}
