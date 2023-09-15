import { useTranslation } from "react-i18next";
import useCreateRequestStore from "../../../../../../../../../app/stores/others/createRequestStore";
import CommonButton from "../../../../../../../../../components/button/CommonButton";
import CommonModal from "../../../../../../../../../components/modal/CommonModal";

export default function RemoveAllStopConfirmationModal({ is_show, setShow }) {
  const { removeAllStops, setIsEveryThingValid } = useCreateRequestStore();
  const { t } = useTranslation();
  return (
    <CommonModal
      showModal={is_show}
      setShowModal={setShow}
      modalTitle={t("Remove All Stops")}
      mainContent={
        <>
          <div className='mt-s20 '>{t('Do you want to remove all stops?')}</div>
          <div className="flex flex-row justify-end mt-5">
            <CommonButton
              btnLabel={t("Confirm")}
              onClick={() => { removeAllStops(); setShow(false); setIsEveryThingValid(false); }}
              btn_type="button"
              colorType="danger"
            />

          </div>
        </>
      }
    />
  );
}

/* 


*/