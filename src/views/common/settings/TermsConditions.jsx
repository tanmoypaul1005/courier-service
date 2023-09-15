import React from 'react'
import { useEffect } from 'react'
import useSettingsStore, { getTermsAndCondition } from '../../../app/stores/others/settingsStore'
import { changePageTitle } from '../../../app/utility/utilityFunctions';
import SettingsTitle from './SettingsTitle'
import { useTranslation } from 'react-i18next';

function TermsConditions() {

    const { termsAndConditionData } = useSettingsStore();

    const { t } = useTranslation();

    useEffect(() => {
        fetchTermsConditionsData();
        changePageTitle(t('Settings | Terms Conditions'));
        window.scrollTo(0, 0);
    }, [t])

    useEffect(() => {
        fetchTermsConditionsData();
    }, [])

    const fetchTermsConditionsData = async () => {
        await getTermsAndCondition()
    }


    return (
        <div>
            <SettingsTitle title={t("Terms & Conditions" )}/>

            <div>
                <div className='text-fs16 font-fw500 text-cDarkGray'>
                    {termsAndConditionData?.terms_condition?.description === "null" || termsAndConditionData?.terms_condition?.description === undefined ||
                        termsAndConditionData?.terms_condition?.description === null ? <span>{('No Terms & Conditions Available')}</span>
                        : <div dangerouslySetInnerHTML={{ __html: termsAndConditionData?.terms_condition?.description }}></div>}
                </div>
            </div>
        </div>
    )
}

export default TermsConditions
