
import React from 'react'
import useCreateRequestStore from '../../../../../../app/stores/others/createRequestStore';
import GenerateTableModal from './components/GenerateTableModal'
import InitialView from './components/InitialView'
import StopsTable from './components/StopsTable/StopsTable';

export default function MassImport() {
  const { is_show_generate_table_modal, setShowGenerateTableModal, stops } = useCreateRequestStore();

  return (
    <div className='text-cMainBlack text-fs24 font-fw500'>

      {stops?.length > 0 ? <StopsTable /> : <InitialView />}

      <GenerateTableModal is_show={is_show_generate_table_modal} setShowModal={setShowGenerateTableModal} />

    </div>
  )
}
