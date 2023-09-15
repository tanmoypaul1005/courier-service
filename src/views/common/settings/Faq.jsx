/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { changePageTitle } from '../../../app/utility/utilityFunctions';
import SimpleAccordion from '../../../components/Accordion/SimpleAccordion';
import SettingsTitle from './SettingsTitle';
import { useTranslation } from 'react-i18next';

const Faq = () => {

    useEffect(() => {
        changePageTitle(t('Settings | FAQ'));
        window.scrollTo(0, 0);
    }, [])

    const { t } = useTranslation();

    return (
        <div>
            <SettingsTitle title={t("Frequently Ask Questions")} />
            <SimpleAccordion />
        </div>
    );
};

export default Faq;