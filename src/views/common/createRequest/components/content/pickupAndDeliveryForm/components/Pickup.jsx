import React, { useState } from 'react'
import useCreateRequestStore from '../../../../../../../app/stores/others/createRequestStore'
import { create_request_type } from '../../../../../../../app/utility/const'
import { formatDateToApiDate, getStringFromDateObject } from '../../../../../../../app/utility/utilityFunctions'
import ImageUpload from '../../../../../../../components/imageUpload/ImageUpload'
import AddressAutoComplete from '../../../../../../../components/input/AddressAutoComplete'
import CommonDatePicker from '../../../../../../../components/input/CommonDatePicker'
import CommonInput from '../../../../../../../components/input/CommonInput'
import CommonTimePicker from '../../../../../../../components/input/CommonTimePicker'
import CommonSelect from '../../../../../../../components/select/CommonSelect'
import HrDivider from '../../../../../../../components/utility/HrDivider'
import { useTranslation } from 'react-i18next'

export default function Pickup() {
  const { request_type, cr_form, setCrForm, changeCrForm, type_of_transportation } = useCreateRequestStore();
  const [doSearch, setDoSearch] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div className='sub-title'>{t('Pickup Overview')}</div>
      <div className='flex flex-row justify-between w-full space-x-7'>
        <div className='w-full'>
          <CommonInput required={true} name={'title'} value={cr_form?.title} onChange={setCrForm} labelText={t('Title')} />
        </div>
        <div className='w-full mt-[15px]'>
          <CommonSelect required={true} label={t('Transportation Type')} dataArray={type_of_transportation} has_subtitle={false} onChange={(e, value) => {
            // console.log('e, value', e, value);
            changeCrForm('transport_type', value);
          }} value={cr_form?.transport_type} />
        </div>
      </div>


      {/* delivery type and address */}
      <AddressAutoComplete
        required={true}
        label={t('Pickup Address')}
        name={'pickup_address'}
        address={cr_form?.pickup_address}
        latName={'pickup_lat'}
        lngName={'pickup_lng'}
        changeValue={(name, value) => {
          if (name === "pickup_address") {
            changeCrForm('pickup_address', value);
          } else if (name === "pickup_lat") {
            changeCrForm('pickup_lat', value);
          } else if (name === "pickup_lng") {
            changeCrForm('pickup_lng', value);
          }
        }}
        doSearch={doSearch}
        setDoSearch={setDoSearch}
        onFavAddressModalItemClick={(address) => {
          changeCrForm('pickup_address', address?.address);
          changeCrForm('pickup_lat', address?.lat);
          changeCrForm('pickup_lng', address?.lng);
          console.log('address', address);
        }}
      />


      {/* pickup date and time */}
      <div className='flex flex-row justify-between w-full space-x-7 mt-4'>
        <div className='w-full'>
          <CommonDatePicker required={true} allowPastDate={false} label={t('Pickup Date')} name='pickup_date_formatted' value={cr_form?.pickup_date_formatted} onChange={(date) => {
            changeCrForm('pickup_date_formatted', getStringFromDateObject(date));
            changeCrForm('pickup_date', formatDateToApiDate(date));
          }} />
        </div>

        <div className='w-full mt-2'>
          <CommonTimePicker required={true} label={t('Pickup Time')} init_time={cr_form?.pickup_start_time} endTime={cr_form?.pickup_end_time} name='pickup_start_time' onChange={(start_time, end_time) => {
            changeCrForm('pickup_start_time', start_time);
            changeCrForm('pickup_end_time', end_time);
          }} />
        </div>
      </div>

      <div className='-mt-[8px]'><CommonInput labelText={t('Comment (Optional)')} textarea={true} name={'pickup_comment'} value={cr_form?.pickup_comment} onChange={setCrForm} max_input={255} /></div>

      <div className='mt-8'>
        <ImageUpload
          setImage={(value) => { changeCrForm('pickup_attachment', value); }}
          image_url={cr_form?.pickup_attachment_url}
          src={cr_form?.pickup_attachment}
          setSrc={(value) => {
            if (cr_form?.has_old_image && !value) changeCrForm('pickup_attachment', 'remove');
            else changeCrForm('pickup_attachment', value);
            changeCrForm('temp_pickup_attachment', value);
          }}
        />
      </div>

      {request_type === create_request_type.normal && <HrDivider />}
    </>
  )
}
