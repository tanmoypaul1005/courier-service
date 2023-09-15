/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import useCreateRequestStore, { addStop } from '../../../../../../../app/stores/others/createRequestStore';
import CommonButton from '../../../../../../../components/button/CommonButton';
import CommonInput from '../../../../../../../components/input/CommonInput';
import CommonModal from '../../../../../../../components/modal/CommonModal';
import { useTranslation } from 'react-i18next';

const GenerateTableModal = ({ is_show, setShowModal }) => {
  const [num_of_stops, setNumOfStops] = useState('');
  const { setStops, stops } = useCreateRequestStore();
  const { t } = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < num_of_stops; i++) addStop();
    setShowModal(false);
    setNumOfStops('');
  }
  return (
    <CommonModal
      showModal={is_show}
      setShowModal={setShowModal}
      modalTitle={t("Generate Table")}
      mainContent={
        <>
          <form onSubmit={onSubmit}>
            <CommonInput
              onChange={(e) => setNumOfStops(e.target.value)}
              type="number"
              name="num_of_stops"
              value={num_of_stops}
              labelText={t("Number of Stops")}
              show_asterisk={false}
              min={1}
              max={100}
              required={true}

            />

            <div className="flex flex-row justify-center mt-5">

              <CommonButton
                btnLabel={t("Generate")}
                onClick={() => { }}
                type="submit"
              />
            </div>
          </form>
        </>
      }
    />
  )
}


export default GenerateTableModal