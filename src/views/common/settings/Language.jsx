/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { FormControlLabel, Radio, RadioGroup, } from "@mui/material";
import SettingsTitle from './SettingsTitle';
import { useTranslation } from 'react-i18next';
import useSettingsStore, { setAppLangCodeFoo } from '../../../app/stores/others/settingsStore';
import { changePageTitle } from '../../../app/utility/utilityFunctions';

const Language = () => {

    const { t } = useTranslation();
    const { app_lang_code } = useSettingsStore();

    useEffect(() => {
        changePageTitle(t('Settings | Language'));
    }, [])


    return (
        <div>
            <SettingsTitle title={t("Language")} />
            <RadioGroup
                className="w-full"
                required={true}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <div className="flex space-x-5 w-full">
                    <div className={`w-s135 h-s55 mr-s8 mb-s8 flex justify-center border-[2px] rounded-br10 
                    ${app_lang_code === 'en' ? 'bg-cMainWhite border-cBrand' : 'bg-cFloralWhite border-none'} `}>
                        <FormControlLabel
                            checked={app_lang_code === 'en' ? true : false}
                            value="en"
                            control={<Radio required={true} />}
                            label="English"
                            onChange={(e) => setAppLangCodeFoo(e.target.value)}
                        />
                    </div>
                    <div className={`w-s135 h-s55 mr-s8 mb-s8 flex justify-center border-[2px] rounded-br10 
                    ${app_lang_code === 'da' ? 'bg-cMainWhite border-cBrand' : 'bg-cFloralWhite border-none'} `}>
                        <FormControlLabel
                            color="#F89818"
                            checked={app_lang_code === 'da' ? true : false}
                            value="da"
                            control={<Radio required={true} />}
                            label="Danish"
                            onChange={(e) => setAppLangCodeFoo(e.target.value)}
                        />
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
};

export default Language;