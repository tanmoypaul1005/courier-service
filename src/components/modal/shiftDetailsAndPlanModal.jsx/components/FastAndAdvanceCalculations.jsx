/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import useRequestStore, { getAdvanceCalculationData, getFastCalculationData } from '../../../../app/stores/others/requestStore'
import { calculateDistance, calculateTime } from '../../../../app/utility/utilityFunctions';
import { useTranslation } from 'react-i18next';

export default function FastAndAdvanceCalculations({ shift_id, p_request_id }) {
  const { is_fast_calculation, setIsFastCalculation, fastCalculationData, advanceCalculationData } = useRequestStore();
  const params = useParams();
  let { request_id } = params;
  request_id = request_id ?? p_request_id;
  const { t } = useTranslation();


  useEffect(() => {
    setIsFastCalculation(true);
    getFastCalculationData(request_id);
  }, [])


  return (
    <div className='flex-col items-start justify-start w-full space-y-7'>

      <div className='flex flex-row items-start justify-between w-full space-x-3'>
        <CalculationButton label={t('Fast Calculation')} selected={is_fast_calculation} onClick={() => {
          setIsFastCalculation(true);
          getFastCalculationData(request_id);
        }} />
        <CalculationButton label={t('Advance Calculation')} selected={is_fast_calculation ? false : true} onClick={() => {
          setIsFastCalculation(false);
          getAdvanceCalculationData(request_id, shift_id);
        }} />
      </div>

      <div className='flex flex-row justify-between space-x-3'>

        <div className='flex flex-col justify-start space-y-2 text-fs14 font-fw400 text-cGrey'>
          <div>{t('Distance')}</div>
          <div className='title'>
            {is_fast_calculation ? <> {calculateDistance(fastCalculationData?.distance)?.distance?.toLocaleString("da-DK")} {t(calculateDistance(fastCalculationData?.distance)?.unit?.toLocaleString("da-DK")) ?? 'NA'} </>
              : <> {calculateDistance(advanceCalculationData?.distance)?.distance?.toLocaleString("da-DK")} {t(calculateDistance(advanceCalculationData?.distance)?.unit?.toLocaleString("da-DK")) ?? 'NA'} </>}
          </div>
        </div>

        <div className='flex flex-col items-end justify-start space-y-2 text-fs14 font-fw400 text-cGrey'>
          <div>{t('Duration')}</div>
          <div className='title'>
            {is_fast_calculation ? <>
              {calculateTime(fastCalculationData?.time)}
            </>
              :
              <>
                {calculateTime(advanceCalculationData?.duration)}
              </>}
          </div>
        </div>

      </div>

    </div>
  )
}

const CalculationButton = ({ label, onClick, selected = false }) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={onClick}
      className={`cp h-s44 w-auto px-2 py-2 text-s16 font-fw500 text-center rounded border hover:text-cMainBlack hover:border-cMainBlack ${selected ? 'border-cMainBlue text-cMainBlue' : 'text-cMainBlack border-cTextButtonHover'}`}>
      {t(label)}
    </div>
  )
}
